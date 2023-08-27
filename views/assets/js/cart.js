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

    let totalQuantity = 0;
    let totalPrice = 0;

    for (const productId in cartData) {
        const cartItem = document.createElement('li');
        const product = cartData[productId];
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeFromCart(productId)); // Pass productId here
        
        cartItem.textContent = `${product.name} - $${product.price} (Quantity: ${product.quantity}) `;
        cartItem.appendChild(removeButton);
        
        cartItemsList.appendChild(cartItem);

        totalQuantity += product.quantity;
        totalPrice += product.price * product.quantity;
    }

    const cartQuantityElement = document.getElementById('cartQuantity');
    cartQuantityElement.textContent = totalQuantity.toString();
    
    const totalField = document.getElementById('cartTotal');
    totalField.textContent = `Total: $${totalPrice}`;
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

function removeFromCart(productId) {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || {};
    if (existingCart[productId]) {
        if (existingCart[productId].quantity > 1) {
            existingCart[productId].quantity--;
        } else {
            delete existingCart[productId];
        }
        localStorage.setItem('cart', JSON.stringify(existingCart));
        updateShoppingCart(existingCart);
    }
}


const payButton = document.getElementById('payButton');
payButton.addEventListener('click', async () => {

    // Perform payment action here
    //alert('Payment functionality will be added later.');

    try {
        // Get the current user's ID 
        const currentUserId = req.session.userID;
        // Get the current date
        const currentDate = new Date();
        const shoppingCart = shoppingCart(); // לבדוק
        const totalCost = calculateTotalCost(shoppingBasket); // לבדוק

        const newOrder = {
            idUserOrdered: currentUserId,
            date: currentDate,
            cost: totalCost,
            productList: shoppingCart,
        };

        const response = await sendNewOrderToServer(newOrder); //לבדוק שליחת בקשה לשרת
        if (response.ok) {
            // Order creation successful
            const orderData = await response.json();
            console.log('Order created:', orderData);
            clearShoppingCart(); //לבדוק
            displaySuccessMessage(); //לבדוק
        } else {
            // Order creation failed
            console.error( 'Failed to create order:', response.status, response.statusText);
            displayErrorMessage(); //לבדוק
        }
    } catch (error) {
        //any unexpected errors
        console.error( 'An error occurred:' , error);
        displayErrorMessage(); //לבדוק
    }

});