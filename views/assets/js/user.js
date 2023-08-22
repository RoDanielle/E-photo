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

            // הוספת שם המשתמש לתוך ה-canvas
            const canvas = document.getElementById("userCanvas");
            const ctx = canvas.getContext("2d");

            ctx.font = "30px Arial";
            const nameWidth = ctx.measureText(user.name).width; // מדידת רוחב השם
            const xPosition = (canvas.width - nameWidth) / 2; // מיקום אופקי מרכזי לשם

            ctx.strokeText(user.name, xPosition, 60); // שם המשתמש

           
            ctx.font = "20px Arial";
            const signatureWidth = ctx.measureText("Signature").width; // מדידת רוחב הטקסט
            const xSignaturePosition = (canvas.width - signatureWidth) / 2 - 20; // מיקום אופקי שמאלי לטקסט

            ctx.fillText("Signature:", xSignaturePosition, 30); // הטקסט "Signature"
        })
        .catch(error => console.error('Error fetching user:', error));
}
