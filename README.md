# DevPulse API

DevPulse is a backend application built for software teams to manage bug reports and feature requests in a collaborative environment. The system allows contributors to report issues and maintainers to manage the issue workflow through role-based permissions.

## Project Overview

The goal of this project is to provide a simple issue tracking platform where team members can create, review, update, and manage development tasks efficiently. The application follows a RESTful API architecture and uses JWT-based authentication to secure protected routes.

## Live URL

Add your deployed API URL here:

`b7-a2-lyart.vercel.app`

## Repository

Add your GitHub repository link here:

`https://github.com/sumai-suchi/B7A2`

---

## Key Features

* User registration and login system
* Secure password hashing using bcrypt
* JWT-based authentication and authorization
* Role-based access control (Contributor & Maintainer)
* Create and manage bug reports
* Create and manage feature requests
* Public issue browsing
* Issue filtering and sorting
* Ownership-based permissions for contributors
* Maintainer-level issue management
* PostgreSQL database integration using raw SQL queries
* Consistent success and error response structure

---

## Technology Stack

### Backend

* Node.js
* TypeScript
* Express.js

### Database

* PostgreSQL
* Neon Database

### Authentication & Security

* bcrypt
* JSON Web Token (JWT)

### Development Tools

* tsx
* tsup
* dotenv

---

## User Roles

### Contributor

* Register and login
* Create issues
* View all issues
* View single issue details
* Update own issues while status is open

### Maintainer

* All contributor permissions
* Update any issue
* Delete any issue
* Manage issue workflow status

---

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/signup
```

#### Login User

```http
POST /api/auth/login
```

---

### Issues

#### Create Issue

```http
POST /api/issues
```

Authentication Required

#### Get All Issues

```http
GET /api/issues
```

Optional Query Parameters:

```http
?sort=newest
?sort=oldest
?type=bug
?type=feature_request
?status=open
?status=in_progress
?status=resolved
```

#### Get Single Issue

```http
GET /api/issues/:id
```

#### Update Issue

```http
PATCH /api/issues/:id
```

Authentication Required

#### Delete Issue

```http
DELETE /api/issues/:id
```

Maintainer Only

---

## Database Schema Summary

### Users Table

| Field      | Description                |
| ---------- | -------------------------- |
| id         | Auto increment primary key |
| name       | User's full name           |
| email      | Unique email address       |
| password   | Hashed password            |
| role       | contributor or maintainer  |
| created_at | Creation timestamp         |
| updated_at | Update timestamp           |

### Issues Table

| Field       | Description                 |
| ----------- | --------------------------- |
| id          | Auto increment primary key  |
| title       | Issue title                 |
| description | Detailed issue description  |
| type        | bug or feature_request      |
| status      | open, in_progress, resolved |
| reporter_id | User who reported the issue |
| created_at  | Creation timestamp          |
| updated_at  | Update timestamp            |

---

## Installation & Setup

### 1. Clone the Repository



## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": {}
}
```

---

## Project Highlights

This project was developed using TypeScript, Express, PostgreSQL, and raw SQL queries without using any ORM or query builder. The application focuses on authentication, authorization, database design, and role-based access control while maintaining a clean and scalable backend architecture.
