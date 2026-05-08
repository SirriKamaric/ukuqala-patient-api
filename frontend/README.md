# Ukuqala Clinical Portal - Frontend

## 🚀 Setup Instructions
1. Clone the repository.
2. Navigate to the `frontend` directory.
3. Run `npm install` to install dependencies.
4. Create a `.env` file based on `.env.example` and set your `VITE_API_URL`.
5. Run `npm run dev` to start the development server.

## 📂 Folder Structure
- `src/api`: Centralized data fetching logic (Separation of Concerns).
- `src/components`: Reusable UI elements (Buttons, Modals, Cards).
- `src/context`: Auth state management (JWT handling).
- `src/pages`: Full-page views for Dashboard and Patient Management.
- `src/styles`: Global CSS and Design System.

## 📄 Page Directory
- **LoginPage**: Secure authentication entry.
- **DashboardPage**: High-level overview of clinical logs and system status.
- **PatientsPage**: Complete directory for managing patient records.
- **PatientDetailPage**: In-depth view of specific patient history and vitals.

## 🛠 External Packages
- `axios`: For robust API communication.
- `react-router-dom`: For client-side navigation.
- `lucide-react`: (If used) for consistent iconography.

## ⚠️ Known Limitations
- Vitals history currently displays the most recent 10 entries.
- Search functionality is restricted to patient names.