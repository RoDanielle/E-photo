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
            ctx.strokeText(user.name, 30, 60); // השתמש בשם המשתמש מהגוף של התשובה מהשרת
        })
        .catch(error => console.error('Error fetching user:', error));
}