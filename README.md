
# 🔗 LinkLite - Your Smart URL Shortener
LinkLite is a full-stack URL shortening platform designed to simplify long links, track detailed analytics, and ensure secure user access. Built with **Node.js**, **Express**, **MongoDB**, **React**, and **Redux**, it combines performance with modern UI and real-time tracking of user interactions.

---

## 📌 Table of Contents

- [🚀 Features](#-features)
- [🎯 Project Objectives](#-project-objectives)
- [🛠️ Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🧪 Testing](#-testing)
- [🔒 Security](#-security)
- [📊 Analytics](#-analytics)
- [🔮 Future Enhancements](#-future-enhancements)
- [📚 References](#-references)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## 🚀 Features

- 🔗 **URL Shortening** – Instantly create compact, shareable URLs.
- 📈 **Analytics Tracking** – Capture IP address, time of access, and user identity per click.
- 🔐 **User Authentication** – Secure registration and login using JWT-based auth.
- 👤 **Private Profiles** – Users can only view and manage their own URLs.
- 📱 **Responsive Frontend** – Mobile-friendly, built with React and styled for modern UX.
- 🌍 **Redirection** – Short URLs redirect users to the original destination seamlessly.
- 💾 **Data Persistence** – MongoDB stores all mappings and logs for analytics.

---

## 🎯 Project Objectives

- Provide a complete, production-ready URL shortening solution.
- Enable user-specific link management and tracking.
- Offer detailed analytics for each shortened URL.
- Ensure that user data is isolated, secure, and accessible only by the owner.

---

## 🛠️ Tech Stack

### 🔧 Backend
- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MongoDB + Mongoose** – Database and ODM
- **JWT** – Authentication and authorization
- **IP Location APIs** – For capturing location-based analytics (optional)

### 💻 Frontend
- **React.js** – Component-based UI
- **Redux Toolkit** – Global state management
- **React Router** – Client-side routing
- **Axios** – API communication
- **CSS Modules / Styled Components** – Styling
- **Responsive Design** – Works on all devices

---

## 📂 Project Structure

```

LinkLite/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page-level views
│   │   ├── redux/       # Redux store and slices
│   │   ├── App.js
│   │   └── index.js
│   └── public/
├── server/              # Node.js backend
│   ├── controllers/     # Business logic
│   ├── routes/          # Express routes
│   ├── models/          # Mongoose schemas
│   ├── middleware/      # Auth, error handling
│   ├── utils/           # Helpers (e.g., generate short ID, get IP)
│   ├── config/          # DB connection
│   └── server.js        # Entry point
├── .env                 # Environment variables
├── package.json         # Root dependencies
└── README.md
```
---

## ⚙️ Installation & Setup

### 📦 Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)
- [Optional] IP geolocation API key

---

### 🔧 Backend Setup

```
cd server
npm install
```


Create a `.env` file in `/server`:

```
MONGODB_URI=mongodb://localhost:27017/linklite-v2
PORT=3000
localhost_URL=http://localhost:3000
frontend_URL=http://localhost:5173
uniqueKey=choose-your-key
```

Start backend:

```
npm run dev
```

---

### 💻 Frontend Setup

```
cd client
npm install
npm start

```

---

## 🧪 Testing

> *If implemented, add test coverage here.*

* **Unit Tests** – Validate functions and components
* **Integration Tests** – Validate full user flow and endpoints
* **API Testing** – Postman or Swagger

Run tests:

```
# In client/
npm test

# In server/
npm test
```

---

## 🔒 Security

* JWT authentication for secure sessions
* Role-based access control (only users can view their own data)
* Secure route middleware to protect private endpoints
* Data validation and sanitization
* XSS & NoSQL injection prevention

---

## 📊 Analytics

Every time a shortened link is clicked:

* Captures:

  * IP address
  * Timestamp
  * Device/browser info
  * Referrer (if available)
* Logs stored in MongoDB, accessible by the URL owner in the dashboard

---

## 🔮 Future Enhancements

* ✏️ Custom short URLs (custom aliases)
* 📱 QR code generation for shortened links
* 🌍 Geo-location-based reporting
* 📈 Admin analytics dashboard
* 🔔 Email/link expiration or alerts
* 📤 Export analytics to CSV/JSON

---

## 📚 References

* [Node.js Documentation](https://nodejs.org/)
* [Express.js Documentation](https://expressjs.com/)
* [React Docs](https://reactjs.org/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [MongoDB Docs](https://www.mongodb.com/docs/)
* [JWT Guide](https://jwt.io/introduction/)
* [OWASP Security Best Practices](https://owasp.org/www-project-top-ten/)

---

## 👤 Author

**Prince Raj**
[GitHub](https://github.com/rajprince031)
[LinkedIn](https://linkedin.com/in/rajprince031)

Pull requests and feedback are always welcome!

---
