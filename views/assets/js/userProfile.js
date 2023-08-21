document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            const userData = await response.json();
            updateProfile(userData);
        } else {
            console.error('Error fetching user profile:', response.status);
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
});

function updateProfile(userData) {
    const profileTitle = document.getElementById('profileTitle');
    const profileSubtitle = document.getElementById('profileSubtitle');
    const aboutMe = document.getElementById('aboutMe');
    const email = document.getElementById('email');
    const location = document.getElementById('location');

    profileTitle.textContent = userData.name || 'John Doe';
    profileSubtitle.textContent = getUserSubtitle(userData.type) || 'Photographer & Storyteller';
    aboutMe.textContent = userData.aboutMe || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    email.textContent = `Email: ${userData.email || 'john.doe@example.com'}`;
    location.textContent = `Location: ${userData.location || 'Tel Aviv'}`;
}

function getUserSubtitle(userType) {
    if (userType === 'user') {
        return 'Regular User';
    } else if (userType === 'admin') {
        return 'Administrator';
    } else {
        return 'Photographer & Storyteller';
    }
}