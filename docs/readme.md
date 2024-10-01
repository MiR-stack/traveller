# Traveller - Next.js & Strapi Website Documentation

## **Table of Contents**

1. [Introduction](#1-introduction)
2. [Folder Structure](#2-folder-structure)
3. [Prerequisites](#3-prerequisites)
4. [Installation Guide](#4-installation-guide)
   1. [Downloading the Source Code](#1-downloading-the-source-code)
   2. [Setting up the Strapi Backend](#2-setting-up-the-strapi-backend)
   3. [Setting up the Next.js Frontend](#3-setting-up-the-nextjs-frontend)
5. [Running the Application](#running-the-application)
6. [Deployment](#deployment)
   1. [Deploying the Frontend (Next.js) with GitHub](#1-deploying-the-frontend-nextjs-with-github)
   2. [Deploying the Backend (Strapi) with GitHub](#2-deploying-the-backend-strapi-with-github)

## 1. Introduction

Welcome to Traveller, a modern, responsive website template built with Next.js for the frontend and Strapi CMS for the backend. This documentation will guide you through setting up, running, customizing, and deploying your website.

- **Frontend**: Powered by Next.js, providing lightning-fast performance and SEO optimization.

- **Backend**: Managed through Strapi, offering a flexible headless CMS to manage your content.

## 2. Folder Structure

The project is structured as follows:

```sh

/traveller
├── /frontend # Next.js project folder (frontend code)
├── /backend # Strapi project folder (backend code)
├── /docs # Documentation files

```

- **frontend/:** Contains the Next.js code for rendering the website's UI.
- **backend/:** Contains the Strapi CMS code for managing content.
- **docs/:** Any related documentation, including this guide.

## 3. Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js** (v14.x or higher)
- **Yarn** or **npm**
- **Git** (for deployment purposes)
- **A Database** (postgreSQL)

## 4. Installation Guide

### 1. Downloading the Source Code

1. **Unzip the source code:** Extract the provided .zip file to a folder on your machine.

2. **Navigate to the project folder:**

   ```bash
   cd traveller
   ```

### 2. Setting up the Strapi Backend

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Install the backend dependencies:**

    ```bash
    yarn install

    # or

    npm install
    ```

3.  **Configure the environment:**

    - Copy the `.env.example` file to `.env`:

      ```bash
      cp .env.example .env
      ```

    - Open the `.env` file and set up your database connection and other environment variables. Example for postgress:

      ```
      DATABASE_CLIENT=postgres
      DATABASE_HOST=localhost
      DATABASE_PORT=5432
      DATABASE_NAME=traveller
      DATABASE_USERNAME=postgres
      DATABASE_PASSWORD=AGGDEQAGv
      DATABASE_SSL=false
      ```

4.  **Run Strapi in development mode:**

    ```
    yarn dev

    # or

    npm run dev
    ```

    You can now access the Strapi admin panel at [http://localhost:1337/admin](http://localhost:1337/admin).

5.  **Register on admin panel**
6.  **Add settings and data:**

    - open another terminal on backend file location. then run this command

      ```bash

      yarn strapi import -f /your-file-path/strapi-export.tar.gz
      ```

      wait for complete data transfer. it will add all default settings and data.

### 3. Setting up the Next.js Frontend

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install the frontend dependencies:**

   ```bash
   yarn install

   # or

   npm install
   ```

3. **Configure environment variables:**

   - Copy the .env.example file to .env:

   ```bash
   cp .env.example .env
   ```

- Open the `.env` file and set up all environment variables:

  1. `API_TOKEN:` Navigate to the backend admin panel > settings > API Token > Create API Token. Set the token duration to unlimited and the token type to read-only.

  2. `NEXT_PUBLIC_API_TOKEN:` Create another API token with a custom token type. Grant the following permissions: `blog(find)`, `category(find)`, `contact(create)`, `destination(find)`, `subscriber(create)`, `comments(findAllFlat, findAllHierarchy, post, put, removeComment)`.

  ```
  NEXT_PUBLIC_API_URL=http://localhost:1337
  ```

4. **Run Next.js in development mode:**

   ```bash
   yarn dev

   # or

   npm run dev
   ```

   Your frontend will be available at [http://localhost:3000](http://localhost:3000).

## 6. Running the Application

To run the application locally, follow these steps:

### 1. Start the Strapi Backend:

```
   cd backend
   yarn develop
```

This will start the backend server at[http://localhost:1337](http://localhost:1337).

### 2. Start the Next.js Frontend:

```
   cd frontend
   yarn dev
```

This will start the frontend server at [http://localhost:3000](http://localhost:1337).

## 7. Deployment

### 1. Deploying the Backend (Strapi) with GitHub

Since you are working with source code instead of a Git repository, you'll need to push the frontend code to a new repository.

**Step 1: Create a GitHub Repository for the Strapi Backend**

1. Sign in to **GitHub** or create an account.
1. create a new repository (e.g., my-strapi-backend).
1. Push the backend code:

```bash
cd backend
git init
git branch -M main
git remote add origin https://github.com/your-username/my-strapi-backend.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

**Step 2: Deploy on Heroku**

1. Sign in to [Heroku](https://heruku.com) and create a new app.
2. Link the GitHub repository you just created.
3. Set the environment variables in Heroku (e.g., DATABASE_URL for PostgreSQL).
4. Deploy the Strapi backend. After deployment, access the Strapi admin panel at the Heroku-provided URL.

**Step 3: Deploy on Railway (Alternative)**

1. Sign in to [Railway](https://railway.com) and create a new project.
2. Link the GitHub repository and deploy the Strapi backend.
3. Configure the environment variables in Railway (e.g., database credentials, API keys).

## 2. Deploying the Frontend (Next.js) with GitHub

**Step 1: Create a GitHub Repository**

2.Sign in to GitHub and Create a new repository for your frontend (e.g., my-nextjs-frontend). 3. Push the frontend code to the new repository:

```bash
cd frontend
git init
git branch -M main
git remote add origin https://github.com/your-username/my-nextjs-frontend.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

**Step 2: Deploy on Vercel**

1. Go to [Vercel](https://vercel.com) and connect your GitHub account.
2. Create a new project by selecting the GitHub repository you just created.

3. Set the **NEXT_PUBLIC_API_UR**L environment variable in the Vercel dashboard to point to your deployed Strapi backend.
4. Deploy your project and access it via the Vercel-provided URL.
