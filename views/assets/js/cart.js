// Get the "Cart" button element
const cartButton = document.getElementById('cartButton');

// Attach click event listener to the "Cart" button
cartButton.addEventListener('click', () => {
    const shoppingCart = document.getElementById('shopping-cart');
    shoppingCart.classList.toggle('show'); // Toggle visibility of shopping cart
});

document.addEventListener("DOMContentLoaded", function () {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || {};
    updateShoppingCart(existingCart);
});


function updateShoppingCart(cartData) {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';

    let totalQuantity = 0; // Initialize total quantity

    for (const productId in cartData) {
        const cartItem = document.createElement('li');
        const product = cartData[productId];
        cartItem.textContent = `${product.name} - $${product.price} (Quantity: ${product.quantity})`;
        cartItemsList.appendChild(cartItem);

        totalQuantity += product.quantity; // Increment total quantity
    }

    // Update the cart button's quantity
    const cartQuantityElement = document.getElementById('cartQuantity');
    cartQuantityElement.textContent = totalQuantity.toString();
}

// Function to add product to cart
function addToCart(product) {
    // Retrieve existing cart data from local storage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || {};

    // Check if the product is already in the cart
    if (existingCart[product._id]) {
        existingCart[product._id].quantity++;
    } else {
        existingCart[product._id] = {
            name: product.name,
            price: product.price,
            quantity: 1,
        };
    }

    // Store updated cart data back in local storage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Update the shopping cart UI
    updateShoppingCart(existingCart);
}
