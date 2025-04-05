# Hospital Management System - Backend

This is the Express.js backend for the Hospital Management System, which handles the API requests and database interactions.

## Setup

1. Make sure MongoDB is installed and running on your machine.
2. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/hospital-management
   NODE_ENV=development
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Patients
- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get a patient by ID
- POST `/api/patients` - Create a new patient
- PUT `/api/patients/:id` - Update a patient
- DELETE `/api/patients/:id` - Delete a patient

More endpoints will be added for doctors, appointments, etc. as the project expands.

## Technologies Used
- Express.js - Web framework
- MongoDB - Database
- Mongoose - MongoDB object modeling
- Cors - Cross-origin resource sharing
- Dotenv - Environment variables
- Nodemon - Development server 