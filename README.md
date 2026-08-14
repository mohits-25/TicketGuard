# 🎟️ TicketGuard

A full-stack **Event Ticket Booking and Management System** built with **Spring Boot, React, PostgreSQL, and Redis**.

TicketGuard provides a complete event-booking workflow where customers can discover events, book tickets, make payments, receive QR-enabled PDF tickets, and manage their bookings. Administrators can manage events, venues, users, bookings, payments, and tickets through a dedicated management interface.

---

## 📌 Features

### 👤 Customer

- User Registration and Login
- JWT-based Authentication
- Browse Events
- View Event Details
- Search and Filter Events
- Book Event Tickets
- Secure Payment Processing
- View Booking History
- View Payment History
- View My Tickets
- Download PDF Tickets
- QR Code Ticket Generation
- Ticket Email Delivery
- User Dashboard
- Profile Management

### 🛠️ Administrator

- Admin Dashboard
- Event Management (CRUD)
- Venue Management (CRUD)
- User Management (CRUD)
- Booking Management
- Payment Management
- Ticket Management
- Role-Based Authorization

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │     React Frontend   │
                    │   Material UI (MUI)  │
                    └──────────┬───────────┘
                               │
                         Axios REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │                      │
                    │ Controllers          │
                    │ Services             │
                    │ DTOs / Mappers       │
                    │ Exception Handling   │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
                 ▼                           ▼
        ┌─────────────────┐         ┌─────────────────┐
        │ Spring Security │         │      Redis      │
        │      + JWT      │         │     Caching     │
        └─────────────────┘         └─────────────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Spring Data JPA │
        │    + Hibernate  │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   PostgreSQL    │
        │  Primary DB     │
        └─────────────────┘
```

### Architecture Approach

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
PostgreSQL
```

Additional components include:

- DTOs for API requests and responses
- Mapper classes for Entity ↔ DTO conversion
- Spring Security for authentication and authorization
- JWT for stateless authentication
- Redis for caching frequently accessed event and venue data
- Global exception handling
- Validation
- Unit and controller testing

---

# 🛠️ Tech Stack

## Frontend

- React
- React Router DOM
- Material UI (MUI)
- Axios
- React Hot Toast

## Backend

- Java 21
- Spring Boot 4.1.0
- Spring Security
- Spring Data JPA
- Hibernate
- Maven
- JWT Authentication
- Bean Validation

## Database

- PostgreSQL

## Caching

- Redis
- Spring Cache
- Redis JSON Serialization
- TTL-based caching

### Cached Resources

- Events
- Venues

Redis is used as a caching layer while PostgreSQL remains the primary source of truth.

## Additional Libraries

- OpenAPI / Swagger
- Java Mail Sender
- ZXing
- OpenPDF
- JUnit 5
- Mockito
- Spring MVC Test

---

# 📂 Project Structure

```text
TicketGuard/
│
├── ticketguard-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/ticketguard/ticketguard_backend/
│   │   │   │       ├── booking/
│   │   │   │       ├── common/
│   │   │   │       ├── config/
│   │   │   │       ├── event/
│   │   │   │       ├── payment/
│   │   │   │       ├── security/
│   │   │   │       ├── ticket/
│   │   │   │       ├── user/
│   │   │   │       └── venue/
│   │   │   └── resources/
│   │   └── test/
│   │       └── java/
│   └── pom.xml
│
└── ticketguard-frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── layouts/
    │   ├── pages/
    │   ├── routes/
    │   └── theme/
    └── package.json
```

---

# 🚀 Getting Started

## Prerequisites

- Java 21
- Maven
- PostgreSQL
- Redis
- Node.js
- npm

---

# ⚙️ Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/mohits-25/TicketGuard.git
cd TicketGuard
```

### 2. Navigate to the backend

```bash
cd ticketguard-backend
```

### 3. Configure the application

Create:

```text
src/main/resources/application.yml
```

Use `application.yml.example` as the configuration template.

Configure the following environment-specific values:

```text
DB_USERNAME
DB_PASSWORD
JWT_SECRET
JWT_EXPIRATION
REDIS_HOST
REDIS_PORT
MAIL_USERNAME
MAIL_PASSWORD
```

> Do not commit database passwords, JWT secrets, email credentials, or other sensitive configuration to Git.

---

# 🗄️ PostgreSQL Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE ticketguard;
```

