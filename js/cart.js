// A self-invoking function to create a global Cart object without polluting the global scope
(function(window) {
    'use strict';

    function getCart() {
        return JSON.parse(localStorage.getItem('ecoCart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('ecoCart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function updateCartDisplay() {
        const cart = getCart();
        const cartCount = document.getElementById('cart-count');
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalEl = document.getElementById('cart-total');
        const buyNowBtn = document.getElementById('buy-now-btn');

        // Update cart icon count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.transform = totalItems > 0 ? 'scale(1)' : 'scale(0)';

        // Update cart modal
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            buyNowBtn.disabled = true;
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price.toLocaleString('en-IN')} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item-btn">&times;</button>
                </div>
            `).join('');
            buyNowBtn.disabled = false;
        }
        
        // Update total
        const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalEl.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
    }

    const Cart = {
        add: function(product) {
            const cart = getCart();
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            saveCart(cart);
        },
        remove: function(productId) {
            let cart = getCart();
            cart = cart.filter(item => item.id !== productId);
            saveCart(cart);
        },
        clear: function() {
            saveCart([]);
        }
    };

    // --- Event Listeners for Cart Modal ---
    document.addEventListener('DOMContentLoaded', () => {
        const cartModal = document.getElementById('cart-modal');
        const cartButton = document.getElementById('cart-button');
        const closeButton = document.querySelector('.cart-modal .close-button');
        const cartItemsContainer = document.getElementById('cart-items');
        const buyNowBtn = document.getElementById('buy-now-btn');

        cartButton.addEventListener('click', () => cartModal.style.display = 'block');
        closeButton.addEventListener('click', () => cartModal.style.display = 'none');
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
        });

        // Event delegation for remove buttons
        cartItemsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-item-btn')) {
                const cartItemDiv = e.target.closest('.cart-item');
                const productId = cartItemDiv.dataset.productId;
                Cart.remove(productId);
            }
        });
        
        buyNowBtn.addEventListener('click', () => {
            alert('Thank you for your purchase! Your items are on their way.');
            Cart.clear();
            cartModal.style.display = 'none';
        });

        // Initial display update on page load
        updateCartDisplay();
    });

    // Expose the Cart object to the global window object
    window.Cart = Cart;

})(window);