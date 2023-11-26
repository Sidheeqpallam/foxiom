# Backend APIs for Books and Users Microservices

This project contains the backend APIs developed in Node.js using a microservices architecture to manage Books and Users services.

## Table of Contents

1. [Overview](#overview)
2. [Microservices Architecture](#microservices-architecture)
3. [Setup](#setup)
4. [Endpoints](#endpoints)
5. [Usage](#usage)
6. [Dependencies](#dependencies)
7. [Docker](#docker)
8. [Contributing](#contributing)
9. [License](#license)

## Overview

This repository houses the backend services that cater to two main functionalities: Books and Users. The services are designed to operate independently as microservices, providing dedicated APIs for managing books-related operations and user-related functionalities.

## Microservices Architecture

The project follows a microservices architecture, allowing separation of concerns and scalability. The architecture consists of individual services for Books and Users, ensuring modularity and flexibility in development and deployment.

## Setup

To set up the services locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/backend-apis.git`
2. Install dependencies: `npm install`
3. Configure environment variables (if applicable).
4. Start the services: `npm start`

## Endpoints

### Books Service APIs

- `GET /api/v1/books`: Retrieve all books.
- `GET /api/v1/books/:id`: Retrieve a specific book by ID.
- `POST /api/v1/books`: Create a new book.
- `PUT /api/v1/books/:id`: Update a book by ID.
- `DELETE /api/v1/books/:id`: Delete a book by ID.

### Users Service APIs

- `POST /api/v1/users/auth/register`: Create a new user.
- `POST /api/v1/users/auth/login`: login into  a user account

## Usage

The APIs can be utilized by making HTTP requests to the respective endpoints. Ensure proper authentication and authorization mechanisms (bearer token) are in place for books-related operations.

## Dependencies

The project utilizes various dependencies in the Node.js ecosystem. Refer to the `package.json` file for a complete list of dependencies and their versions.

## Docker

### Docker Setup

To run the services using Docker, follow these steps:

1. Install Docker on your machine if you haven't already.
2. Build the Docker images:
    ```bash
    docker-compose build
    ```
3. Start the services:
    ```bash
    docker-compose up
    ```

### Docker Compose Configuration

The `docker-compose.yml` file includes configurations for running the services as Docker containers.

## Contributing

Contributions to the project are welcome! Feel free to submit bug reports, feature requests, or pull requests.

1. Fork the repository.
2. Create your branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request.

## License

This project is licensed under the [ISC License](LICENSE).
