# Error handling and middleware in Express.js

## 1. Project overview

### **Project name:**

Error handling in Express.js.

### **Description:**

This project aims at providing the user with a solid overview of the most common ways to handle error handling and middleware in Node using Express.js.

## 2. Installation and setup

### **Requirements:**

A general knowledge of JavaScript and basic error handling in Node. The dependencies for this project are Express v^4.18.3 and Joi v^17.12.2.

### **Installation:**

To run this project, download the source code folder from this repository, and run npm i in the terminal. After this run either node app.js or nodemon app.js.

## 3. Project features

### **List of features:**

I have made a global try/catch middleware and a global error handler. Apart from this I have also made a custom error class that extends the Error class.

### **Usage examples:**

To trigger errors and middleware, please see instructions for each below:

- app.get('/products'...) - Toggle between commenting out the products array and the undefined products list to trigger the error.
- app.post('/login'...) - Toggle between commenting out the valid username and the empty string to trigger the error.
- app.post('/member-access'...) - Toggle between commenting out the user.auth property from true vs false to trigger the error.
- app.put('/account-settings'...) - See /login, all PUT requests require account credentials entered.

## 4. Project structure

### **Directory structure:**

The directory is built up on the root project folder with subfolders and files as per below:

- .constants/: containing a status-code.js file with status codes fed to the error handler.
- .global logic/: containing the error-handler.js and try-catch.js global middleware.
- .middleware/: containing products-middleware.js and put-routes.js to serve the /products path and all PUT requests respectively.
  In the main root we have:
- .gitignore
- app.js - the main module for the project.
- package.json
- package-lock.json
- README.md

### **Key files:**

The app.js module is where all of the other modules have been imported to, which is what the node/nodemon session will run off.

## 5. Technologies used

### **Languages:**

This project is built on JavaScript in Node.js.

### **Frameworks/libraries:**

Express.js.
