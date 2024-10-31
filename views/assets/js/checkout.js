document.addEventListener("DOMContentLoaded", function () {
    const cartData = JSON.parse(localStorage.getItem('cart')) || {};
    updateCheckoutPage(cartData);
});

function updateCheckoutPage(cartData) {
    const checkoutItemsList = document.getElementById('checkout-items');
    checkoutItemsList.innerHTML = ''; // Clear existing items

    let totalPrice = 0;

    for (const productId in cartData) {
        const product = cartData[productId];

        // Create a new row for the table
        const row = document.createElement('tr');

        // Create cell for product image
        const imageCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.imageUrl; // Set the image source to the product's image
        img.alt = product.name; // Alt text for accessibility
        img.style.width = '100px'; // Set a larger width for the image
        img.style.height = 'auto'; // Maintain aspect ratio
        imageCell.appendChild(img); // Add image to cell
        row.appendChild(imageCell); // Append image cell to row

        // Create cell for product name
        const productCell = document.createElement('td');
        productCell.textContent = product.name; // Set product name
        row.appendChild(productCell);

        // Create cell for price
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${product.price.toFixed(2)}`; // Set formatted price
        row.appendChild(priceCell);

        // Create cell for quantity
        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity; // Set quantity
        row.appendChild(quantityCell);

        // Append the row to the table body
        checkoutItemsList.appendChild(row);

        // Update total price
        totalPrice += product.price * product.quantity;
    }

    // Update the total price display
    document.getElementById('checkoutTotal').textContent = `Total: $${totalPrice.toFixed(2)}`; // Format total
}



async function fetchUserEmail() {
    try {
        const response = await fetch('/getLoggedInID');
        if (response.ok) {
            const data = await response.json();
            return data.userEmail;
        } else {
            console.error('Failed to fetch user email');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching user email', error);
        return null;
    }
}

document.getElementById('confirmOrderButton').addEventListener('click', async () => {
    const totalField = parseFloat(document.getElementById('checkoutTotal').textContent.replace('Total: $', ''));

    if (totalField === 0) {
        alert('Your cart is empty. Please add items to your cart before placing an order.');
        return;
    }

    const currentUserId = await fetchUserEmail();

    if (currentUserId) {
        const cartData = JSON.parse(localStorage.getItem('cart')) || {};
        const shoppingCart = Object.keys(cartData).map(productId => ({
            productId: productId,
            productName: cartData[productId].name,
            productPrice: cartData[productId].price,
            quantity: cartData[productId].quantity
        }));

        try {
            const response = await fetch('/api/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idUserOrdered: currentUserId,
                    cost: totalField,
                    productList: shoppingCart
                })
            });

            if (response.ok) {
                const orderData = await response.json();
                console.log('Order created:', orderData);
                localStorage.removeItem('cart');
                updateCheckoutPage({}); // Clear the checkout page
                
                // Show success message and redirect
                alert('Order placed successfully!');
                window.location.href = 'userProfile.html'; // Redirect to user profile page
            } else {
                console.error('Failed to create order:', response.status, response.statusText);
                alert('Failed to create the order. Please try again.');
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
            alert('An unexpected error occurred while placing the order. Please try again later.');
        }
    } else {
        alert('Please log in before placing an order.');
    }
});

