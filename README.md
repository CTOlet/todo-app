# todo-app

Dockerized todo app with authentication. 👨‍💻

- React frontend
- Express backend
- Postgres database
- Nginx reverse proxy

## Images

<p align="center">
<img width="400" alt="Bildschirmfoto 2022-08-04 um 07 39 46" src="https://user-images.githubusercontent.com/67900846/182771243-0155f1de-0b01-4e4e-9bed-291e0819dc10.png">
<img width="400" alt="Bildschirmfoto 2022-08-04 um 07 38 42" src="https://user-images.githubusercontent.com/67900846/182771254-2e3ef70a-0560-4e5f-8ead-88ac4f510820.png">
<img width="400" alt="Bildschirmfoto 2022-08-04 um 07 39 04" src="https://user-images.githubusercontent.com/67900846/182771266-2f5a357b-7cbf-4735-b5e6-be347cfe8968.png">
<img width="400" alt="Bildschirmfoto 2022-08-04 um 07 39 25" src="https://user-images.githubusercontent.com/67900846/182771275-f33811ff-bec3-4c4b-8c6a-9fbd38f7f977.png">
</p>

## Getting started

Run `docker-compose up` and open `localhost:80` in your browser.

---

# todo-app

Dockerized full-stack todo application with authentication. Built with React, Express, Postgres, and Nginx.

## Images

<p align="center">
<img width="400" alt="Bildschirmfoto 2022-08-04 um 07 39 46" src="https://user-images.githubusercontent.com/67900846/182771243-0155f1de-0b01-4e4e-9bed-291e0819dc10.png">
<img width="400" alt="Bildschirmfoto 2022-08-04 um 07 38 42" src="https://user-images.githubusercontent.com/67900846/182771254-2e3ef70a-0560-4e5f-8ead-88ac4f510820.png">
<img width="400" alt="Bildschirmfoto 2022-08-04 um 07 39 04" src="https://user-images.githubusercontent.com/67900846/182771266-2f5a357b-7cbf-4735-b5e6-be347cfe8968.png">
<img width="400" alt="Bildschirmfoto 2022-08-04 um 07 39 25" src="https://user-images.githubusercontent.com/67900846/182771275-f33811ff-bec3-4c4b-8c6a-9fbd38f7f977.png">
</p>

## Requirements

- Docker
- Docker Compose

## Installation

1. Clone this repository
2. Navigate to the root directory of the project
3. Run `docker compose up`
4. Open a web browser and navigate to http://localhost:80 http://localhost:3000

## Features

- **User Authentication**: The application implements a custom authentication flow with refresh and access tokens, ensuring the security of user data.
- **CRUD Operations**: The app provides typical CRUD operations (Create, Read, Update, Delete) for managing todo items.
- **React Frontend**: The frontend is built with React as SPA (Single Page Application), providing a modern and efficient development experience. The user interface is designed to be intuitive and easy to use.
- **Express Backend**: The backend is built with Express and uses an ORM (Object-Relational Mapping) for database interaction. This allows for easy and efficient querying. It provides a RESTful API for the frontend to interact with.
- **Postgres Database**: The application uses a Postgres database to store user and todo item information.
- **Nginx Reverse Proxy**: The app uses an Nginx reverse proxy to handle incoming HTTP requests and route them to the appropriate backend service.
- **Docker Containers**: The app is dockerized / containerized for easy development and scalability.
