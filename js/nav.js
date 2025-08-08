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

     const badgeData = {
        'eco-hero': { title: 'Your Eco-Type: Eco Hero 🌿' },
        'eco-aware': { title: 'Your Eco-Type: Eco Aware 🌱' },
        'eco-learner': { title: 'Your Eco-Type: Eco Learner 🍂' },
        'eco-risk': { title: 'Your Eco-Type: Eco Risk Zone 🔥' }
    };

    function updateEcoBadge() {
        const ecoType = localStorage.getItem('ecoType');
        const badgeElement = document.getElementById('eco-badge');

        if (ecoType && badgeElement && badgeData[ecoType]) {
            badgeElement.className = 'eco-badge ' + ecoType; // Set class for CSS
            badgeElement.style.display = 'inline-block'; // Make it visible
            badgeElement.title = badgeData[ecoType].title; // Set tooltip
        }
    }

    // Expose function to global scope so quiz.js can call it
    window.updateEcoBadge = updateEcoBadge; 

    // Run on every page load
    updateEcoBadge();
});
