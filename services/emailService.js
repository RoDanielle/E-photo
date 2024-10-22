const fs = require('fs');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const path = require('path');

// Define the scopes required for the API
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Load client secrets from a local file.
const credentialsPath = path.join(__dirname, '..', 'credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));

// Path to save and retrieve the token
const tokenPath = path.join(__dirname, '..', 'token.json');

// OAuth2 client setup
const oAuth2Client = new OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

// Load token from file, if it exists
if (fs.existsSync(tokenPath)) {
  const token = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
  oAuth2Client.setCredentials(token);
} else {
  // If token does not exist, prompt user to authorize the app (done only once)
  getAccessToken(oAuth2Client);
}

// Refresh the access token if needed
oAuth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // Store the new refresh token
    fs.writeFileSync(tokenPath, JSON.stringify(tokens));
  }
  console.log('New access token generated');
});

// Function to send an email
async function sendEmail(to, subject, message) {
    await refreshAccessTokenIfNeeded(); // Ensure token is valid
  
    // Log the current credentials for debugging
    console.log('Current credentials before sending email:', oAuth2Client.credentials);
  
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const email = [
      `To: ${to}`,
      `From: ${to}`,  // Set From to the same email
      `Subject: ${subject}`,
      '',
      message,
    ].join('\n');
  
    const base64EncodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
    
    try {
      const response = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: base64EncodedEmail,
        },
      });
      console.log('Email sent successfully:', response);
      return response; // Optional: Return the response if you need to access it in the controller
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email: ' + error.message); // Throw error to the controller
    }
  }

// Function to get a new access token
async function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // Required to get a refresh token
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url:', authUrl);
  
  // Manually prompt for the authorization code (or handle it with a callback)
  const code = prompt("Enter the code from the authorization page: "); // Replace with your method of getting the code

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    tokens.expiry_date = Date.now() + tokens.expires_in * 1000; // Set expiry date
    oAuth2Client.setCredentials(tokens);
    
    // Save the token to disk for later program executions
    fs.writeFileSync(tokenPath, JSON.stringify(tokens)); // Save full token object
    console.log('Token stored to', tokenPath);
  } catch (error) {
    console.error('Error retrieving access token', error);
  }
}

// Function to refresh the access token if needed
async function refreshAccessTokenIfNeeded() {
    console.log('entered refreshAccessTokenIfNeeded function');
    const token = oAuth2Client.credentials;
  
    // Ensure token exists and check for expiration
    if (!token || !token.refresh_token) {
      console.log('Token is missing or refresh_token is not available.');
      return; // Exit if there's no valid token
    }
  
    const currentTime = Date.now();
    const tokenExpirationTime = token.expiry_date; // Ensure this is set correctly
  
    // Check if the access token is about to expire (5 minutes buffer)
    if (currentTime >= tokenExpirationTime - 5 * 60 * 1000) {
      try {
        console.log('Access token is about to expire, refreshing...');
        const { token: newAccessToken } = await oAuth2Client.getAccessToken();
        const newToken = {
          ...token,
          access_token: newAccessToken,
          expiry_date: currentTime + token.expires_in * 1000, // Update expiry date
        };
  
        oAuth2Client.setCredentials(newToken); // Set the new credentials
  
        // Update the token.json file with the new access token
        fs.writeFileSync(tokenPath, JSON.stringify(newToken));
        console.log('Access token refreshed successfully');
      } catch (error) {
        console.error('Error refreshing access token:', error);
      }
    } else {
      console.log('Access token is still valid, no refresh needed.');
    }
  }

// Export the necessary components
module.exports = {
  oAuth2Client,
  sendEmail,
};
