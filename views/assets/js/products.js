        
        /*
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

         */                         

const products = [

    {
      name: "Majestic Mountain Landscape",
      image: "https://hahacanvas.co.il/wp-content/uploads/2021/11/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%99%D7%A4%D7%95%D7%AA-%D7%9C%D7%94%D7%93%D7%A4%D7%A1%D7%94-17.jpg",
      brand: "Nature's Beauty",
      category: "nature",
      price: 19.99,
      countInStock: 50,
      rating: 4.8,
      numReviews: 32,
      description: "Bring the beauty of mountains to your walls with this stunning landscape wallpaper.",
      color:"green",
      popularity: "high"
    },
    {
      name: "Wild Tiger Portrait",
      image: "https://media.istockphoto.com/id/590135082/photo/wild-animal-tiger-portrait.jpg?s=612x612&w=0&k=20&c=yJ2hr3grb4WUJvLh0ywchRss6Y-Jbd8hCqVSaFvvvfI=",
      brand: "Wildlife Wonders",
      category: "animal",
      price: 24.99,
      countInStock: 30,
      rating: 4.9,
      numReviews: 42,
      description: "Add a touch of the wild to your space with this captivating tiger portrait wallpaper.",
      color:"orange",
      popularity: "low"
    },

    {
      name: "Soccer Action Shot",
      image: "https://static01.nyt.com/images/2015/07/01/sports/ctyUSSOCCER1/ctyUSSOCCER1-superJumbo.jpg",
      brand: "Sporty Vibes",
      category: "sports",
      price: 15.99,
      countInStock: 20,
      rating: 4.5,
      numReviews: 18,
      description: "Celebrate your love for soccer with this action-packed sports wallpaper.",
      color:"red",
      popularity: "medium"
    },
    {
      name: "Enchanting Forest Path",
      image: "https://live.staticflickr.com/90/272884555_6ac602f45a_b.jpg",
      brand: "Nature's Beauty",
      category: "nature",
      price: 21.99,
      countInStock: 40,
      rating: 4.7,
      numReviews: 25,
      description: "Get lost in the charm of nature with this enchanting forest path wallpaper.",
      color:"green",
      popularity: "medium"
    },
    {
      name: "Snow-capped Mountain Peaks",
      image: "https://freerangestock.com/sample/113683/snow-capped-mountains.jpg",
      brand: "Snowy Escapes",
      category: "nature",
      price: 18.99,
      countInStock: 35,
      rating: 4.6,
      numReviews: 30,
      description: "Bring the magic of snow-capped mountains into your living space.",
      color:"white",
      popularity: "high"
    },
    {
      name: "Vibrant Coral Reef",
      image: "https://img.freepik.com/premium-photo/vibrant-colors-textures-coral-reef-highlighting-diversity-marine-life_674594-2596.jpg?w=2000",
      brand: "Oceanic Beauty",
      category: "nature",
      price: 22.99,
      countInStock: 28,
      rating: 4.7,
      numReviews: 22,
      description: "Dive into the wonders of the ocean with this vibrant coral reef wallpaper.",
      color:"red",
      popularity: "low"
    },
    {
      name: "Basketball in Action",
      image: "https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/3IBUVMY7R5GGRPYLF644M5KLFU.jpeg",
      brand: "Sporty Vibes",
      category: "sports",
      price: 17.99,
      countInStock: 10,
      rating: 4.4,
      numReviews: 14,
      description: "Experience the adrenaline of basketball with this action-packed sports wallpaper.",
      color:"orange",
      popularity: "medium"
    },
    {
      name: "Curious White Fox",
      image: "https://resources.arctickingdom.com/hs-fs/hubfs/Imported_Blog_Media/MG_3626-1-1.jpg?width=600&height=400&name=MG_3626-1-1.jpg",
      brand: "Wildlife Wonders",
      category: "animal",
      price: 20.99,
      countInStock: 25,
      rating: 4.8,
      numReviews: 27,
      description: "Get captivated by the charm of this curious white fox in your space.",
      color:"white",
      popularity: "low"
    },
    {
      name: "Aerial View of Beach",
      image: "https://media.architecturaldigest.com/photos/5768790dfd4057dc70113622/16:9/w_4000,h_2250,c_limit/aerial-photographs-beaches-10.jpg",
      brand: "Tropical Escapes",
      category: "nature",
      price: 25.99,
      countInStock: 18,
      rating: 4.9,
      numReviews: 36,
      description: "Relax and unwind with the soothing view of this aerial beach wallpaper.",
      color:"blue",
      popularity: "medium"
    },

  ];
document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners to filters and search button
    const categoryFilter = document.querySelector('#categoryFilter');
    const colorFilter = document.querySelector('#colorFilter');
    const popularityFilter = document.querySelector('#popularityFilter');
    const searchInput = document.querySelector('#searchInput');
    const searchButton = document.querySelector('#searchButton');

    categoryFilter.addEventListener('change', filterProducts);
    colorFilter.addEventListener('change', filterProducts);
    popularityFilter.addEventListener('change', filterProducts);
    searchButton.addEventListener('click', searchImages);
});

function filterProducts() {
    const selectedCategory = categoryFilter.value;
    const selectedColor = colorFilter.value;
    const selectedPopularity = popularityFilter.value;

    const filteredProducts = products.filter(product => {
        let categoryMatch = true;
        let colorMatch = true;
        let popularityMatch = true;

        if (selectedCategory && selectedCategory !== '') {
            categoryMatch = product.category === selectedCategory;
        }
        if (selectedColor && selectedColor !== '') {
            colorMatch = product.color === selectedColor;
        }
        if (selectedPopularity && selectedPopularity !== '') {
            popularityMatch = product.popularity === selectedPopularity;
        }

        return categoryMatch && colorMatch && popularityMatch;
    });
    // Clear previous products and display filtered products
    clearProductGrid();
    displayProducts(filteredProducts);
}
function searchImages() {
    console.log('Search button clicked');
    const searchKeywords = searchInput.value.toLowerCase();

    const searchResults = products.filter(product => {
        const keywordsInName = product.name.toLowerCase().includes(searchKeywords);
        const keywordsInDescription = product.description.toLowerCase().includes(searchKeywords);
        return keywordsInName || keywordsInDescription;
    });

    // Clear previous products and display search results
    clearProductGrid();
    displayProducts(searchResults);
}
function clearProductGrid() {
    const productGrid = document.querySelector('#productGrid');
    productGrid.innerHTML = '';
}

function displayProducts(productsToShow) {
    const productGrid = document.querySelector('#productGrid');
    productsToShow.forEach(product => {
        const productElement = createProductElement(product);
        productGrid.appendChild(productElement);
    });
}
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