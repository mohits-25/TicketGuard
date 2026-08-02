# 🎟️ TicketGuard - Event Ticket Booking System

A secure and scalable **Spring Boot REST API** for an Event Ticket Booking System. TicketGuard enables users to browse events, book tickets, make payments, generate QR-based tickets, download PDF tickets, and receive ticket confirmation via email.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT Authentication
- User Registration & Login
- BCrypt Password Encryption
- Role-Based Access Control (ADMIN / CUSTOMER)

### 👤 User Management
- Create, Update, Delete Users
- View User Details
- DTO & Mapper Architecture
- Input Validation

### 🏟 Venue Management
- Create, Update, Delete Venues
- Search Venues
- Pagination Support

### 🎫 Event Management
- Create, Update, Delete Events
- Event Categories
- Event Search
- Pagination
- Event Status Management

### 🛒 Booking Management
- Book Event Tickets
- Automatic Booking Reference Generation
- Seat Availability Validation
- Seat Count Update
- Booking Cancellation

### 💳 Payment Management
- Mock Payment Processing
- Transaction ID Generation
- Payment History
- Booking Confirmation

### 🎟 Ticket Management
- Automatic Ticket Generation
- Unique Ticket Number
- QR Code Generation
- PDF Ticket Generation
- Ticket Download API
- Ticket Status Tracking

### 📧 Email Notification
- Email Ticket Confirmation
- PDF Ticket Attachment
- Gmail SMTP Integration

### ⚙️ Additional Features
- Global Exception Handling
- SLF4J Logging
- Swagger/OpenAPI Documentation
- Pagination & Sorting
- Spring Validation
- Auditing (Created At / Updated At)

---

# 🏗️ Tech Stack

## Backend
- Java 21
- Spring Boot 3
- Spring Security
- Spring Data JPA
- Hibernate
- Maven

## Database
- PostgreSQL

## Security
- JWT Authentication
- BCrypt Password Encoder

## Documentation
- Swagger OpenAPI

## PDF & QR
- OpenPDF
- ZXing

## Email
- Spring Boot Mail
- Gmail SMTP

---

# 📁 Project Structure

```
src
├── booking
├── common
├── event
├── payment
├── security
├── ticket
│   ├── pdf
│   └── qr
├── user
├── venue
└── TicketguardBackendApplication
```

---

# 🔄 Application Workflow

```
User Registration
        │
        ▼
User Login (JWT)
        │
        ▼
Browse Events
        │
        ▼
Book Tickets
        │
        ▼
Payment
        │
        ▼
Generate Ticket
        │
        ▼
Generate QR Code
        │
        ▼
Generate PDF Ticket
        │
        ▼
Send Email with PDF
```

---

# 🛠️ Getting Started

## Clone Repository

```bash
git clone https://github.com/<your-username>/ticketguard-backend.git
cd ticketguard-backend
```

---

## Configure PostgreSQL

Create a PostgreSQL database.

Example:

```
ticketguard
```

Update `application.yml` with your database credentials.

---

## Configure Mail

Use environment variables instead of hardcoding credentials.

```yaml
spring:
  mail:
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}
```

Example:

```
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

---

## Run Application

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

---

# 📖 API Documentation

Swagger UI

```
http://localhost:8080/swagger-ui/index.html
```

OpenAPI

```
http://localhost:8080/v3/api-docs
```

---

# 🔐 Authentication

Protected APIs require JWT.

Example Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 📌 Main REST APIs

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

## Users

```
GET    /api/v1/users
GET    /api/v1/users/{id}
POST   /api/v1/users
PUT    /api/v1/users/{id}
DELETE /api/v1/users/{id}
```

## Venues

```
GET    /api/v1/venues
GET    /api/v1/venues/{id}
POST   /api/v1/venues
PUT    /api/v1/venues/{id}
DELETE /api/v1/venues/{id}
```

## Events

```
GET    /api/v1/events
GET    /api/v1/events/{id}
POST   /api/v1/events
PUT    /api/v1/events/{id}
DELETE /api/v1/events/{id}
```

## Bookings

```
POST   /api/v1/bookings
GET    /api/v1/bookings/my-bookings
GET    /api/v1/bookings
DELETE /api/v1/bookings/{id}
```

## Payments

```
POST   /api/v1/payments
GET    /api/v1/payments/my-payments
GET    /api/v1/payments
```

## Tickets

```
GET /api/v1/tickets/my-tickets
GET /api/v1/tickets/{id}
GET /api/v1/tickets/{id}/download
```

---

# 📸 Sample Output

After successful payment:

- ✅ Payment Successful
- ✅ Ticket Generated
- ✅ QR Code Generated
- ✅ PDF Ticket Generated
- ✅ Email Sent with PDF Attachment

---

# 🔮 Future Enhancements

- Docker & Docker Compose
- Redis Caching
- Seat Locking using Redis
- JUnit & Mockito Testing
- CI/CD using GitHub Actions
- Cloud Storage (AWS S3 / Cloudinary)
- Razorpay / Stripe Payment Gateway
- Refresh Tokens
- Rate Limiting
- Event Image Upload

---

# 👨‍💻 Author

**Mohit S**

- BE Information Science
- The National Institute of Engineering (NIE), Mysuru

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.
