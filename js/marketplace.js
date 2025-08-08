document.addEventListener('DOMContentLoaded', () => {
    // Dummy product data with unique IDs and local image paths
    const products = [
        {
            id: 'prod-001',
            name: 'HEPA Air Purifier',
            price: 8999,
            image: 'assets/images/HEPA Air Purifier.jpeg',
            description: 'Removes 99.97% of airborne particles. Ideal for bedrooms and offices.'
        },
        {
            id: 'prod-002',
            name: 'Insulated Steel Water Bottle',
            price: 1299,
            image: 'assets/images/Insulated Steel Water Bottle.webp',
            description: 'Keep drinks cold for 24 hours or hot for 12. BPA-free.'
        },
        {
            id: 'prod-003',
            name: 'Air Purifying Spider Plant',
            price: 499,
            image: 'assets/images/Air Purifying Spider Plant.webp',
            description: 'Easy to care for and excellent at removing toxins from the air.'
        },
        {
            id: 'prod-004',
            name: 'Portable Solar Charger',
            price: 2499,
            image: 'assets/images/Portable Solar Charger.jpg',
            description: 'Charge your devices on the go with the power of the sun.'
        },
        {
            id: 'prod-005',
            name: 'Bamboo Toothbrush (Pack of 4)',
            price: 299,
            image: 'assets/images/Bamboo Toothbrush (Pack of 4).jpg',
            description: 'A sustainable alternative to plastic toothbrushes. 100% biodegradable.'
        },
        {
            id: 'prod-006',
            name: 'Kitchen Compost Bin',
            price: 1999,
            image: 'assets/images/Kitchen Compost Bin.jpg',
            description: 'Stylish and odorless bin to recycle your kitchen scraps into compost.'
        }
    ];

    const productGrid = document.getElementById('product-grid');

    const createProductCard = (product, index) => {
        // The card is created as a DOM element to attach event listeners directly
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${index * 100}ms`; // Staggered animation
        
        card.innerHTML = `
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

    // Populate grid and add event listeners
    if (productGrid) {
        products.forEach((product, index) => {
            const card = createProductCard(product, index);
            productGrid.appendChild(card);
        });

        // Event delegation for "Add to Cart" buttons
        productGrid.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const productId = e.target.dataset.productId;
                const product = products.find(p => p.id === productId);
                if(product) {
                    window.Cart.add(product); // Use the global Cart object
                    e.target.textContent = 'Added!';
                    setTimeout(() => {
                        e.target.textContent = 'Add to Cart';
                    }, 1000);
                }
            }
        });
    }
});