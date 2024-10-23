![LOGO](views/assets/img/logo3.jpg)

# E-photo: Web Application for Purchasing and Managing Photos

"E-photo" is a web application designed to facilitate the purchasing and management of photos. The application employs the MVC (Model-View-Controller) architecture and is supported by a MongoDB database. Users can buy photos from the store, view their profiles, contact the website administrators, and access site information. Authentication requires users to log in using their registered email and password.

This project is intended as a learning experience and practical application of web development concepts. It involves building an e-commerce platform for purchasing photos and incorporates modern design and development practices.

## Project Description

### **Model:**
The project supports two user types: client users and administrator users. This distinction leads to the inclusion of additional pages and functionalities for administrator users. The model represents the underlying data structure and business logic. In this case, it encompasses user data, photo details, and purchase records.

### **View:**
The view is responsible for translating the data from the model into a user-friendly interface. It primarily consists of HTML pages. The source code of these pages dynamically populates content, allowing users to interact with the application. This interaction includes actions like browsing photos, making purchases, and viewing profiles.

### **Controller:**
The controller manages user input and responds to various events that occur in the view. It serves as an intermediary between the view and the model. When users interact with the interface, the controller processes their actions and may trigger changes in the model's data. It operates using predefined services and functions that facilitate these interactions.

### **Installation:**
The project is a web application developed using JavaScript, HTML, and CSS. To access the application, users need to run the server.

## Project Features

### **Admin User Features:**
- **Admin Panel Access:** Admin users can access a dedicated admin panel where they can:
  - **Customer Information:** View and manage customer profiles and their order histories.
  - **Order Management:** Track and manage all orders, including viewing details and processing them.
  - **Product Management:** Add, edit, or remove products (photos) available in the store.
  - **Store Insights:** View graphs and reports displaying information about store purchases, top-selling products, and other key metrics.
  - **Facebook API Integration:** Automatically post new products to the store's Facebook page when a new photo is published through the admin form.

### **Regular User (Buyer) Features:**
- **Shopping Cart:** Logged-in users can add and manage photos in their shopping cart before purchasing.
- **User Profile Page:** 
  - **Shopping History:** Logged-in users can view their previous orders and purchases.
  - **Personal Information:** Logged-in users can manage personal account details, such as email, password, and contact info.
- **Weather Web Service:** Provides real-time weather updates for a location specified by the user.
- **Google Maps Integration:** Displays the store locations on an interactive map, helping users find physical stores.
- **Gmail API:** Sends emails through a contact form, ensuring secure communication between users and website administrators.
- **Automated Real-time Chat (Socket.io/WebSockets):** Provides predefined automated responses to common user inquiries without admin intervention.

## Technologies Used:
The project employs various technologies, including but not limited to:

- JavaScript
- HTML
- CSS
- MongoDB database for data storage
- MVC architecture for organizing code and logic
- jQuery for enhanced JavaScript functionality
- Bootstrap for responsive and visually appealing design
- Weather Web Service for fetching real-time weather data
- Google Maps API for store location mapping
- Gmail API for contact form integration
- Facebook API for posting new products to the store's Facebook page
- Socket.io/WebSockets for real-time automated chat functionality

## Screenshots

We have provided a set of images showcasing the website's interface and functionalities. You can find them in the `screenshots` folder within the project repository. 

Below are a few examples:
- **Products Page**
- **Log In Page**
- **Contact Page**
- **Admin Consol**
- **User View**

## Authors

For any questions or suggestions, feel free to contact:

- **Danielle Rotem** - [GitHub](https://github.com/RoDanielle)

**NOTE**: This repository was cloned from our original project, with several updates and new features added.

The project was collaboratively developed by multiple team members. The initial version can be found [here](https://github.com/ShirazSorijoun/Web_application-E.PHOTO), showcasing early contributions. The beta version, with the added features, is available at [this link](https://github.com/Danielhay016/E-photo).
