# Ukuqala Patient Records API

A RESTful API for managing patient records built with Node.js, Express and PostgreSQL.

---

## How to Set Up and Run Locally

### Step 1 - Install Requirements
Make sure you have these installed on your computer:
- Node.js (https://nodejs.org)
- PostgreSQL (https://www.postgresql.org/download)
- Git (https://git-scm.com)

### Step 2 - Clone the Repository
git clone https://github.com/yourusername/ukuqala-patient-api.git
cd ukuqala-patient-api

### Step 3 - Install Dependencies
npm install

### Step 4 - Set Up PostgreSQL
1. Open pgAdmin or psql
2. Create a new database called ukuqala_db
3. Make sure your PostgreSQL is running on port 5432

### Step 5 - Create Your .env File
Create a file called .env in the root folder and add:
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ukuqala_db
DB_USER=postgres
DB_PASS=yourpassword
JWT_SECRET=ukuqala_secret_key

### Step 6 - Run the Server
node server.js

You should see:
Database connected and tables created
Server is running on port 3000

---

## Folder Structure

ukuqala-patient-api/
├── diagrams/
│   ├── system architecture.drawio.png
│   ├── class diagram.drawio.png
│   └── database-3.drawio.png
├── src/
│   ├── config/
│   │   └── database.js        # PostgreSQL connection using Sequelize
│   ├── controllers/
│   │   ├── authController.js  # register and login logic
│   │   └── patientController.js # CRUD logic for patients
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT token verification
│   ├── models/
│   │   ├── User.js            # User table definition
│   │   └── Patient.js         # Patient table definition
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── patientRoutes.js   # Patient endpoints
│   └── app.js                 # Express app setup
├── .env                       # Secret variables (not uploaded to GitHub)
├── .env.example               # Example env file (safe to upload)
├── .gitignore
├── package.json
├── server.js                  # Entry point
└── README.md

---

## .env.example

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ukuqala_db
DB_USER=postgres
DB_PASS=yourpassword
JWT_SECRET=your_jwt_secret_key

---

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login and receive JWT token

### Patients (all require JWT token in Authorization header)
- POST /api/patients - Create a new patient
- GET /api/patients - Get all patients
- GET /api/patients/:id - Get a single patient by ID
- PUT /api/patients/:id - Update a patient
- DELETE /api/patients/:id - Delete a patient

---

## Assumptions Made

- Every user must register before they can access patient routes
- The JWT token expires after 1 day
- All patient routes are protected and require a valid token
- PostgreSQL is running locally on the default port 5432
- Sequelize automatically creates the tables on first run