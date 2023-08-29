/*
These actions check who the user is currently connected to the site, 
then displays his information on the screen - in a generic way
*/

const userConsent = true;

if (userConsent) {
    fetch(`/api/current-user`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {
            console.log(user);
            document.getElementById('user-name').innerText = user.name;
            document.getElementById('user-subtitle').innerText = user.description;
            document.getElementById('aboutMe').innerText = user.description;
            document.getElementById('email').innerText = `Email: ${user.email}`;
            document.getElementById('location').innerText = `Location: ${user.location}`;

            // Adding the user's name to the canvas
            const canvas = document.getElementById("userCanvas");
            const ctx = canvas.getContext("2d");

            ctx.font = "30px Arial";
            const nameWidth = ctx.measureText(user.name).width; // Measure the name's width
            const xPosition = (canvas.width - nameWidth) / 2; // Horizontal centering for the name

            ctx.strokeText(user.name, xPosition, 60); // User's name
            
            ctx.font = "20px Arial";
            const signatureWidth = ctx.measureText("Signature").width; // Measure the text's width
            const xSignaturePosition = (canvas.width - signatureWidth) / 2 - 20; // Left-aligned horizontal position for the text

            ctx.fillText("Signature:", xSignaturePosition, 30); // The text "Signature"
        })
        .catch(error => console.error('Error fetching user:', error));
}



//display Orders 

const orderTable = document.getElementById('orderTable').getElementsByTagName('tbody')[0];

// Fetch user email
async function fetchUserEmail() {
    try {
        const response = await fetch('/getLoggedInID');
        if (response.ok) {
            const data = await response.json();
            return data.userEmail; // This might be null if the user is not logged in
        } else {
            console.error('Failed to fetch user email');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching user email', error);
        return null;
    }
}

// Function to fetch all orders of the current user and display them
async function displayAllUserOrders() {
    try {
        const currentUserEmail = await fetchUserEmail();
        const orderData = await fetchOrderData(currentUserEmail);
        updateOrderTable(orderData);
    } catch (error) {
        console.error('Error displaying user orders:', error);
    }
}

// Function to fetch order data from MongoDB using an API endpoint
async function fetchOrderData(currentUserEmail) {
    try {
        console.log("Email:", currentUserEmail);
        const response = await fetch(`/api/orderByUser/${currentUserEmail}`);
        console.log("fetch order:", response);
        if (!response.ok) {
            throw new Error('Failed to fetch orders.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching order data:', error);
        return [];
    }
}

async function updateOrderTable(data) {
  // Clear existing table
  orderTable.innerHTML = '';

  data.forEach(order => {
      const row = orderTable.insertRow();
      row.setAttribute('data-id', order._id);

      const orderIdCell = row.insertCell(0);
      const userOrderIdCell = row.insertCell(1);
      const dateCell = row.insertCell(2);
      const costCell = row.insertCell(3);
      const productsListCell = row.insertCell(4);

      orderIdCell.textContent = order._id;
      userOrderIdCell.textContent = order.idUserOrdered;
      dateCell.textContent = order.date;
      costCell.textContent = order.cost;

      const productsNames = order.productList.map(object => object.productName).join(', ');
      productsListCell.textContent = productsNames;
  });
}

/*
// Function to delete an order
async function deleteOrder(orderId) {
  try {
    const response = await fetch(`/api/delete-order/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete order.');
    }
    const data = await response.json();
    if (data.success) {
      // Remove the deleted order from the table and re-render the table
      const deletedRow = orderTable.querySelector(`[data-id="${orderId}"]`);
      if (deletedRow) {
        orderTable.removeChild(deletedRow);
      }
    }
  } catch (error) {
    console.error('Error deleting order:', error);
  }
}
*/

//search by ID 
// Add event listeners
document.getElementById('searchOrderButton').addEventListener('click', async () => {
  const searchQuery = document.getElementById('searchOrder').value;
  if (searchQuery) {
    const searchData = await findOrderById(searchQuery);
    updateOrderTable(searchData);
  } else {
    renderOrderTable(); // Revert to original data when search is cleared
  }
});

// Function to fetch order data by ID
async function findOrderById(orderId) {
  try {
    const response = await fetch(`/api/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order by ID.');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    return [];
  }
}

// Add event listeners
document.getElementById('searchOrderButton').addEventListener('click', async () => {
  const searchQuery = document.getElementById('searchOrder').value;
  if (searchQuery) {
      const searchData = await findOrderById(searchQuery);
      updateOrderTable(searchData);
  } else {
      renderOrderTable(); // Revert to original data when search is cleared
  }
});

// Add event listener for the "Filter by Cost" dropdown
document.getElementById('filterCost').addEventListener('change', async () => {
  const selectedFilter = document.getElementById('filterCost').value;
  const filteredData = await applyCostFilter(selectedFilter);
  updateOrderTable(filteredData);
});

// Add event listener for the "Filter by Items" dropdown
document.getElementById('filterItems').addEventListener('change', async () => {
  const selectedFilter = document.getElementById('filterItems').value;
  const filteredData = await applyItemsFilter(selectedFilter);
  updateOrderTable(filteredData);
});


// Function to apply cost filter
async function applyCostFilter(filterValue, data) {
  if (filterValue === 'over50') {
    return data.filter(order => order.cost > 50);
  } else if (filterValue === 'under50') {
    return data.filter(order => order.cost <= 50);
  } else {
    return data;
  }
}

// Function to apply items filter
async function applyItemsFilter(filterValue, data) {
  if (filterValue === 'singleItem') {
    return data.filter(order => order.productList.length === 1);
  } else if (filterValue === 'multipleItems') {
    return data.filter(order => order.productList.length > 1);
  } else {
    return data;
  }
}

// Function to update the order table based on filters
async function updateFilteredTable() {
  const selectedCostFilter = document.getElementById('filterCost').value;
  const selectedItemsFilter = document.getElementById('filterItems').value;

  const currentUserEmail = await fetchUserEmail();
  const orderData = await fetchOrderData(currentUserEmail);

  const filteredByCost = await applyCostFilter(selectedCostFilter, orderData);
  const filteredData = await applyItemsFilter(selectedItemsFilter, filteredByCost);

  updateOrderTable(filteredData);
}

// Add event listeners
document.getElementById('searchOrderButton').addEventListener('click', async () => {
  const searchQuery = document.getElementById('searchOrder').value;
  if (searchQuery) {
    const searchData = await findOrderById(searchQuery);
    updateOrderTable(searchData);
  } else {
    updateFilteredTable(); // Update based on filters when search is cleared
  }
});

// Add event listener for the "Filter by Cost" dropdown
document.getElementById('filterCost').addEventListener('change', updateFilteredTable);

// Add event listener for the "Filter by Items" dropdown
document.getElementById('filterItems').addEventListener('change', updateFilteredTable);


// Display all user orders on page load
displayAllUserOrders();