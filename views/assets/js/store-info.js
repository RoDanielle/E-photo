let originalUserData = []; // Initialize as an empty array
let originalProductData = []; // Initialize as an empty array
let originalLocationData = []; // Initialize as an empty array
let originalOrderData = []; // Initialize as an empty array
let locationData = []; // Initialize an array to hold location data



// Add an event listener for form submission - add new product 
document.getElementById("addProductForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    // Get values from form fields
    const name = document.getElementById("name").value;
    const image = document.getElementById("image").value;
    const brand = document.getElementById("brand").value;
    const category = document.getElementById("category").value;
    const price = parseFloat(document.getElementById("price").value);
    const countInStock = parseInt(document.getElementById("countInStock").value);
    const rating = parseFloat(document.getElementById("rating").value);
    const numReviews = parseInt(document.getElementById("numReviews").value);
    const description = document.getElementById("description").value;
    const color = document.getElementById("color").value;
    const popularity = document.getElementById("popularity").value;
  
    const productData = {
      name,
      image,
      brand,
      category,
      price,
      countInStock,
      rating,
      numReviews,
      description,
      color,
      popularity
    };
  
   // Call the addProduct function with the extracted data
   await addProduct(productData, event);
  });
  //add proudoct + facebook API ! 
  async function addProduct(productData, event) {
    console.log("inside addProduct");
    try {
        const response = await fetch("/api/store-products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();
        console.log("log:", data);

        if (data.message === 'Product added successfully') {
            console.log("Product added successfully!");

            // Show an alert to the user
            alert('Product added successfully!');

            // Reset the form after successful product addition
            event.target.reset();
            
            // Wait for the Facebook SDK to finish loading
            await new Promise(resolve => {
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: "107114659160317", // Your App ID
                        status: true,
                        cookie: true,
                        xfbml: true,
                    });
                    resolve(); // Resolve the promise to indicate that the SDK has loaded
                };

                (function(d){
                    var id = 'facebook-jssdk';
                    if (d.getElementById(id)) {return;}
                    var js = d.createElement('script');
                    js.id = id;
                    js.async = true;
                    js.src = "//connect.facebook.net/en_US/all.js";
                    d.getElementsByTagName('head')[0].appendChild(js);
                }(document));
            });

            // Publish to Facebook
            FB.api(
                '/107114659160317/feed', // Replace PAGE_ID with your actual page ID
                'POST',
                {"message": "New product added: " + productData.name ,access_token: 'EAALttJIAcYgBO07zS7rqXgzNbH6hfggRbm1UmBFDbliFRIpXdCOqBZASMCgE1MCKqZAUbdUlZCoZALkqlJ4vlwgqqdM734OjDDkiiFW2HijgEZBLXKuXV9ZAdskbl5iAecGhauEuii9VFJvVxT3xWWoa4lHqdN2a9qydg74YKQqXwFyk67TsPbuNZCTU6ZBHwkxFbphqlUUZD' },
                function(response) {
                    if (!response || response.error) {
                        console.error("Error publishing to Facebook:", response ? response.error : "Unknown error");
                    } else {
                        console.log("Posted to Facebook:", response);
                    }
                }
            );
        } else {
            console.error("Failed to add product.");
        }
    } catch (error) {
        console.error("Error adding product:", error);
    }

}
/*
  //Registered users 
    // Fetch user data from MongoDB using an API endpoint
    async function fetchUserData() {
      const response = await fetch('/api/store-user'); // Replace with your API endpoint
      const data = await response.json();
      return data;
  }
  
  // Function to render the user table
  function renderUserTable(data) {
      const tableContainer = d3.select('#userTable');
      const table = tableContainer.selectAll('table').empty() ? tableContainer.append('table').attr('class', 'table') : tableContainer.select('table');
      // Table header
      const thead = table.selectAll('thead').data([null]).enter().append('thead').append('tr');
      thead.append('th').text('ID');
      thead.append('th').text('Username');
      thead.append('th').text('Email');
      thead.append('th').text('Actions');
  
      // Table body
      const tbody = table.selectAll('tbody').data([null]).enter().append('tbody');
      const rows = tbody.selectAll('tr').data(data, user => user._id);
      rows.exit().remove(); // Remove extra rows
      const newRow = rows.enter().append('tr');
      newRow.append('td').text(user => user._id); // Assuming the user document has _id field
      newRow.append('td').text(user => user.name);
      newRow.append('td').text(user => user.email);
      const actionsCell = newRow.append('td');
      const deleteButton = actionsCell.append('button')  .attr('class', 'btn btn-danger red-delete-button').text('Delete');
      //const deleteButton = actionsCell.append('button').attr('class', 'btn btn-danger').text('Delete');
      deleteButton.on('click', user => deleteUser(user._id)); // Call a function to delete the user
      rows.merge(newRow); // Merge new and existing rows
  }
  
  // Function to delete a user
  async function deleteUser(userId) {
  const response = await fetch(`/api/store-user`, {
  method: 'DELETE',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({ _id: userId })
  });
  const data = await response.json();
  if (data.success) {
  // Reload the user table after successful deletion
  const userData = await fetchUserData();
  d3.select('#userTable').selectAll('*').remove(); // Clear existing table
  renderUserTable(userData);
  } else {
  console.error('Failed to delete user.');
  }
  }
*/
//user
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
async function fetchUserData() {
const response = await fetch('/api/store-user');
const data = await response.json();
return data;
}
async function renderUserTable(data) {
  const userData = await fetchUserData();
  userData.forEach(user => {
      const row = userTable.insertRow();
      row.setAttribute('data-id', user._id);
      const userIdCell = row.insertCell(0);
      const userNameCell = row.insertCell(1);
      const emailCell = row.insertCell(2);
      const deleteCell = row.insertCell(3);
      const updateCell = row.insertCell(4);
      userIdCell.textContent = user._id;
      userNameCell.textContent = user.name;
      emailCell.textContent = user.email;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'red-delete-button'; // Apply the CSS class
      deleteButton.setAttribute('data-id', user._id);
      deleteButton.addEventListener('click', () => deleteUser(user._id));
      deleteCell.appendChild(deleteButton);
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.setAttribute('data-id', user._id);
      updateButton.addEventListener('click', () => handleEditClickUser(user._id));
      updateCell.appendChild(updateButton);
      // Hidden row for editing
      const editRow = userTable.insertRow();
      editRow.style.display = 'none';
      editRow.insertCell(0);
      const editCell = editRow.insertCell(1);
      editCell.colSpan = 5; // Span the entire row for input fields
      const editForm = document.createElement('form');
      for (const key in user) {
          if (key == 'name' || key == 'email') { // Exclude _id and __v fields
              const input = document.createElement('input');
              input.type = 'text';
              input.name = key;
              input.value = user[key];
              editForm.appendChild(input);
          }
      }
      const confirmUpdateButton = document.createElement('button');
      confirmUpdateButton.textContent = 'Confirm Update';
      confirmUpdateButton.addEventListener('click', () => handleUpdateClickUser(user._id, editForm));
      editForm.appendChild(confirmUpdateButton);
      editCell.appendChild(editForm);
  });
}
// Function to delete a user
async function deleteUser(userId) {
  console.log(userId);
  try {
    const response = await fetch(`/api/store-user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      // Remove the deleted user from the table and re-render the table
      const deletedRow = userTable.querySelector(`[data-id="${userId}"]`);
      if (deletedRow) {
        userTable.removeChild(deletedRow);
      }
    } else {
      console.error('Failed to delete user.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}
// Function to update a user
async function updateUser(userId,updatedData) {
  try {
    console.log("user id:", userId);
    console.log("updated user data:", updatedData);
    const response = await fetch(`/api/store-user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
       // Find the row in the table that needs to be updated
       const updatedRow = userTable.querySelector(`[data-id="${userId}"]`);
      if (updatedRow) {
         // Update the cells with the new data
         const cells = updatedRow.cells;
         cells[1].textContent = updatedData.name;
         cells[2].textContent = updatedData.email;
          // Hide the edit form row
        const editRow = updatedRow.nextElementSibling;
        editRow.style.display = 'none';
      }
    } else {
      console.error('Failed to update user.');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
}
function handleEditClickUser(userId) {
  const userRow = userTable.querySelector(`[data-id="${userId}"]`);
  const editRow = userRow.nextElementSibling;
 // Toggle visibility of the edit form row
 editRow.style.display = editRow.style.display === 'none' ? 'table-row' : 'none';
}
async function handleUpdateClickUser(userId, editForm) {
console.log('Updating user:', userId);
const updatedData = {};
for (const input of editForm.elements) {
    if (input.type === 'text') {
        updatedData[input.name] = input.value;
    }
}
console.log('Updated data:', updatedData);
try {
    const response = await fetch(`/api/store-user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    console.log('API Response:',data);
    if (data.success) {
        // Update the table with the new data
        const userRow = userTable.querySelector(`[data-id="${userId}"]`);
        const editRow = userRow.nextElementSibling;
        editRow.style.display = 'none'; // Hide the edit row
        // Update the visible row cells with the new data
        for (let i = 1; i < userRow.cells.length - 2; i++) {
            const key = userRow.cells[i].getAttribute('data-key');
            userRow.cells[i].textContent = updatedData[key];
        }
updateUser(userId,updatedData);
updateUserTable(updatedData);
    } else {
        console.error('Failed to update user.');
    }
} catch (error) {
    console.error('Error updating user:', error);
}
}
// Add an event listener for search form submission
document.getElementById("searchUserButton").addEventListener("click", async function() {
  // Get the search query from the input field
  const searchQuery = document.getElementById("searchUser").value;
  if (searchQuery) {
    const searchData = await findUserById(searchQuery);
    updateUserTable(searchData); // Use the correct function here
  } else {
    updateUserTable(originalUserData);  // Revert to original data when search is cleared
  }
});
/*
// Function to fetch user data by id
async function findUserById(userId) {
  try {
      const response = await fetch(`/api/store-user/${userId}`); // Replace with your actual API endpoint
      const data = await response.json();
      return Array.isArray(data) ? data : [data]; // Wrap data in an array if it's not an array
  } catch (error) {
      console.error("Error fetching user by id:", error);
      return [];
  }
}
*/
// Function to fetch user data by id
async function findUserById(userId) {
  try {
      const response = await fetch(`/api/current-user`); // Replace with your actual API endpoint
      const data = await response.json();
      return Array.isArray(data) ? data : [data]; // Wrap data in an array if it's not an array
  } catch (error) {
      console.error("Error fetching location by id:", error);
      return [];
  }
}
function updateUserTable(data) {
  const tableBody = document.getElementById("userTable").getElementsByTagName("tbody")[0];
  // Clear existing table
  tableBody.innerHTML = "";
  data.forEach(user => {
    const row = tableBody.insertRow();
    row.setAttribute("data-id", user._id); // Set the data-id attribute for the row
    const userIdCell = row.insertCell(0);
    const userNameCell = row.insertCell(1);
    const emailCell = row.insertCell(2);
    const deleteCell = row.insertCell(3);
    const updateCell = row.insertCell(4);
    userIdCell.textContent = user._id;
    userNameCell.textContent = user.name;
    emailCell.textContent = user.email;
    const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'red-delete-button'; // Apply the CSS class
      deleteButton.setAttribute('data-id', user._id);
      deleteButton.addEventListener('click', () => deleteUser(user._id));
      deleteCell.appendChild(deleteButton);
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.setAttribute('data-id', user._id);
      updateButton.addEventListener('click', () => handleEditClickUser(user._id));
      updateCell.appendChild(updateButton);
      // Hidden row for editing
      const editRow = userTable.insertRow();
      editRow.style.display = 'none';
      editRow.insertCell(0);
      const editCell = editRow.insertCell(1);
      editCell.colSpan = 5; // Span the entire row for input fields
      const editForm = document.createElement('form');
      for (const key in user) {
          if (key == 'name' || key !== 'email') {
              const input = document.createElement('input');
              input.type = 'text';
              input.name = key;
              input.value = user[key];
              editForm.appendChild(input);
          }
      }
      const confirmUpdateButton = document.createElement('button');
      confirmUpdateButton.textContent = 'Confirm Update';
      confirmUpdateButton.addEventListener('click', () => handleUpdateClickUser(user._id, editForm));
      editForm.appendChild(confirmUpdateButton);
      editCell.appendChild(editForm);
  });
}

  async function init() {
    const userData = await fetchUserData();
    originalUserData = userData; // Set the fetched data to originalUserData
    const productData = await fetchProductData();
    originalProductData = productData; // Set the fetched data to originalProductData
    const locationData = await fetchLocationData();
    originalLocationData = locationData; // Set the fetched data to originalLocationData
    const orderData=await fetchOrderData();
    originalOrderData=orderData;
  
    renderUserTable(userData);
    renderProductsTable(); // Call this function to render the product table
    renderLocationTable();
    renderOrderTable();
  }
  init(); // Initialize the script when the page loads
  
  //D3

  d3.json("http://localhost:3330/api/average-prices", function (error, data) {
    if (error) throw error;
    const tableBody = d3.select("#average-prices tbody");
    const rows = tableBody.selectAll("tr")
        .data(data)
        .enter().append("tr");
    rows.selectAll("td")
        .data(d => [d._id, d.averagePrice.toFixed(2)])
        .enter().append("td")
        .text(d=>d);
});
  
  // Define the dimensions of the SVG canvas
  const width = 1800; // גודל ה-SVG גדל ל-800
  const height = 400;
  
  // Create the SVG element
  const svg = d3.select("#chart")
      .attr("width", width)
      .attr("height", height);
  
  // Define the margins for the chart
  const margin = { top: 20, right: 30, bottom: 50, left: 40 }; // שינוי בהגדרת הרגל תחתון
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  
  // Create scales for X and Y values
  const xScale = d3.scaleBand()
      .range([0, innerWidth])
      .padding(0.1);
  
  const yScale = d3.scaleLinear()
      .range([innerHeight, 0]);
  
  // Create the chart group
  const chartGroup = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Load data from MongoDB
  d3.json("http://localhost:3330/api/store-products", function(error, data) {
      if (error) throw error;
  
      // Create an array of product names and their corresponding prices
      const products = data.map(item => ({ name: item.name, price: item.price }));
  
      // Set domains for X and Y scales
      xScale.domain(products.map(product => product.name));
      yScale.domain([0, d3.max(products, product => product.price)]);
  
      // Create X and Y axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);
  
      chartGroup.append("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(0,${innerHeight})`)
          .call(xAxis);
  
      chartGroup.append("g")
          .attr("class", "y-axis")
          .call(yAxis);
  
      // Create bars for the products
      chartGroup.selectAll(".bar")
          .data(products)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", product => xScale(product.name))
          .attr("y", product => yScale(product.price))
          .attr("width", xScale.bandwidth())
          .attr("height", product => innerHeight - yScale(product.price));
  });

const productsTable = document.getElementById('productsTable').getElementsByTagName('tbody')[0];

async function fetchProductData() {
const response = await fetch('/api/store-products');
const data = await response.json();
return data;
}

// Function to render the products table
async function renderProductsTable() {
const productData = await fetchProductData();
productData.forEach(product => {
  const row = productsTable.insertRow();
  row.setAttribute('data-id', product._id);
  const idCell = row.insertCell(0);
  const nameCell = row.insertCell(1);
  const imageCell = row.insertCell(2);

  // Create an <img> element for the image
  const imageElement = document.createElement('img');
  imageElement.src = product.image;
  imageElement.alt = 'Product Image';
  imageElement.className = 'product-image'; // Add the CSS class
  // Append the <img> element to the imageCell
  imageCell.innerHTML = '';
  imageCell.appendChild(imageElement);

  const brandCell = row.insertCell(3);
  const categoryCell = row.insertCell(4);
  const countInStockCell = row.insertCell(5);
  const ratingCell = row.insertCell(6);
  const numReviewsCell = row.insertCell(7);
  const descriptionCell = row.insertCell(8);
  const colorCell = row.insertCell(9);
  const popularityCell = row.insertCell(10);
  const deleteCell = row.insertCell(11);

  idCell.textContent = product._id;
  nameCell.textContent = product.name;
  brandCell.textContent = product.brand;
  categoryCell.textContent = product.category;
  countInStockCell.textContent = product.countInStock;
  ratingCell.textContent = product.rating;
  numReviewsCell.textContent = product.numReviews;
  descriptionCell.textContent = product.description;
  colorCell.textContent = product.color;
  popularityCell.textContent = product.popularity;
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'red-delete-button'; // Apply the CSS class
  deleteButton.setAttribute('data-id', product._id); // Set the data-id attribute
  deleteButton.addEventListener('click', () => deleteProduct(product._id)); // Pass product ID
  deleteCell.appendChild(deleteButton);
});
}

// Function to delete a product
async function deleteProduct(productId) {
  try {
    const response = await fetch(`/api/store-products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      // Remove the deleted product from the table and re-render the table
      const deletedRow = productsTable.querySelector(`[data-id="${productId}"]`);
      if (deletedRow) {
        productsTable.removeChild(deletedRow);
      }
    } else {
      console.error('Failed to delete product.');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Add an event listener for search form submission
document.getElementById("searchUser").addEventListener("click", async function() {
  // Get the search query from the input field
  const searchQuery = document.getElementById("searchUserButton").value;
  if (searchQuery) {
    const searchData = await findUserByEmail(searchQuery);
    updateUserTable(searchData);
  } else {
    updateUserTable(originalUserData);  // Revert to original data when search is cleared
  }
});

// Function to fetch user data by email
async function findUserByEmail(email) {
  try {
      const response = await fetch(`/api/user-by-email?email=${email}`); // Replace with your actual API endpoint
      const data = await response.json();
      return Array.isArray(data) ? data : [data]; // Wrap data in an array if it's not an array
  } catch (error) {
      console.error("Error fetching user by email:", error);
      return [];
  }
}
/*
function updateUserTable(data) {
  const tableContainer = d3.select('#userTable');
  const table = tableContainer.select('table'); // Select the existing table
  const tbody = table.select('tbody');
  const rows = tbody.selectAll('tr').data(data, user => user._id);
  rows.exit().remove(); // Remove extra rows
  const newRow = rows.enter().append('tr');
  newRow.append('td').text(user => user._id);
  newRow.append('td').text(user => user.name);
  newRow.append('td').text(user => user.email);
  const actionsCell = newRow.append('td');
  const deleteButton = actionsCell.append('button').attr('class', 'btn btn-danger').text('Delete');
  deleteButton.on('click', user => deleteUser(user._id));
  rows.merge(newRow); // Merge new and existing rows
}
*/
// Add an event listener for search form submission
document.getElementById("searchProductIdButton").addEventListener("click", async function() {
  // Get the search query from the input field
  const searchQuery = document.getElementById("searchProductId").value;
  if (searchQuery) {
    const searchData = await findProductById(searchQuery);
    updateProductsTable(searchData); // Use the correct function here
  } else {
    updateProductsTable(originalProductData);  // Revert to original data when search is cleared
  }
});

// Function to fetch product data by id
async function findProductById(productId) {
  try {
      const response = await fetch(`/api/store-products/${productId}`); // Replace with your actual API endpoint
      const data = await response.json();
      return Array.isArray(data) ? data : [data]; // Wrap data in an array if it's not an array
  } catch (error) {
      console.error("Error fetching product by id:", error);
      return [];
  }
}
function updateProductsTable(data) {
  const tableBody = document.getElementById("productsTable").getElementsByTagName("tbody")[0];
  // Clear existing table
  tableBody.innerHTML = "";
  
  data.forEach(product => {
    const row = tableBody.insertRow();
    row.setAttribute("data-id", product._id); // Set the data-id attribute for the row
    const idCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const imageCell = row.insertCell(2);

    // Create an <img> element for the image
    const imageElement = document.createElement("img");
    imageElement.src = product.image;
    imageElement.alt = "Product Image";
    imageElement.className='product-image';
    imageCell.innerHTML='';
    // Append the <img> element to the imageCell
    imageCell.appendChild(imageElement);

    const brandCell = row.insertCell(3);
    const categoryCell = row.insertCell(4);
    const countInStockCell = row.insertCell(5);
    const ratingCell = row.insertCell(6);
    const numReviewsCell = row.insertCell(7);
    const descriptionCell = row.insertCell(8);
    const colorCell = row.insertCell(9);
    const popularityCell = row.insertCell(10);
    const actionsCell = row.insertCell(11);
    idCell.textContent = product._id;
    nameCell.textContent = product.name;
    brandCell.textContent = product.brand;
    categoryCell.textContent = product.category;
    countInStockCell.textContent = product.countInStock;
    ratingCell.textContent = product.rating;
    numReviewsCell.textContent = product.numReviews;
    descriptionCell.textContent = product.description;
    colorCell.textContent = product.color;
    popularityCell.textContent = product.popularity;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("data-id", product._id); // Set the data-id attribute
    deleteButton.addEventListener("click", () => deleteProduct(product._id)); // Pass product ID
    actionsCell.appendChild(deleteButton);
  });
}







//location
const locationTable = document.getElementById('locationTable').getElementsByTagName('tbody')[0];

async function fetchLocationData() {
const response = await fetch('/api/store-location');
const data = await response.json();
return data;
}

async function renderLocationTable(data) {
  const locationData = await fetchLocationData();

  locationData.forEach(location => {
      const row = locationTable.insertRow();
      row.setAttribute('data-id', location._id);

      const idCell = row.insertCell(0);
      const nameCell = row.insertCell(1);
      const latCell = row.insertCell(2);
      const lngCell = row.insertCell(3);
      const deleteCell = row.insertCell(4);
      const updateCell = row.insertCell(5);

      idCell.textContent = location._id;
      nameCell.textContent = location.name;
      latCell.textContent = location.lat;
      lngCell.textContent = location.lng;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'red-delete-button'; // Apply the CSS class
      deleteButton.setAttribute('data-id', location._id);
      deleteButton.addEventListener('click', () => deleteLocation(location._id));
      deleteCell.appendChild(deleteButton);

      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.setAttribute('data-id', location._id);
      updateButton.addEventListener('click', () => handleEditClickLocation(location._id));
      updateCell.appendChild(updateButton);

      // Hidden row for editing
      const editRow = locationTable.insertRow();
      editRow.style.display = 'none';
      editRow.insertCell(0);
      const editCell = editRow.insertCell(1);
      editCell.colSpan = 5; // Span the entire row for input fields

      const editForm = document.createElement('form');
      for (const key in location) {
          if (key !== '_id' && key !== '__v') { // Exclude _id and __v fields
              const input = document.createElement('input');
              input.type = 'text';
              input.name = key;
              input.value = location[key];
              editForm.appendChild(input);
          }
      }

      const confirmUpdateButton = document.createElement('button');
      confirmUpdateButton.textContent = 'Confirm Update';
      confirmUpdateButton.addEventListener('click', () => handleUpdateClickLocation(location._id, editForm));
      editForm.appendChild(confirmUpdateButton);

      editCell.appendChild(editForm);
  });
}

  // Function to delete a location
async function deleteLocation(locationId) {
  try {
    const response = await fetch(`/api/store-location/${locationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      // Remove the deleted product from the table and re-render the table
      const deletedRow = locationTable.querySelector(`[data-id="${locationId}"]`);
      if (deletedRow) {
        locationTable.removeChild(deletedRow);
      }
    } else {
      console.error('Failed to delete location.');
    }
  } catch (error) {
    console.error('Error deleting location:', error);
  }
}

// Function to update a location
async function updateLocation(locationId,updatedData) {
  try {
    console.log("location id:", locationId);
    console.log("updated location data:", updatedData);

    const response = await fetch(`/api/store-location/${locationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
       // Find the row in the table that needs to be updated
       const updatedRow = locationTable.querySelector(`[data-id="${locationId}"]`);

      if (updatedRow) {
         // Update the cells with the new data
         const cells = updatedRow.cells;
         cells[1].textContent = updatedData.name;
         cells[2].textContent = updatedData.lat;
         cells[3].textContent = updatedData.lng;

          // Hide the edit form row
        const editRow = updatedRow.nextElementSibling;
        editRow.style.display = 'none';
      }
    } else {
      console.error('Failed to update location.');
    }
  } catch (error) {
    console.error('Error updating location:', error);
  }
}
function handleEditClickLocation(locationId) {
  const locationRow = locationTable.querySelector(`[data-id="${locationId}"]`);
  const editRow = locationRow.nextElementSibling;
 // Toggle visibility of the edit form row
 editRow.style.display = editRow.style.display === 'none' ? 'table-row' : 'none';
 //updateLocationTable(locationData); // You may need to pass additional data here
 
}


async function handleUpdateClickLocation(locationId, editForm) {
console.log('Updating location:', locationId);

const updatedData = {};
for (const input of editForm.elements) {
    if (input.type === 'text') {
        updatedData[input.name] = input.value;
    }
}
console.log('Updated data:', updatedData);
try {
    const response = await fetch(`/api/store-location/${locationId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    console.log('API Response:',data);
    if (data.success) {
        // Update the table with the new data
        const locationRow = locationTable.querySelector(`[data-id="${locationId}"]`);
        const editRow = locationRow.nextElementSibling;
        editRow.style.display = 'none'; // Hide the edit row
        // Update the visible row cells with the new data
        for (let i = 1; i < locationRow.cells.length - 2; i++) {
            const key = locationRow.cells[i].getAttribute('data-key');
            locationRow.cells[i].textContent = updatedData[key];
        }
        /*
        const editedLocationIndex = locationData.findIndex(location => location._id === locationId);
        if (editedLocationIndex !== -1) {
          locationData[editedLocationIndex] = updatedData;
        }
*/
updateLocation(locationId,updatedData);
updateLocationTable(updatedData);
    } else {
        console.error('Failed to update location.');
    }
} catch (error) {
    console.error('Error updating location:', error);
}
}

// Add an event listener for search form submission
document.getElementById("searchLocationButton").addEventListener("click", async function() {
  // Get the search query from the input field
  const searchQuery = document.getElementById("searchLocation").value;
  if (searchQuery) {
    const searchData = await findLocationById(searchQuery);
    updateLocationTable(searchData); // Use the correct function here
  } else {
    updateLocationTable(originalLocationData);  // Revert to original data when search is cleared
  }
});

// Function to fetch location data by id
async function findLocationById(locationId) {
  try {
      const response = await fetch(`/api/store-location/${locationId}`); // Replace with your actual API endpoint
      const data = await response.json();
      return Array.isArray(data) ? data : [data]; // Wrap data in an array if it's not an array
  } catch (error) {
      console.error("Error fetching location by id:", error);
      return [];
  }
}
function updateLocationTable(data) {
  const tableBody = document.getElementById("locationTable").getElementsByTagName("tbody")[0];
  // Clear existing table
  tableBody.innerHTML = "";
  data.forEach(location => {
    const row = tableBody.insertRow();
    row.setAttribute("data-id", location._id); // Set the data-id attribute for the row
    const idCell = row.insertCell(0);
    const nameCell = row.insertCell(1);
    const latCell = row.insertCell(2);
    const lngCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    const updateCell = row.insertCell(5);
    idCell.textContent = location._id;
    nameCell.textContent = location.name;
    latCell.textContent = location.lat;
    lngCell.textContent = location.lng;
    const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'red-delete-button'; // Apply the CSS class
      deleteButton.setAttribute('data-id', location._id);
      deleteButton.addEventListener('click', () => deleteLocation(location._id));
      deleteCell.appendChild(deleteButton);
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.setAttribute('data-id', location._id);
      updateButton.addEventListener('click', () => handleEditClickLocation(location._id));
      updateCell.appendChild(updateButton);

      // Hidden row for editing
      const editRow = locationTable.insertRow();
      editRow.style.display = 'none';
      editRow.insertCell(0);
      const editCell = editRow.insertCell(1);
      editCell.colSpan = 5; // Span the entire row for input fields
      const editForm = document.createElement('form');
      for (const key in location) {
          if (key !== '_id' && key !== '__v') { // Exclude _id and __v fields
              const input = document.createElement('input');
              input.type = 'text';
              input.name = key;
              input.value = location[key];
              editForm.appendChild(input);
          }
      }
      const confirmUpdateButton = document.createElement('button');
      confirmUpdateButton.textContent = 'Confirm Update';
      confirmUpdateButton.addEventListener('click', () => handleUpdateClickLocation(location._id, editForm));
      editForm.appendChild(confirmUpdateButton);
      editCell.appendChild(editForm);
  });
}
  
// Add an event listener for form submission - add new location 
document.getElementById("addLocationForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get values form fields
  const name = document.getElementById("locname").value;
  const lat = parseFloat(document.getElementById("lat").value);
  const lng = parseFloat(document.getElementById("lng").value);yScale

  const locationData = {
    name,
    lat,
    lng,
  };

  // Call the addLocation function with the extracted data
 await addLocation(locationData, event);
});

// add a new location to mongoDB
async function addLocation(locationData, event) {
  console.log("inside addLocation");
  try {
    const response = await fetch("/api/add-location", {
      method: "POST",
          headers: {
            'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationData)
    });
    const data = await response.json();
    console.log("log:", data)
    if (data.message === 'Location added successfully') {
      console.log("Location added successfully!");
      // Reset the form after successful location addition
      event.target.reset();
      } else {
      console.error("Failed to add location.");
    }
  } catch (error) {
    console.error("Error adding location:", error);
  }
}










//Orders 
const orderTable = document.getElementById('orderTable').getElementsByTagName('tbody')[0];

    // Fetch order data from MongoDB using an API endpoint
    async function fetchOrderData() {
      const response = await fetch('/api/all-orders'); 
      const data = await response.json();
      return data;
  }

  async function renderOrderTable(data) {
    const orderData = await fetchOrderData();
  
    orderData.forEach(order => {
        const row = orderTable.insertRow();
        row.setAttribute('data-id', order._id);
  
        const orderIdCell=row.insertCell(0);
        const userOrderIdCell = row.insertCell(1);
        const dateCell = row.insertCell(2);
        const costCell = row.insertCell(3);
        const productsListCell = row.insertCell(4);
        const deleteCell = row.insertCell(5);
        const updateCell = row.insertCell(6);
  
        orderIdCell.textContent = order._id;
        userOrderIdCell.textContent = order.idUserOrdered;
        dateCell.textContent = order.date;
        costCell.textContent = order.cost;
        var productsNames = new Array(); 
        order.productList.forEach(object => {
          productsNames.push(object.productName);
        });    
        productsListCell.textContent = productsNames;
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'red-delete-button'; // Apply the CSS class
        deleteButton.setAttribute('data-id', order._id);
        deleteButton.addEventListener('click', () => deleteOrder(order._id));
        deleteCell.appendChild(deleteButton);
  
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.setAttribute('data-id', order._id);
        updateButton.addEventListener('click', () => handleEditClickOrder(order._id));
        updateCell.appendChild(updateButton);
  
        // Hidden row for editing
        const editRow = orderTable.insertRow();
        editRow.style.display = 'none';
        editRow.insertCell(0);
        const editCell = editRow.insertCell(1);
        editCell.colSpan = 5; // Span the entire row for input fields
  
        const editForm = document.createElement('form');
        for (const key in order) {
            if (key !== '_id') { // Exclude _id 
                const input = document.createElement('input');
                input.type = 'text';
                input.name = key;
                input.value = order[key];
                editForm.appendChild(input);
            }
        }
  
        const confirmUpdateButton = document.createElement('button');
        confirmUpdateButton.textContent = 'Confirm Update';
        confirmUpdateButton.addEventListener('click', () => handleUpdateClickOrder(order._id, editForm));
        editForm.appendChild(confirmUpdateButton);
  
        editCell.appendChild(editForm);
        
    });
  }
  

   // Function to delete an order
async function deleteOrder(orderId) {
  try {
    const response = await fetch(`/api/delete-order/${orderId}`, {
      
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      // Remove the deleted order from the table and re-render the table
      const deletedRow = orderTable.querySelector(`[data-id="${orderId}"]`);
      if (deletedRow) {
        orderTable.removeChild(deletedRow);
      }
    } else {
      console.error('Failed to delete order.');
    }
  } catch (error) {
    console.error('Error deleting order:', error);
  }
}

  // Add an event listener for search by order id form submission
document.getElementById("searchOrderButton").addEventListener("click", async function() {
  // Get the search query from the input field
  const searchQuery = document.getElementById("searchOrder").value;
  if (searchQuery) {
    const searchData = await findOrderById(searchQuery);
    updateOrderTable(searchData); // Use the correct function here
  } else {
    updateOrderTable(originalOrderData);  // Revert to original data when search is cleared
  }
});

// Add an event listener for search by user form submission
document.getElementById("searchOrderByUserButton").addEventListener("click", async function() {
  // Get the search query from the input field
  const searchQuery = document.getElementById("searchOrderByUser").value;
  if (searchQuery) {
    const searchData = await findOrderByUser(searchQuery);
    updateOrderTable(searchData); // Use the correct function here
  } else {
    updateOrderTable(originalOrderData);  // Revert to original data when search is cleared
  }
});


// Function to fetch order data by id
async function findOrderById(orderId) {
  try {
      const response = await fetch(`/api/orders/${orderId}`); // Replace with your actual API endpoint
      const data = await response.json();
      return Array.isArray(data) ? data : [data]; // Wrap data in an array if it's not an array
  } catch (error) {
      console.error("Error fetching order by id:", error);
      return [];
  }
}

// Function to fetch order data by user
async function findOrderByUser(orderUser) {
  try {
      const response = await fetch(`/api/store-orders/${orderUser}`); // Replace with your actual API endpoint
      const data = await response.json();
      return Array.isArray(data) ? data : [data]; // Wrap data in an array if it's not an array
  } catch (error) {
      console.error("Error fetching order by user:", error);
      return [];
  }
}

function updateOrderTable(data) {
  const tableBody = document.getElementById("orderTable").getElementsByTagName("tbody")[0];
  // Clear existing table
  tableBody.innerHTML = "";
  data.forEach(order => {
    const row = tableBody.insertRow();
    row.setAttribute("data-id", order._id); // Set the data-id attribute for the row
    const orderIdCell=row.insertCell(0);
        const userOrderIdCell = row.insertCell(1);
        const dateCell = row.insertCell(2);
        const costCell = row.insertCell(3);
        const productsListCell = row.insertCell(4);
        const deleteCell = row.insertCell(5);
        const updateCell = row.insertCell(6);
  
       orderIdCell.textContent = order._id;
       userOrderIdCell.textContent = order.idUserOrdered;
       dateCell.textContent = order.date;
       costCell.textContent = order.cost;
       var productsNames = new Array(); 
       order.productList.forEach(object => {
         productsNames.push(object.productName);
       });    
       productsListCell.textContent = productsNames;
       
       const deleteButton = document.createElement('button');
       deleteButton.textContent = 'Delete';
       deleteButton.className = 'red-delete-button'; // Apply the CSS class
       deleteButton.setAttribute('data-id', order._id);
       deleteButton.addEventListener('click', () => deleteOrder(order._id));
       deleteCell.appendChild(deleteButton);
       const updateButton = document.createElement('button');
       updateButton.textContent = 'Update';
       updateButton.setAttribute('data-id', order._id);
       updateButton.addEventListener('click', () => handleEditClickOrder(order._id));
       updateCell.appendChild(updateButton);
 
       // Hidden row for editing
       const editRow = orderTable.insertRow();
       editRow.style.display = 'none';
       editRow.insertCell(0);
       const editCell = editRow.insertCell(1);
       editCell.colSpan = 5; // Span the entire row for input fields
       const editForm = document.createElement('form');
       for (const key in order) {
           if (key !== '_id') { // Exclude _id
               const input = document.createElement('input');
               input.type = 'text';
               input.name = key;
               input.value = order[key];
               editForm.appendChild(input);
           }
       }
       const confirmUpdateButton = document.createElement('button');
       confirmUpdateButton.textContent = 'Confirm Update';
       confirmUpdateButton.addEventListener('click', () => handleUpdateClickOrder(order._id, editForm));
       editForm.appendChild(confirmUpdateButton);
       editCell.appendChild(editForm);
 
  });
}

// Function to update an order
 
async function updateOrder(orderId,updatedData) {
  try {
    const response = await fetch(`/api/store-orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
       // Find the row in the table that needs to be updated
       const updatedRow = orderTable.querySelector(`[data-id="${orderId}"]`);
      if (updatedRow) {
         // Update the cells with the new data
         const cells = updatedRow.cells;
         cells[1].textContent = updatedData.idUserOrdered;
         cells[2].textContent = updatedData.date;
         cells[3].textContent = updatedData.cost;
         cells[4].textContent = updatedData.productList;
          // Hide the edit form row
        const editRow = updatedRow.nextElementSibling;
        editRow.style.display = 'none';
      }
    } else {
      console.error('Failed to update order.');
    }
  } catch (error) {
    console.error('Error updating order:', error);
  }
}
function handleEditClickOrder(orderId) {
  const orderRow = orderTable.querySelector(`[data-id="${orderId}"]`);
  const editRow = orderRow.nextElementSibling;
 // Toggle visibility of the edit form row
 editRow.style.display = editRow.style.display === 'none' ? 'table-row' : 'none';
}
async function handleUpdateClickOrder(orderId, editForm) {
console.log('Updating order:', orderId);
const updatedData = {};
for (const input of editForm.elements) {
    if (input.type === 'text') {
        updatedData[input.name] = input.value;
    }
}
console.log('Updated data:', updatedData);
try {
    const response = await fetch(`/api/store-orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    console.log('API Response:',data);
    if (data.success) {
        // Update the table with the new data
        const orderRow = orderTable.querySelector(`[data-id="${orderId}"]`);
        const editRow = orderRow.nextElementSibling;
        editRow.style.display = 'none'; // Hide the edit row
        // Update the visible row cells with the new data
        for (let i = 1; i < orderRow.cells.length - 2; i++) {
            const key = orderRow.cells[i].getAttribute('data-key');
            orderRow.cells[i].textContent = updatedData[key];
        }
        updateOrder(orderId,updatedData);
updateOrderTable(updatedData);
    } else {
        console.error('Failed to update order.');
    }
} catch (error) {
    console.error('Error updating order:', error);
}
}