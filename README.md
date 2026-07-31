# 🎟️ TicketGuard

> A Production-Ready High-Concurrency Event Ticket Booking Platform built using Java Spring Boot and React.

---

## 📌 Overview

TicketGuard is an enterprise-grade ticket booking platform designed to handle massive booking spikes during high-demand events such as concerts, sports matches, and festivals.

The project focuses on solving real-world engineering challenges including:

- High concurrency booking
- Seat reservation consistency
- Double booking prevention
- Secure authentication
- Real-time seat availability
- Scalable backend architecture

Unlike traditional CRUD projects, TicketGuard demonstrates software engineering concepts used in modern product companies.

---

# 🚀 Tech Stack

## Backend

- Java 21
- Spring Boot
- Spring MVC
- Spring Data JPA
- Hibernate
- PostgreSQL
- Redis
- Spring Security
- JWT Authentication
- Maven
- WebSocket
- Lombok
- MapStruct
- Swagger/OpenAPI

---

## Frontend

- React
- Vite
- React Router
- Axios
- Material UI
- Tailwind CSS
- React Hook Form

---

## Database

- PostgreSQL
- Redis

---

## DevOps

- Docker
- Docker Compose
- GitHub Actions
- Nginx

---

# ✨ Features

## User

- Register
- Login
- Browse Events
- Search Events
- View Seat Map
- Book Seats
- Cancel Booking
- Booking History
- Profile Management

---

## Admin

- Manage Events
- Manage Venues
- Configure Seat Layout
- View Analytics
- Manage Bookings
- Dashboard

---

## Advanced Features

- JWT Authentication
- Role-Based Authorization
- Redis Caching
- Distributed Seat Locking
- Rate Limiting
- Virtual Waiting Room
- WebSocket Live Seat Updates
- Pagination
- Sorting
- Filtering
- Email Notifications
- Global Exception Handling
- Validation
- Docker Support
- CI/CD Ready

---

# 🏗️ Project Architecture

```
                React Frontend
                       │
                REST API (HTTPS)
                       │
              Spring Boot Backend
                       │
        ┌──────────────┴──────────────┐
        │                             │
   PostgreSQL                     Redis
        │                             │
 Event Data                 Cache / Seat Locks
 Bookings                   Rate Limiting
 Users                      Waiting Queue
```

---

# 📂 Project Structure

```
TicketGuard
│
├── backend
│
├── frontend
│
├── database
│   ├── schema
│   ├── migrations
│   └── seed
│
├── docker
│
├── docs
│
├── .github
│
├── README.md
│
└── LICENSE
```

---

# 📅 Development Roadmap

- [x] Project Planning
- [x] Architecture Design
- [ ] Spring Boot Setup
- [ ] PostgreSQL Integration
- [ ] JWT Authentication
- [ ] Event Management
- [ ] Seat Inventory
- [ ] Booking Engine
- [ ] Payment Module
- [ ] Redis Integration
- [ ] Waiting Room
- [ ] WebSockets
- [ ] Notifications
- [ ] Docker
- [ ] Testing
- [ ] Deployment

---

# 🎯 Learning Objectives

This project demonstrates:

- Enterprise Spring Boot Development
- REST API Design
- Object-Oriented Design
- Database Modeling
- Secure Authentication
- Concurrency Handling
- Distributed Locking
- Caching
- Docker
- Production Deployment
- Clean Architecture
- Design Patterns
- System Design Fundamentals

---

# 📖 Documentation

Documentation will include:

- Software Requirement Specification (SRS)
- Architecture Diagram
- ER Diagram
- API Documentation
- Deployment Guide
- Contributing Guide
- Interview Notes
- System Design Notes

---

# 🧪 Testing

Planned testing strategy:

- Unit Testing (JUnit)
- Integration Testing
- Mockito
- Postman Collections
- Load Testing

---

# 🚀 Deployment

Deployment targets:

- Backend → Railway / Render
- Frontend → Vercel
- PostgreSQL → Neon
- Redis → Upstash

---

# 🤝 Contributing

Contributions are welcome.

Please fork the repository and submit a pull request following the project's coding standards.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Developed as part of a Java Full Stack Engineering Bootcamp to demonstrate enterprise software engineering practices, scalable backend architecture, and high-concurrency system design.