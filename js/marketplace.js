document.addEventListener('DOMContentLoaded', () => {
    // Product data now includes an "info" property for the tooltip
    const products = [
        {
            id: 'prod-001',
            name: 'HEPA Air Purifier',
            price: 8999,
            image: 'assets/images/HEPA Air Purifier.jpeg',
            description: 'Removes 99.97% of airborne particles. Ideal for bedrooms and offices.',
            info: 'Reduces indoor air pollution, which can be 5x worse than outdoor air, protecting your respiratory health.'
        },
        {
            id: 'prod-002',
            name: 'Insulated Steel Water Bottle',
            price: 1299,
            image: 'assets/images/Insulated Steel Water Bottle.webp',
            description: 'Keep drinks cold for 24 hours or hot for 12. BPA-free.',
            info: 'Each reusable bottle prevents an average of 156 single-use plastic bottles from entering our oceans and landfills each year.'
        },
        {
            id: 'prod-003',
            name: 'Air Purifying Spider Plant',
            price: 499,
            image: 'assets/images/Air Purifying Spider Plant.webp',
            description: 'Easy to care for and excellent at removing toxins from the air.',
            info: 'A natural air purifier that effectively removes common toxins like formaldehyde and xylene from your home.'
        },
        {
            id: 'prod-004',
            name: 'Portable Solar Charger',
            price: 2499,
            image: 'assets/images/Portable Solar Charger.jpg',
            description: 'Charge your devices on the go with the power of the sun.',
            info: 'Harness clean, renewable energy from the sun to reduce your reliance on fossil-fuel-powered grids.'
        },
        {
            id: 'prod-005',
            name: 'Bamboo Toothbrush (Pack of 4)',
            price: 299,
            image: 'assets/images/Bamboo Toothbrush (Pack of 4).jpg',
            description: 'A sustainable alternative to plastic toothbrushes. 100% biodegradable.',
            info: 'Billions of plastic toothbrushes end up in landfills every year. Bamboo is a fast-growing, biodegradable alternative.'
        },
        {
            id: 'prod-006',
            name: 'Kitchen Compost Bin',
            price: 1999,
            image: 'assets/images/Kitchen Compost Bin.jpg',
            description: 'Stylish and odorless bin to recycle your kitchen scraps into compost.',
            info: 'Composting food scraps reduces methane emissions from landfills and creates nutrient-rich soil for your garden.'
        }
    ];

    const recommendations = {
        'eco-hero': { productId: 'prod-001', text: 'Recommended for 🌿 Eco Heroes' },
        'eco-aware': { productId: 'prod-004', text: 'Recommended for 🌱 Eco Aware' },
        'eco-learner': { productId: 'prod-006', text: 'Recommended for 🍂 Eco Learners' },
        'eco-risk': { productId: 'prod-002', text: 'Recommended for your Eco-Type' }
    };

    const userEcoType = localStorage.getItem('ecoType');
    const recommendation = recommendations[userEcoType];
    
    const productGrid = document.getElementById('product-grid');

    const createProductCard = (product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 100}ms`;
        
        let recommendationHTML = '';
        if (recommendation && recommendation.productId === product.id) {
            recommendationHTML = `<div class="recommendation-badge">${recommendation.text}</div>`;
        }

        // --- NEW: HTML for the info tooltip ---
        const infoTooltipHTML = `
            <div class="info-tooltip-container">
                <div class="info-icon">i</div>
                <span class="info-tooltip-text">${product.info}</span>
            </div>
        `;
        // ------------------------------------

        card.innerHTML = `
            ${recommendationHTML}
            ${infoTooltipHTML}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        return card;
    };

    if (productGrid) {
        products.forEach((product, index) => {
            const card = createProductCard(product, index);
            productGrid.appendChild(card);
        });

        productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = e.target.dataset.productId;
                const product = products.find(p => p.id === productId);
                if(product) {
                    window.Cart.add(product);
                    e.target.textContent = 'Added!';
                    setTimeout(() => {
                        e.target.textContent = 'Add to Cart';
                    }, 1000);
                }
            }
        });
    }
});
