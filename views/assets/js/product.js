// Function to populate edit form with product information
function populateEditForm(product) {
    const editForm = document.getElementById('editForm');
    document.getElementById('editedName').value = product.name;
    document.getElementById('editedImage').value = product.image;
    document.getElementById('editedBrand').value = product.brand;
    document.getElementById('editedCategory').value = product.category;
    document.getElementById('editedPrice').value = product.price;
    document.getElementById('editedCountInStock').value = product.countInStock;
    document.getElementById('editedRating').value = product.rating;
    document.getElementById('editedNumReviews').value = product.numReviews;
    document.getElementById('editedDescription').value = product.description;
    document.getElementById('editedColor').value = product.color;
    document.getElementById('editedPopularity').value = product.popularity;
    editForm.style.display = 'block';
}

// Function to handle saving edited product details
async function saveEditedProduct(productId) {
    // Get edited field values and update the product
    const editedName = document.getElementById('editedName').value;
    const editedImage = document.getElementById('editedImage').value;
    const editedBrand = document.getElementById('editedBrand').value;
    const editedCategory = document.getElementById('editedCategory').value;
    const editedPrice = parseFloat(document.getElementById('editedPrice').value);
    const editedCountInStock = document.getElementById('editedCountInStock').value;
    const editedRating = parseFloat(document.getElementById('editedRating').value);
    const editedNumReviews = parseFloat(document.getElementById('editedNumReviews').value);
    const editedDescription = document.getElementById('editedDescription').value;
    const editedColor = document.getElementById('editedColor').value;
    const editedPopularity = document.getElementById('editedPopularity').value;

    const editedProductData = {
        name: editedName,
        image: editedImage,
        brand: editedBrand,
        category: editedCategory,
        price: editedPrice,
        countInStock: editedCountInStock,
        rating: editedRating,
        numReviews: editedNumReviews,
        description: editedDescription,
        color: editedColor,
        popularity: editedPopularity
    };
    
    try {
        const response = await fetch(`/api/store-products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedProductData),
        });
        if (response.ok) {
            console.log('Product updated successfully');
            // Refresh the page to reflect the updated data
            window.location.reload();
        } else {
            console.error('Failed to update product');
        }
    } catch (error) {
        console.error('Error updating product:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
        .then(productData => {
            // Assign the fetched product data to the product variable
            product = productData;

            const productImage = document.getElementById('product-image');
            productImage.src = product.image;
            productImage.onerror = function () {
                // Handle image load error by replacing with a default image
                productImage.src = 'assets/img/failed-to-load.png'; // default image URL
                productImage.alt = 'Image not available';
            };

    // Update product details on the page
    document.getElementById('product-name').innerText = product.name;
    document.getElementById('product-description').innerText = `Description: ${product.description}`;
    document.getElementById('product-price').innerText = `Price: $${product.price}`;
    document.getElementById('product-rating').innerText = `Rating: ${product.rating}`; 
    document.getElementById('availability-status').innerText = product.countInStock ;



// Check if countInStock is "available" before showing the "Add to Cart" button
const addToCartButton = document.querySelector('.add-to-cart-button');
if (product.countInStock === "available") {
    addToCartButton.style.display = "block"; // Show the "Add to Cart" button
} else {
    addToCartButton.style.display = "none"; // Hide the "Add to Cart" button
}

// Attach click event listener to the "Add to Cart" button
addToCartButton.addEventListener('click', () => {
    // Fetch user login status and handle cart addition
    fetch("/checkLoggedIn")
        .then(response => response.json())
        .then(data => {
            const isLoggedIn = data.isLoggedIn;
            if (isLoggedIn) {
                // Proceed to add to cart
                addToCart(product);
            } else {
                // Show login message
                alert('Please log in first to add to cart.');
            }
        })
        .catch(error => {
            console.error("Error checking session:", error);
        });
});

            // Show the edit form and populate it with current product information
            const editButton = document.querySelector('.edit-button');
            editButton.style.display = "none"; // Hide the edit button by default

            // Fetch user login and admin status
            fetch("/checkLoggedIn")
                .then(response => response.json())
                .then(data => {
                    const isLoggedIn = data.isLoggedIn;
                    const isAdmin = data.isAdmin;
                    if (isLoggedIn && isAdmin) {
                        editButton.style.display = "block"; // Show the edit button for logged-in admin users
                    }
                })
                .catch(error => {
                    console.error("Error checking session:", error);
                });

            editButton.addEventListener('click', () => {
                populateEditForm(product);
            });

            // Save edited product details
            const saveButton = document.getElementById('saveButton');
            saveButton.addEventListener('click', () => {
                if (editForm.checkValidity()) {
                    saveEditedProduct(productId);
                }
            });
        })
        .catch(error => console.error('Error fetching product:', error));
});




