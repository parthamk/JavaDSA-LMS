# Project Setup Guide

Follow these steps to set up the JavaDSA Learn project on your local machine.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 16.0.0 or higher. Download it from [Node.js Official Website](https://nodejs.org/).
- **npm**: Comes bundled with Node.js. Verify installation using:
  ```bash
  node -v
  npm -v
  ```
- **Git**: For cloning the repository. Download it from [Git Official Website](https://git-scm.com/).

---

## Backend Setup

1. **Navigate to the `backend` directory**:
   Ensure you are in the project root directory, then run:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   Install all required Node.js packages:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file by copying the example file:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and configure the following variables:
   - `PORT`: The port number for the backend server (default: `5000`).
   - `JWT_SECRET`: A secret key for JWT authentication.
   - `PISTON_API_URL`: The URL for the Piston API (used for code execution).

4. **Start the development server**:
   Run the following command to start the backend server:
   ```bash
   npm run dev
   ```
   The backend server should now be running at `http://localhost:5000`.

---

## Frontend Setup

1. **Navigate to the `frontend` directory**:
   From the project root directory, run:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   Install all required Node.js packages:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file by copying the example file:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and configure the following variables:
   - `VITE_API_URL`: The URL of the backend server (default: `http://localhost:5000`).

4. **Start the development server**:
   Run the following command to start the frontend application:
   ```bash
   npm run dev
   ```
   The frontend application should now be running at `http://localhost:5173`.

---

## Database Setup

This project uses JSON file storage for simplicity. Ensure the `data` directory exists in the `backend` folder. If not, create it manually:
```bash
mkdir backend/data
```

---

## Running Tests

To ensure everything is working correctly, you can run the test suite:

1. **Backend Tests**:
   Navigate to the `backend` directory and run:
   ```bash
   npm test
   ```

2. **Frontend Tests**:
   Navigate to the `frontend` directory and run:
   ```bash
   npm test
   ```

---

## Troubleshooting

- **Port Conflicts**:
  If the default ports (`5000` for backend, `5173` for frontend) are in use, update the `PORT` and `VITE_API_URL` variables in the respective `.env` files.

- **Dependency Issues**:
  If you encounter dependency errors, try deleting the `node_modules` folder and reinstalling:
  ```bash
  rm -rf node_modules
  npm install
  ```

- **Environment Variable Errors**:
  Ensure all required variables are correctly set in the `.env` files.

---

For further assistance, refer to the contact information provided in the README file.