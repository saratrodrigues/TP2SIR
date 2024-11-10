# Student Management API

## Description

This project is a simple REST API for managing student data. It allows basic CRUD operations (Create, Read, Update, Delete) for managing student information such as `name`, `course`, and `year`. The API is built using Node.js, Express, and uses a JSON file as the database to persist data. The project also includes a simple front-end interface to interact with the API.

## Features

- Fetch all students
- Create new students
- Edit student details (name, course, year)
- Delete students
- Static pages for documentation (`/doc`), demo (`/`), and about the authors (`/about`)

## Installation

To run this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Steps to Install

1. Clone this repository to your local machine:
    ```bash
    git clone https://github.com/saratrodrigues/TP2SIR.git
    ```

2. Navigate into the project directory:
    ```bash
    cd TP2SIR
    ```

3. Install the project dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. The application will be available at `http://localhost:3000`. Open this address in your browser to start using the app.

---

## Link to the Application on Render.com

The hosted version of the application can be accessed at https://tp2sir.onrender.com.

---

## Available Routes

The application exposes the following routes to interact with the student data:

### 1. **GET** `/students`
Fetches the list of all students.
    ```bash
    GET http://localhost:3000/students
    ```

#### Example response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "course": "Computer Science",
    "year": 2
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "course": "Engineering",
    "year": 1
  }
]

```

### 2. **GET** `/students/{id}`
Returns a specific student by their ID.
    ```bash
    GET http://localhost:3000/students/1
    ```

#### Example response:
```json
  {
    "id": 1,
    "name": "John Doe",
    "course": "Computer Science",
    "year": 2
  }

```
### 3. **POST** `/students`
Creates a new student. Requires the student's name, course, and year in the request body.
    ```bash
    POST http://localhost:3000/students
    ```

#### Example response:
```json
    {
    "name": "John",
    "course": "Physics",
    "year": 3
    }

    {
    "id": 3,
    "name": "John",
    "course": "Physics",
    "year": 3
    }
```

### 4. **PUT** `/students/{id}`
Updates an existing student by their ID. You can update name, course, or year.

    ```bash
    PUT http://localhost:3000/students/1
    ```

#### Example response:
```json
    {
    "name": "Alice Johnson",
    "course": "Computer Science",
    "year": 3
    }
    {
    "id": 1,
    "name": "Alice Johnson",
    "course": "Computer Science",
    "year": 3
    }
```
### 5. **DELETE** `/students/{id}`
Deletes a student by their ID.

    ```bash
    DELETE http://localhost:3000/students/1
    ```
#### Example response:
```json
    {
    "id": 1,
    "name": "Alice",
    "course": "Computer Science",
    "year": 2
    }
```

## Data Format

The students resource expects data in the following format:

```json
    {
    "id": Integer,
    "name": "String",
    "course": "String",
    "year": Integer
    }
``` 
#### id: A unique identifier for the student (auto-incremented).
#### name: 
    The student's name.
#### course: 
    The course the student is enrolled in.
#### year: 
    The year the student is currently in.


## Technologies Used 

### Node.js: 
    Backend JavaScript runtime.
### Express: 
    Web framework for building the REST API.
### Lowdb: 
    A small local JSON database for persisting student data.
### HTML/CSS/JavaScript: 
    Front-end for interacting with the API.
### Fetch API: 
    Used on the front-end to make HTTP requests.