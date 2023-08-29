/*
These actions check who the user is currently connected to the site, 
then displays his information on the screen - in a generic way
*/


const userConsent = true;

if (userConsent) {
    fetch(`/api/current-user`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {
            console.log(user);
            document.getElementById('user-name').innerText = user.name;
            document.getElementById('user-subtitle').innerText = user.description;
            document.getElementById('aboutMe').innerText = user.description;
            document.getElementById('email').innerText = `Email: ${user.email}`;
            document.getElementById('location').innerText = `Location: ${user.location}`;

            // Adding the user's name to the canvas
            const canvas = document.getElementById("userCanvas");
            const ctx = canvas.getContext("2d");

            ctx.font = "30px Arial";
            const nameWidth = ctx.measureText(user.name).width; // Measure the name's width
            const xPosition = (canvas.width - nameWidth) / 2; // Horizontal centering for the name

            ctx.strokeText(user.name, xPosition, 60); // User's name
            
            ctx.font = "20px Arial";
            const signatureWidth = ctx.measureText("Signature").width; // Measure the text's width
            const xSignaturePosition = (canvas.width - signatureWidth) / 2 - 20; // Left-aligned horizontal position for the text

            ctx.fillText("Signature:", xSignaturePosition, 30); // The text "Signature"
        })
        .catch(error => console.error('Error fetching user:', error));
}