Configure the application to connect to:

```text
jdbc:postgresql://localhost:5432/ticketguard
```

The application uses PostgreSQL as the primary database with Spring Data JPA and Hibernate ORM.

---

# ⚡ Redis Setup

Start Redis locally and verify the server:

```bash
redis-cli ping
```

Expected:

```text
PONG
```

Default configuration:

```yaml
spring:
  data:
    redis:
      host: localhost
      port: 6379
```

Redis is used as a caching layer for frequently accessed resources such as Events and Venues. Cached data uses a configured TTL and is updated or evicted when the corresponding data changes.

---

# ▶️ Run the Backend

```bash
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

# 📖 API Documentation

Swagger UI:

```text
http://localhost:8080/swagger-ui/index.html
```

REST API modules:

- Authentication API
- User API
- Event API
- Venue API
- Booking API
- Payment API
- Ticket API

---

# 💻 Frontend Setup

Navigate to the frontend:

```bash
cd ticketguard-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🔐 Authentication & Security

TicketGuard uses Spring Security with JWT-based authentication.

### Security Features

- JWT Authentication
- BCrypt Password Hashing
- Stateless Authentication
- Role-Based Authorization
- Protected REST Endpoints
- Admin Authorization
- Authenticated User Context

### Roles

```text
ADMIN
CUSTOMER
```

---

# 🎫 Booking & Ticket Workflow

```text
Browse Events
      ↓
Select Event
      ↓
Select Number of Tickets
      ↓
Create Booking
      ↓
Payment
      ↓
Ticket Generation
      ↓
QR Code Generation
      ↓
PDF Ticket Generation
      ↓
Email Delivery
```

Generated tickets include:

- Unique Ticket Number
- Booking Reference
- Event Information
- Venue Information
- Number of Tickets
- Amount
- QR Code
- PDF Ticket

---

# 📦 Redis Caching

Redis is implemented as a caching layer on top of PostgreSQL.

### Event Cache

```java
@Cacheable(value = "events", key = "#id")
```

Event updates refresh the cache:

```java
@CachePut(value = "events", key = "#id")
```

Event deletion removes the cached entry:

```java
@CacheEvict(value = "events", key = "#id")
```

The same caching strategy is applied to venues.

### Cache Strategy

```text
Client
  ↓
Controller
  ↓
Service
  ↓
Redis Cache
  │
  ├── Cache HIT ──→ Response
  │
  └── Cache MISS
          ↓
      PostgreSQL
          ↓
      Redis Cache
          ↓
       Response
```

PostgreSQL remains the source of truth.

---

# 🧪 Testing

The backend includes unit and controller-level tests using:

- JUnit 5
- Mockito
- Spring MVC Test

Current test suite:

```text
Tests run: 42
Failures: 0
Errors: 0
Skipped: 0
```

Run all tests:

```bash
mvn clean test
```

Expected result:

```text
Tests run: 42
Failures: 0
Errors: 0
Skipped: 0

BUILD SUCCESS
```

---

# 📸 Screenshots

Add screenshots demonstrating:

- Home Page
- Login / Registration
- Event Listing
- Event Details
- Booking
- Payment
- Customer Dashboard
- Admin Dashboard
- Event Management
- Venue Management
- Ticket Management
- Generated PDF Ticket
- Swagger API Documentation

---

# 🔮 Future Enhancements

- Dashboard Analytics
- Revenue Reports
- Advanced Event Search and Filtering
- Notifications
- Audit Logs
- Report Export
- Real-Time Event Updates
- Advanced Admin Analytics
- Dark Mode

---

# 👨‍💻 Author

## Mohit S

**Bachelor of Engineering — Information Science**

**The National Institute of Engineering, Mysore**

GitHub:

https://github.com/mohits-25/TicketGuard

---

# ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

# 📄 License

This project is developed for **educational and portfolio purposes**.
