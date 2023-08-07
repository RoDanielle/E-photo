        // Fetch products from the API endpoint and populate the product list
        fetch('/api/store-products') // Replace with the actual API endpoint to fetch products
            .then(response => response.json())
            .then(products => {
                console.log(products);
                const productGrid = document.querySelector('#productGrid');
                products.forEach(product => {
                    const productElement = createProductElement(product);
                    productGrid.appendChild(productElement);
                });
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    
        // Create HTML element for each product and populate the content
        function createProductElement(product) {
            const productCard = document.createElement('div');
            productCard.classList.add('card', 'mb-3');
            productCard.style.flex = '0 0 calc(33.33% - 20px)';
    
            // Create and set the card content based on your product schema
            productCard.innerHTML = `
            <a href="product.html?id=${product._id}">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="imageLoadError(this)">
            </a>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>Price: $${product.price}</strong></p>
                <p class="card-text">Rating: ${product.rating} (${product.numReviews} reviews)</p>
                <p class="card-text">Availability: ${product.countInStock} in stock</p>
                <button class="btn btn-primary" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;

            const addToCartButton = productCard.querySelector('.btn-primary');
            addToCartButton.addEventListener('click', () => addToCart(product));
    
            return productCard;
        }
    
        // Handle image load errors by setting a fallback image
        function imageLoadError(imgElement) {
            imgElement.onerror = null;
            imgElement.src = 'assets/img/failed-to-load.png'; // Replace with the URL of your fallback image
            imgElement.alt = 'Image not available';
        }

       /*
        function addToCart(product) {
            fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
            .then(response => response.json())
            .then(responseData => {
                // Check if the response contains a success message or not
                if (responseData.message) {
                    // Display a success message to the customer
                    const successMessage = responseData.message;
                    
                    // Update the success message element's content and show it
                    const successMessageElement = document.getElementById('success-message');
                    successMessageElement.textContent = successMessage;
                    successMessageElement.style.display = 'block';
                    
                    // You might also want to hide the message after a few seconds
                    setTimeout(() => {
                        successMessageElement.style.display = 'none';
                    }, 3000); // Display for 3 seconds
                } else {
                    console.error('Error:', responseData.error);
                }
        
                // ... (other code)
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
            });
        }
        */

        function addToCart(product) {
           
            fetch('/api/cart/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(product), // Send the entire product object
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