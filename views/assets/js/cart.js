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



function addToCart(product) {
    // Retrieve existing cart data from local storage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || {};

    // Check if the product is already in the cart
    if (existingCart[product._id]) {
        alert('Product is already in the cart.');
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



// Fetch user email
async function fetchUserEmail() {
    try {
        const response = await fetch('/getLoggedInID');
        if (response.ok) {
            const data = await response.json();
            return data.userEmail; // This might be null if the user is not logged in
        } else {
            console.error('Failed to fetch user email');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching user email', error);
        return null;
    }
}


payButton.addEventListener('click', async () => {
        const totalField = parseFloat(document.getElementById('cartTotal').textContent.replace('Total: $', ''));

        if(totalField === 0){
            alert('Your cart is empty');
        }
        else{
                // Get the current user's ID (email)
        const currentUserId = await fetchUserEmail();

        if(currentUserId)
        {
            const cartData = JSON.parse(localStorage.getItem('cart')) || {};

            const shoppingCart = [];

            for (const productId in cartData) {
                const product = cartData[productId];
                shoppingCart.push({ 
                    productId: productId, 
                    productName: product.name , 
                    productPrice: product.price , 
                    quantity: product.quantity
                });
            }
            // try to create a new order
            const response = await fetch ('/api/create', {
                method: 'POST', headers: {'Content-Type': 'application/json'} ,
                body: JSON.stringify({
                    idUserOrdered: currentUserId,
                    cost: totalField,
                    productList: shoppingCart})
            });

            if (response.ok) {
                // Order creation successful
                const orderData = await response.json();
                console.log('Order created:', orderData);
                localStorage.removeItem('cart');
                updateShoppingCart({});
                alert('Order placed successfully!');
                } else {
                // Order creation failed
                console.error( 'Failed to create order:', response.status, response.statusText);
                alert('Failed to create the order. Please try again.');
            }
        }
        else{
            // The user is not logged in
            alert('Please log in before placing an order.');
        }
        }   
});