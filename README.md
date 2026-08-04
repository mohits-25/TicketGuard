# 🎟️ TicketGuard

A full-stack Event Ticket Booking System built using **Spring Boot** and **React**. TicketGuard enables users to browse events, book tickets, make secure payments, and download QR-enabled PDF tickets, while providing administrators with a comprehensive management portal.

---

## 📌 Features

### 👤 Customer

- User Registration & Login
- JWT Authentication
- Browse Events
- Event Details
- Book Tickets
- Secure Payment
- View Booking History
- View Payment History
- View My Tickets
- Download PDF Ticket
- QR Code Ticket Verification
- User Dashboard
- Profile Management

---

### 🛠 Admin

- Dashboard
- Event Management (CRUD)
- Venue Management (CRUD)
- User Management (CRUD)
- Booking Management
- Payment Management
- Ticket Management
- Role-Based Authorization

---

## 🏗 Architecture

```
                React + Material UI
                       │
                 Axios REST API
                       │
                Spring Boot Backend
                       │
      Spring Security + JWT Authentication
                       │
            Hibernate / Spring Data JPA
                       │
                     MySQL
```

---

# 🛠 Tech Stack

## Frontend

- React 19
- React Router DOM
- Material UI (MUI)
- Axios
- React Hot Toast

## Backend

- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

## Database

- MySQL

## Additional Libraries

- OpenAPI / Swagger
- Java Mail Sender
- ZXing (QR Code)
- OpenPDF (PDF Generation)

---

# 📂 Project Structure

```
TicketGuard
│
├── ticketguard-backend
│   ├── Authentication
│   ├── Users
│   ├── Events
│   ├── Venues
│   ├── Bookings
│   ├── Payments
│   ├── Tickets
│   ├── Security
│   └── Swagger
│
└── ticketguard-frontend
    ├── API
    ├── Components
    ├── Context
    ├── Pages
    ├── Routes
    ├── Theme
    └── Layouts
```

---

# 🚀 Backend Setup

Clone the repository

```bash
git clone https://github.com/mohits-25/TicketGuard.git
```

Navigate to backend

```bash
cd ticketguard-backend
```

Create

```
src/main/resources/application.yml
```

using

```
application.yml.example
```

Update the following:

- MySQL credentials
- JWT Secret
- Gmail Email
- Gmail App Password

Run

```bash
mvn spring-boot:run
```

Backend

```
http://localhost:8080
```

Swagger

```
http://localhost:8080/swagger-ui/index.html
```

---

# 💻 Frontend Setup

Navigate

```bash
cd ticketguard-frontend
```

Install dependencies

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend

```
http://localhost:5173
```

---

# 🔐 Authentication

- JWT Authentication
- BCrypt Password Encryption
- Role-Based Authorization
- Protected Routes
- Admin Routes
- Secure REST APIs

---

# 📄 Ticket Generation

After a successful booking:

- Ticket is generated automatically
- Unique Ticket Number
- QR Code Generation
- PDF Ticket Generation
- Ticket Email Delivery

---

# 📖 REST API Modules

- Authentication API
- User API
- Event API
- Venue API
- Booking API
- Payment API
- Ticket API
- Admin API

---

# 📸 Screenshots

Add screenshots of:

- Home Page
- Login Page
- Events
- Booking
- Payment
- Customer Dashboard
- Admin Dashboard
- Event Management
- Venue Management
- Ticket PDF

---

# 📈 Future Enhancements

- Dashboard Analytics
- Charts & Reports
- Event Search Filters
- Event Categories
- Notifications
- Audit Logs
- Revenue Analytics
- Export Reports
- Real-Time Updates
- Dark Mode

---

# 👨‍💻 Author

**Mohit S**

Bachelor of Engineering (Information Science)

The National Institute of Engineering, Mysore

GitHub

https://github.com/mohits-25

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is developed for educational and portfolio purposes.