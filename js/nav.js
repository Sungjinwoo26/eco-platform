document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation ---
    const hamburgerButton = document.getElementById('hamburger-button');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerButton && navLinks) {
        hamburgerButton.addEventListener('click', () => {
            // Toggle 'is-active' class on both the hamburger and the menu
            hamburgerButton.classList.toggle('is-active');
            navLinks.classList.toggle('is-active');
        });
    }

    // --- Site-Wide Animation on Scroll (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.anim-fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible to improve performance
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}); 