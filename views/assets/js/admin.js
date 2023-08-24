
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
  const productData = {
    name: formData.get("name"),
    image:formData.get("image"),
    brand:formData.get("brand"),
    category:formData.get("category"),
    price: parseFloat(formData.get("price")),
    countInStock:formData.get("countInStock"),
    rating: parseFloat(formData.get("rating")),
    numReviews:formData.get("numReviews"),
    description: formData.get("description"),
    color: formData.get("color"),
    popularity: formData.get("popularity"),
  };

  // Call a function to add the product using an API endpoint
  await addProduct(productData);

  // Clear the form fields after successful product addition
  event.target.reset();
});

async function addProduct(productData) {
  try {
    const response = await fetch("/api/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productData)
    });

    const data = await response.json();
    if (data.success) {
      // Optionally, you can update the product list on the admin page after adding the product
    } else {
      console.error("Failed to add product.");
    }
  } catch (error) {
    console.error("Error adding product:", error);
  }
}




