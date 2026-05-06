Ukuqala Patient Management - Frontend
This is the React-based frontend for the Ukuqala platform, an AI-powered health support system designed for medical practitioners in Cameroon.

🚀 Progress Summary
As of May 6, 2026, the following core modules are fully implemented and integrated with the Version 4 Backend API:

1. Authentication (Requirement 4.1)
Secure Login/Register: Forms are connected to /api/v4/auth endpoints.

Token Persistence: JWT tokens are securely stored in localStorage upon successful login.

Route Protection: An AuthMiddleware pattern ensures that only logged-in users can access the Dashboard and Patient data.

2. Patient Management (Requirement 4.3)
Patient List: Fetches and displays all patients associated with the practitioner.

Profile Views: Detailed view for individual patients (e.g., "Kate's Profile").

CRUD Operations: Functional logic for adding, editing, and deleting patient records.

3. Vitals Tracking (Requirement 4.4)
Nested Integration: Successfully implemented nested routing at /patients/:id/vitals.

History Display: Vitals history is fetched and displayed in reverse chronological order.

Real-time Recording: Practitioners can record Heart Rate, Blood Pressure, and Temperature.

4. API Communication (Requirement 5)
Centralized Client: apiClient.js is configured using Axios with environment variable support (VITE_API_URL).

Interceptors:

Request: Automatically attaches Bearer tokens to all outgoing calls.

Response: Automatically handles 401 Unauthorized errors by clearing the session and redirecting to login.

🛠 Tech Stack
Framework: React (Vite-powered)

State Management: React Hooks (useState, useEffect)

Routing: React Router DOM

API Client: Axios with Interceptors

Styling: Modern CSS with Flexbox (Responsive Design)

📦 Installation & Setup
Install Dependencies:

Bash
npm install
Environment Configuration:
Create a .env file in the root directory:

Code snippet
VITE_API_URL=http://localhost:3000
Run Development Server:

Bash
npm run dev
