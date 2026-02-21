# EvenTours Backend

This is the backend for the EvenTours travel application.

## Tech Stack
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database (Mongoose ODM)
- **JWT**: Authentication

## Setup
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file with the following variables:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV`
4. Run `npm start` or `npm run dev`

## API Endpoints
- `/api/users`: Authentication and User management
- `/api/tours`: Tour packages management
- `/api/bookings`: Booking management
- `/api/tickets`: Support ticket management
