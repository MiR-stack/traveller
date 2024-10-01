# Traveller - Next.js Frontend

This is the frontend of the **Traveller** website, built using **Next.js**. It connects to the backend API provided by **Strapi** for dynamic content management.

## **Table of Contents**

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Running the Development Server](#running-the-development-server)
5. [Environment Variables](#environment-variables)
6. [Build and Deployment](#build-and-deployment)
7. [Folder Structure](#folder-structure)
8. [Customization](#customization)
9. [Support](#support)

---

## **Introduction**

## This is the **Next.js** frontend for the **Traveller** website. The frontend is connected to the Strapi backend for content management.

## **Prerequisites**

- **Node.js** (v14.x or higher)
- **Yarn** or **npm**

---

## **Installation**

To get started, clone the project or download the source code and install the dependencies:

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
yarn install
# or
npm install
```

# Running the Development Server

Once the dependencies are installed, start the development server:

```bash
yarn dev
# or
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

# Environment Variables

The frontend requires a connection to the Strapi backend API. You need to set the NEXT_PUBLIC_API_URL in your .env file.

1. Copy the example .env.example file to .env:

```bash
cp .env.example .env
```

2. Update the .env file:

```
BASE_URL= http://127.0.0.1:1337
NEXT_PUBLIC_STRAPI_URL =http://127.0.0.1:1337
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000

API_TOKEN=In the Strapi admin panel, navigate to the 'Settings' section and create a new API token. Set the token duration to unlimited and the token type to read-only.

NEXT_PUBLIC_API_TOKEN=Create another API token with a custom type. Then, assign permissions for: blog(find), category(find), contact(create), destination(find), subscriber(create), comments(findAllFlat, findAllHierarchy, post, put, removeComment)

REVALIDATION_SECRET=give any secret
```

Make sure the API URL points to the running Strapi instance.

# Build and Deployment

To create a production build of the website, run:

```bash
yarn build

# or

npm run build
```

This will generate optimized static assets in the `.next/` directory. You can deploy these assets to platforms like Vercel, Netlify, or any other static hosting provider.

# Folder Structure

```bash
frontend/
├── public # Static assets (images, fonts, etc.)
├── src # Next.js source codes
    ├── app # All pages
    ├── components # Reusable UI components (Header, Footer, etc.)
    ├── styles # Global and component-level styles
├── .env.example # Example environment variables file
├── package.json # Project dependencies and scripts
└── README.md # Documentation
```

# Customization

To customize the design and layout of the frontend, you can modify the following:

- **navbar and Footer:** Located in `components/global/navbar.ts` and `components/global/footer.ts`.
- **Global Styles:** Modify the global styles in `styles/base/_global.scss`.
- **Pages:** Add or modify pages in the `app/` directory.

# Support

If you encounter any issues or need help, please contact us at habibmir811@gmail.com.
