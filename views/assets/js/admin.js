
// Function to update the navigation bar based on user's login and admin status
function updateNavbar(isLoggedIn, isAdmin) {
  const storeInfoNavItem = document.getElementById("storeInfoNavItem");
  if (isLoggedIn && isAdmin) {
    storeInfoNavItem.style.display = "block";
  } else {
    storeInfoNavItem.style.display = "none";
  }
}

// Fetch user status and update navigation bar on page load
document.addEventListener("DOMContentLoaded", function() {
  fetch("/checkLoggedIn")
    .then(response => response.json())
    .then(data => {
      const isLoggedIn = data.isLoggedIn;
      const isAdmin = data.isAdmin; // This should be provided by your server response
      updateNavbar(isLoggedIn, isAdmin);
    })
    .catch(error => {
      console.error("Error checking session:", error);
    });
});

  // Add an event listener for form submission
  document.getElementById("addProductForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
   
    
    const formData = new FormData(event.target);
    
    //console.log("Form Data:",formData);
    //console.log("Form Data name:", formData.get("name"));
  
    const productData = {
      name: formData.get("name"),
      image:formData.get("image"),
      brand:formData.get("brand"),
      category:formData.get("category"),
      price: parseFloat(formData.get("price")),
      countInStock:parseInt(formData.get("countInStock")),
      rating: parseFloat(formData.get("rating")),
      numReviews:parseInt(formData.get("numReviews")),
      description: formData.get("description"),
      color: formData.get("color"),
      popularity: formData.get("popularity"),
    };
    await addProduct(productData);
     // Clear the form fields after successful product addition
  event.target.reset();
  });
  
   // Call a function to add the product using an API endpoint
  /*
   await addProduct(
    productData.name,
    productData.image,
    productData.brand,
    productData.category,
    productData.price,
    productData.countInStock,
    productData.rating,
    productData.numReviews,
    productData.description,
    productData.color,
    productData.popularity
  );
  */
   
   

  
  async function addProduct(productData) {
    try {
      const authToken = 'your-admin-auth-token'; // Replace with the actual admin authentication token

      const response = await fetch("/api/store-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Include admin authentication token here
        },
        body: JSON.stringify(productData)
      });
  
      const data = await response.json();
      if (data.success) {
        // Update the product list on the admin page
      await updateProductList();
      } else {
        console.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }
/*
// Function to update the product list on the admin page
async function updateProductList() {
  try {
    const products = await fetchProducts(); // Fetch the updated list of products
    const productListElement = document.getElementById("productList");

    // Clear existing list
    productListElement.innerHTML = "";

    // Render the updated product list
    products.forEach(product => {
      const productItem = document.createElement("div");
      productItem.textContent = product.name; // Customize this to display relevant product information
      productListElement.appendChild(productItem);
    });
  } catch (error) {
    console.error("Error updating product list:", error);
  }
}

// Function to fetch the list of products from the server
async function fetchProducts() {
  try {
    const response = await fetch("/api/store-products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
*/