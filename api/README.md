# Traveller - Strapi Backend

This is the backend of the **Traveller** website, powered by **Strapi**. Strapi is a headless CMS used to manage content and serve the data to the frontend via a REST or GraphQL API.

## **Table of Contents**

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Development Server](#running-the-development-server)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Deployment](#deployment)
8. [Folder Structure](#folder-structure)
9. [Customization](#customization)
10. [Support](#support)

---

## **Introduction**

This is the **Strapi** backend for the **Traveller** website. It provides a headless CMS to manage content and deliver data to the **Next.js** frontend.

---

## **Prerequisites**

- **Node.js** (v14.x or higher)
- **Yarn** or **npm**
- A database (PostgreSQL)

---

## **Installation**

To get started, navigate to the backend directory and install the dependencies:

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
yarn install
# or
npm install
```

# Environment Variables

Strapi requires several environment variables for database connection and server configuration.

1. Copy the example `.env.example` file to `.env`:

```bash
cp .env.example .env
```

2. Open the .env file and configure your database and other environment variables.
   Example for postgress:

```bash
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=traveller
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=AGGDEQAGv
DATABASE_SSL=false
```

# Database Setup

Strapi supports several databases. By default, we are using PostgreSQL, ensure to update the `DATABASE_CLIENT to` 'postgres' and provide the necessary connection details in the `.env` file..

# Running the Development Server

To start Strapi in development mode, use the following command:

```bash
yarn dev
# or
npm run dev
```

The Strapi admin panel will be accessible at[ http://localhost:1337/admin](http://localhost:1337/admin).

# Deployment

You can deploy the Strapi backend to platforms like Heroku, Railway, or any server that supports Node.js.

## Steps for Heroku Deployment:

1.  **Create a new Heroku app.** 2.**Link your GitHub repository.**
2.  **Set up environment variables** in the Heroku dashboard (such as DATABASE_NAME for PostgreSQL).
3.  **Deploy the app** and access the admin panel via the Heroku-provided URL.

# Folder Structure

```bash
backend/
├── api # API endpoints and content types
├── config # Server and database configuration
├── extensions # Custom Strapi extensions
├── public # Public assets
├── .env.example # Example environment variables file
├── package.json # Project dependencies and scripts
└── README.md # Documentation
```

# Customization

You can extend or customize the Strapi backend by:

- **Adding new content types:** Use the Strapi Admin Panel's **Content-Type Builder**.
- **Modifying API endpoints:** Edit or add new API routes in the `api/` folder.
- **Customizing the admin panel:** Modify the **extensions** folder for admin panel customizations.

# Support

If you encounter any issues or need help, please contact us at habibmir811@gmail.com.
