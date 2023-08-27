let originalUserData = []; // Initialize as an empty array
let originalProductData = []; // Initialize as an empty array
let originalLocationData = []; // Initialize as an empty array


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
  
  // add a new product to mongoDB
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
      console.log("log:", data)
      if (data.message === 'Product added successfully') {
        console.log("Product added successfully!");
        // Reset the form after successful product addition
        event.target.reset();
        } else {
        console.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }
  
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
      const deleteButton = actionsCell.append('button').attr('class', 'btn btn-danger').text('Delete');
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

  async function init() {
    const userData = await fetchUserData();
    originalUserData = userData; // Set the fetched data to originalUserData
    const productData = await fetchProductData();
    originalProductData = productData; // Set the fetched data to originalProductData
    const locationData = await fetchLocationData();
    originalLocationData = locationData; // Set the fetched data to originalLocationData
  
    renderUserTable(userData);
    renderProductsTable(); // Call this function to render the product table
    renderLocationTable();
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
const response = await fetch('/api/products');
const data = await response.json();
return data;
}

async function renderProductsTable() {
const productData = await fetchProductData();
productData.forEach(product => {
  const row = productsTable.insertRow();
  row.setAttribute('data-id', product._id); // Set the data-id attribute for the row
  const idCell=row.insertCell(0);
  const nameCell = row.insertCell(1);
  const imageCell = row.insertCell(2);
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
  imageCell.textContent = product.image;
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
renderProductsTable();

// Add an event listener for search form submission
document.getElementById("searchButton").addEventListener("click", async function() {
  // Get the search query from the input field
  const searchQuery = document.getElementById("searchEmail").value;
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
    imageCell.textContent = product.image;
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
      deleteButton.setAttribute('data-id', location._id);
      deleteButton.addEventListener('click', () => deleteLocation(location._id));
      deleteCell.appendChild(deleteButton);

      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.setAttribute('data-id', location._id);
      updateButton.addEventListener('click', () => handleEditClick(location._id));
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
      confirmUpdateButton.addEventListener('click', () => handleUpdateClick(location._id, editForm));
      editForm.appendChild(confirmUpdateButton);

      editCell.appendChild(editForm);
  });
}


  function handleEditClick(locationId) {
    const editRow = locationTable.querySelector(`[data-id="${locationId}"]`).nextElementSibling;
    editRow.style.display = 'table-row'; // Show the hidden row
}

async function handleUpdateClick(locationId, editForm) {
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
      } else {
          console.error('Failed to update location.');
      }
  } catch (error) {
      console.error('Error updating location:', error);
  }
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
      }
    } else {
      console.error('Failed to update location.');
    }
  } catch (error) {
    console.error('Error updating location:', error);
  }
}