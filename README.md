# fullstack-project

# StayMate

## Description

**StayMate** is a full-stack homestay booking platform developed using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, list their own properties, book available homestays, and chat with hosts or renters. It showcases the complete development and integration of both frontend and backend systems.

This project is structured into two main directories:

- **client**: React-based frontend.
- **server**: Node.js and Express-based backend.

## Table of Contents

- [fullstack-project](#fullstack-project)
- [StayMate](#staymate)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Server `.env`](#server-env)
    - [Client `.env`](#client-env)
  - [Usage](#usage)
    - [Start the Backend:](#start-the-backend)
    - [Start the Frontend:](#start-the-frontend)
  - [Implemented Features](#implemented-features)
  - [Planned Features](#planned-features)
  - [Known Bugs](#known-bugs)
  - [Credits](#credits)

## Installation

To set up StayMate locally:

1. Install **Node.js** and **npm**.
2. Clone this repository.
3. In both `client` and `server` folders, run `npm install`.
4. Create `.env` files in both folders with the following settings:

### Server `.env`

```
MONGO_URL=<your_mongodb_connection_string>
PORT=3001
JWT_SECRET=<your_jwt_secret>
```

### Client `.env`

```
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_CLOUDINARY_UPLOAD_PRESET=<your_upload_preset>
REACT_APP_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/<your_cloud_name>/image/upload
```

## Usage

### Start the Backend:

```bash
cd server
npm start
```

### Start the Frontend:

```bash
cd client
npm start
```

The frontend runs on `http://localhost:3000` and communicates with the backend at `http://localhost:3001`.

## Implemented Features

- User registration and login with JWT authentication
- Role management: users can list homestays and also book others’ listings
- Create, edit, and delete homestay listings with image uploads via Cloudinary
- Calendar-based availability selection
- Booking system with date conflict checks
- Messaging system between hosts and renters tied to bookings
- Inbox page showing all conversations
- Responsive, dark-mode enabled user interface using Tailwind CSS

## Planned Features

- Profile page with editable avatar and info
- Booking history analytics and ratings
- Admin panel for managing users and listings
- Real-time messaging with WebSocket
- Payment integration (Stripe/PayPal)

## Known Bugs

- No avatar image upload in registration (only default or none)
- No notifications for new messages without refreshing

## Credits

- Inspired by common vacation rental platforms like Airbnb
- Styled using Tailwind CSS and `react-hot-toast`
- Backend tested with Postman; frontend tested in Chrome and Firefox

---

For any questions or contributions, feel free to open an issue or contact the maintainer.

---
