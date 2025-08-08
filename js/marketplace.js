document.addEventListener('DOMContentLoaded', () => {
    // Dummy product data
    const products = [
        {
            name: 'HEPA Air Purifier',
            price: 8999,
            image: 'https://images.unsplash.com/photo-1623122175342-6a75a7c21b22?w=500&auto=format&fit=crop',
            description: 'Removes 99.97% of airborne particles. Ideal for bedrooms and offices.'
        },
        {
            name: 'Insulated Steel Water Bottle',
            price: 1299,
            image: 'https://images.unsplash.com/photo-1602143407151-24741630d173?w=500&auto=format&fit=crop',
            description: 'Keep drinks cold for 24 hours or hot for 12. BPA-free.'
        },
        {
            name: 'Air Purifying Spider Plant',
            price: 499,
            image: 'https://images.unsplash.com/photo-1619069452588-6638f37b1206?w=500&auto=format&fit=crop',
            description: 'Easy to care for and excellent at removing toxins from the air.'
        },
        {
            name: 'Portable Solar Charger',
            price: 2499,
            image: 'https://images.unsplash.com/photo-1593592415514-a51b36585542?w=500&auto=format&fit=crop',
            description: 'Charge your devices on the go with the power of the sun.'
        },
        {
            name: 'Bamboo Toothbrush (Pack of 4)',
            price: 299,
            image: 'https://images.unsplash.com/photo-1627620259924-118d3b4822ed?w=500&auto=format&fit=crop',
            description: 'A sustainable alternative to plastic toothbrushes. 100% biodegradable.'
        },
        {
            name: 'Kitchen Compost Bin',
            price: 1999,
            image: 'https://images.unsplash.com/photo-1598179971029-7d84813f6323?w=500&auto=format&fit=crop',
            description: 'Stylish and odorless bin to recycle your kitchen scraps into compost.'
        }
    ];

    const productGrid = document.getElementById('product-grid');

    const createProductCard = (product) => {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    };

    products.forEach(product => {
        productGrid.innerHTML += createProductCard(product);
    });
});