const orders = [
    {
        idUserOrdered: "admin@gmail.com", //  user email
        date: "2023-08-26T23:52:25.777+00:00",
        cost: 19.99,
        productList: [
            {
                productId: "64e866ac95a067c9bcbef94e", // Product ID
                productName: "Majestic Mountain Landscape", // Product name
                productPrice: 19.99, // Product price
                quantity: 1 // Quantity purchased
            },
                 
        ]
    },
    {
        idUserOrdered: "daniel@gmail.com", //  user email
        date: "2023-08-26T23:52:25.777+00:00",
        cost: 41.98,
        productList: [
            {
                productId: "64e866ac95a067c9bcbef94e", // Product ID
                productName: "Majestic Mountain Landscape", // Product name
                productPrice: 19.99, // Product price
                quantity: 1 // Quantity purchased
            },
            {
                productId: "64e866ac95a067c9bcbef951", // Product ID
                productName: "Enchanting Forest Path", // Product name
                productPrice: 21.99, // Product price
                quantity: 1 // Quantity purchased
            },
                 
        ]
    },  
    {
        idUserOrdered: "danalevi@gmail.com", //  user email
        date: "2023-08-27T09:37:46.761+00:00",
        cost: 17.99,
        productList: [
            {
                productId: "64e866ac95a067c9bcbef954", // Product ID
                productName: "Basketball in Action", // Product name
                productPrice: 17.99, // Product price
                quantity: 1 // Quantity purchased
            },    
        ]
    },
    {
        idUserOrdered: "admin@gmail.com", //  user email
        date: "2023-08-27T09:37:46.761+00:00",
        cost: 59.97,
        productList: [
            {
                productId: "64e866ac95a067c9bcbef954", // Product ID
                productName: "Basketball in Action", // Product name
                productPrice: 17.99, // Product price
                quantity: 1 // Quantity purchased
            },    
            {
                productId: "64e866ac95a067c9bcbef94e", // Product ID
                productName: "Majestic Mountain Landscape", // Product name
                productPrice: 19.99, // Product price
                quantity: 1 // Quantity purchased
            },
            {
                productId: "64e866ac95a067c9bcbef951", // Product ID
                productName: "Enchanting Forest Path", // Product name
                productPrice: 21.99, // Product price
                quantity: 1 // Quantity purchased
            },
        ]
    },
];
module.exports = orders;
