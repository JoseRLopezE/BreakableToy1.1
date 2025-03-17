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
│   │       │       └── breakabletoy
│   │       │           ├── Application.java
│   │       │           ├── controller
│   │       │           │   └── ProductController.java
│   │       │           ├── model
│   │       │           │   └── Product.java
│   │       │           ├── repository
│   │       │           │   └── ProductRepository.java
│   │       │           └── service
│   │       │               └── ProductService.java
│   │       │
│   │       └── resources
│   │           ├── application.properties
│   │           └── static
│   │               ├── assets
│   │               └── index.html
│   ├── pom.xml
│   └── README.md
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── ProductModal.tsx
│   │   │   └── Metrics.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── types.ts
│   │   └── styles.css
│   ├── public
│   │   └── index.html
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
```

## Backend Setup
1. Navigate to the `backend` directory.
2. Ensure you have Java and Maven installed.
3. Run the following command to start the Spring Boot application:
   ```sh
   mvn spring-boot:run
   ```
4. The backend will be available at `http://localhost:9090`.

## Frontend Setup
1. Navigate to the `frontend` directory.
2. Ensure you have Node.js and npm installed.
3. Install the dependencies by running:
   ```sh
   npm install
   ```
4. Start the React application with:
   ```sh
   npm start
   ```
5. The frontend will be available at `http://localhost:8080`.

## Contributing
Feel free to contribute to the project by submitting issues or pull requests. Please ensure to follow the coding standards and guidelines.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.