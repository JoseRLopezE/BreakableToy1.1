# Breakable Toy Project

## Overview
The Breakable Toy project is a full-stack application consisting of a Spring Boot backend and a React frontend. This document provides an overview of the project structure, setup instructions, and how to run both the backend and frontend applications.

## Project Structure
```
BreakableToy
├── backend
│   ├── src
│   │   └── main
│   │       ├── java
│   │       │   └── com
│   │       │       └── inventorysystem
│   │       │           └── application
│   │       │               └── Application.java
│   │       └── resources
│   │           ├── application.properties
│   │           └── static
│   │               └── index.html
│   ├── pom.xml
│   └── README.md
├── frontend
│   ├── src
│   │   ├── components
│   │   │   └── CreateProductForm.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles.css
│   ├── public
│   │   └── index.html
│   ├── package.json
│   └── README.md
└── .gitignore
```

## Backend Setup
1. Navigate to the `BackEnd` directory.
2. Ensure you have Java and Maven installed.
3. Run the following command to start the Spring Boot application:
   ```
   mvn spring-boot:run
   ```
4. The backend will be available at `http://localhost:8080`.

## Frontend Setup
1. Navigate to the `FrontEnd` directory.
2. Ensure you have Node.js and npm installed.
3. Install the dependencies by running:
   ```
   npm install
   ```
4. Start the React application with:
   ```
   npm start
   ```
5. The frontend will be available at `http://localhost:3000`.

## Contributing
Feel free to contribute to the project by submitting issues or pull requests. Please ensure to follow the coding standards and guidelines.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.