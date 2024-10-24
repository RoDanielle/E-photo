document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('restorePasswordForm');
    const messageElement = document.getElementById('message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const emailInput = form.querySelector('input[name="email"]');
        const emailValue = emailInput.value.trim();

        messageElement.classList.remove('d-none', 'alert-warning', 'alert-success', 'alert-danger');
        messageElement.innerText = '';

        if (emailValue === '') {
            showMessage('Please enter your email address.', 'warning');
        } else {
            // Make AJAX request to initiate password reset
            fetch('/initiate-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailValue }),
            })
            .then(response => response.json())
            .then(data => {
                showMessage(data.message, 'success');
                form.reset();
                // Optionally, you can remove this redirect if you want the user to stay on the page
                // setTimeout(() => {
                //     window.location.href = 'index.html';
                // }, 3000);
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('An error occurred. Please try again later.', 'danger');
            });
        }
    });

    function showMessage(message, type) {
        messageElement.innerText = message;
        messageElement.classList.add(`alert-${type}`);
        messageElement.classList.remove('d-none');
    }
});