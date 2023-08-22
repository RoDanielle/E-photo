
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
document.getElementById('rating-value').innerText = ratingValue.toFixed(1); // Display one decimal place
document.getElementById('availability-status').innerText = product.countInStock > 0 ? 'In Stock' : 'Out of Stock';
})
.catch(error => console.error('Error fetching product:', error));
