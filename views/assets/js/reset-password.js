document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resetPasswordForm');
    const messageElement = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (newPassword !== confirmPassword) {
            showMessage('Passwords do not match', 'danger');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        fetch('/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newPassword }),
        })
        .then(response => response.json())
        .then(data => {
            showMessage(data.message, data.message.includes('successful') ? 'success' : 'danger');
            if (data.message.includes('successful')) {
                setTimeout(() => {
                    window.location.href = '/login.html'; // Changed this line
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again later.', 'danger');
        });
    });

    function showMessage(message, type) {
        messageElement.innerText = message;
        messageElement.className = `alert alert-${type}`;
        messageElement.classList.remove('d-none');
    }
});