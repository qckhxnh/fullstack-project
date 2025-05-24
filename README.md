# StayMate

## 🌍 Description

**StayMate** is a full-stack homestay booking platform built using the MERN stack (MongoDB, Express.js, React, Node.js). It enables users to:

- Create and manage listings
- Book stays with availability calendars
- Upload images from their own local device.
- Chat with hosts/renters tied to each booking
- Enjoy a clean, mobile-friendly interface with dark mode

> ✅ This project demonstrates full lifecycle development of a modern web app with secure authentication, cloud image uploads, and role-based access.

---

### 🔗 Live Demo

- 🖥️ Frontend: [Frontend Link!](https://staymate-client.onrender.com)
- ⚙️ Backend: [Server Link](https://staymate-server-b263.onrender.com)

### 🧪 Test Account

- **Email:** testuseraccount@gmail.com
- **Password:** Pleasehavealook2025

---

## 📚 User Instructions

1. Sign up (or log in using the test account).
2. As a host: create listings, upload image, set prices and availability.
3. As a renter: browse listings, select dates, and book.
4. Chat with the host from the bookings page.
5. Access "My Listings" or "My Bookings" from the navigation bar.

---

## 🗂️ Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Implemented Features](#implemented-features)
- [Planned Features](#planned-features)
- [Known Bugs](#known-bugs)
- [Work Hours Log](#work-hours-log)
- [Credits](#credits)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/qckhxnh/fullstack-project.git
cd fullstack-project
```

### 2. Install Dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 3. Environment Variables

#### server/.env

```
MONGO_URL=your_mongodb_url
PORT=3001
JWT_SECRET=your_secret_key
```

#### client/.env

```
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
REACT_APP_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/your_cloud_name/image/upload
```

---

## ▶️ Usage

Start the servers in two terminals:

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm start
```

- Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## ✅ Implemented Features

- 🔐 JWT-based authentication
- 🏡 Host listings: create, edit, delete with image uploads via Cloudinary
- 📅 Availability selection with datepicker
- 📖 Booking system with conflict prevention
- 💬 Chat system tied to bookings
- 📥 Inbox page for conversations
- 🌙 Tailwind CSS styling + Dark mode
- 📱 Responsive design for mobile/tablet
- Create CI/CD pipline

---

## 🧩 Planned Features

- Editable user profile and avatar
- Rating system for hosts/homestays
- Stripe payment integration
- Real-time messaging via Socket.io
- Admin dashboard

---

## 🐞 Known Bugs

- No avatar upload during signup
- No real-time chat updates (requires refresh)

---

## ⏱️ Work Hours Log

📄 Markdown version also available in [`WORKLOG.md`](./WORKLOG.md)

| Date       | Hours  | Task Description                                                               |
| ---------- | ------ | ------------------------------------------------------------------------------ |
| 2025-05-16 | 2      | Project initialization, Git setup, and early README draft                      |
|            | 5      | Backend setup: Express server, MongoDB, routes, and dotenv configuration       |
| 2025-05-17 | 6      | User authentication: registration, login, JWT handling, and profile logic      |
|            | 6      | Homestay model & CRUD operations; route protection and multer integration      |
| 2025-05-18 | 8      | Booking functionality: create/view endpoints, availability logic, validation   |
| 2025-05-19 | 8      | Messaging system backend, schema nesting, role checks, and controller setup    |
| 2025-05-20 | 7      | React frontend: Home, HomestayDetail, dynamic routing, Tailwind UI integration |
| 2025-05-21 | 10     | Booking frontend flow, RequireAuth, calendar picker, error handling            |
|            | 8      | Full chat UI implementation, auto-scroll, message send/display                 |
| 2025-05-22 | 8      | Conversation list page, conversation routing, and access control               |
|            | 6      | Final UI polish: dark mode, mobile responsiveness, toasts, UX improvements     |
| 2025-05-23 | 6      | CI/CD workflows, CORS config refactor, production build with `serve`           |
| 2025-05-24 | 5      | Error state handling, 403/500 debugging, Postman tests                         |
| 2025-05-24 | 3      | Enhanced README with live links, user guide, installation, and credits section |
| **Total**  | **88** |                                                                                |

## 📂 Repository Structure

```
fullstack-project/
├── client/        # React frontend
│   ├── src/
│   └── .env
├── server/        # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── .env
```

---

## ✅ Good Practices Followed

- Clear folder structure
- No commented-out or unused code
- `.env.example` included
- Separate `client` and `server` folders
- Clean and informative commit history
- Markdown-based time log
- Fully working demo app with sample credentials

---

## 🙌 Credits

- Inspired by Airbnb UI
- Hosted on Render

---

_For support or questions, please contact the project maintainer or open an issue._

---

Author's Note:
This project, StayMate, was entirely designed and developed by me as an individual effort. Although GitHub shows another contributor in the commit history, this was an unintentional result of a credential misconfiguration during Git operations.

I am the sole developer responsible for all planning, coding, UI/UX design, testing, and documentation.

The mistakenly attributed contributor (e.g., shubh2294) was never involved in the development of this project.
