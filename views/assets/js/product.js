
// Get product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch product details from API
fetch(`/api/store-products/${productId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(product => {
        console.log(product);
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-name').innerText = product.name;
        document.getElementById('product-description').innerText = `Description: ${product.description}`;
        document.getElementById('product-price').innerText = `Price: $${product.price}`;
        document.getElementById('product-rating').innerText = `Rating: ${product.rating}`; // Use product.rating
        document.getElementById('availability-status').innerText = product.countInStock > 0 ? 'In Stock' : 'Out of Stock';

        // Get the "Add to Cart" button element
        const addToCartButton = document.querySelector('.add-to-cart-button');



        // Attach click event listener to the "Add to Cart" button
        addToCartButton.addEventListener('click', () => {
            console.log('Add to Cart button clicked');
            // Fetch user login status
            fetch("/checkLoggedIn")
                .then(response => response.json())
                .then(data => {
                    const isLoggedIn = data.isLoggedIn;
                    console.log('User logged in:', isLoggedIn);
                    if (isLoggedIn) {
                        // User is logged in, proceed to add to cart
                        addToCart(product);
                    } else {
                        // User is not logged in, show a message
                        alert('Please log in first to add to cart.');
                    }
                })
                .catch(error => {
                    console.error("Error checking session:", error);
                });
        });
    })
    .catch(error => console.error('Error fetching product:', error));

// Function to add product to cart -- use the one used for all products page or make one this the same logic, need to make changes
function addToCart(product) {
    fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
        .then(response => response.json())
        .then(cartProducts => {
            console.log('Added to cart:', product._id);
            console.log('Cart contents:', cartProducts);
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
        });
}