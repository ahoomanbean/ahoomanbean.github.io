let cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-button');

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.getAttribute('data-product');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        cart.push({ productId, price: productPrice });
        updateCart();
    });
});

function updateCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in your cart.</p>';
        checkoutButton.style.display = 'none';
    } else {
        let cartContent = '';
        cart.forEach(item => {
            cartContent += `<p>Product ${item.productId} - $${item.price.toFixed(2)}</p>`;
        });
        cartItemsContainer.innerHTML = cartContent;
        checkoutButton.style.display = 'block';
    }
}

// Handle checkout form submission
document.getElementById('checkout-form')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const creditCard = document.getElementById('credit-card').value;
    
    if (!name || !address || !creditCard) {
        alert('Please complete all checkout fields.');
        return;
    }

    alert('Order placed successfully!');
    cart = [];
    updateCart();
    document.getElementById('checkout').style.display = 'none';
});
