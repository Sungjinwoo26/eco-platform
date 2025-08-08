document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinks = document.querySelector('.nav-links');

    hamburgerButton.addEventListener('click', () => {
        // Toggle 'is-active' class on both the hamburger and the menu
        hamburgerButton.classList.toggle('is-active');
        navLinks.classList.toggle('is-active');
    });
});