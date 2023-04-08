# Backend API

This project is a backend API for a blogging platform that allows users to create anf comment on blogs. Users can also view thier nth level ffriends based on the blogs they have commented.

### Tech Stack
Node.js
Express
MongoDB
Mongoose

### Features
* User management: Create and retrieve user profiles
* Blog management: Create and retrieve blog posts, including author information(which is one of the users)
* Comment management: Create and retrieve comments for blog posts, including author information(which is one of the users) and blog information
* Friend management: Retrieve nth level friends for a user based on comments on the same blogs - which is used by LinkedIn

## API Endpoints

### Users
* `GET /users`: Get all users
* `POST /users`: Create all users
* `GET /users/:userId`: Get a specific users
* `GET /users/:userId/level/:levelNo`: Get all nth level friends of a specific user

### Blogs
* `GET /blogs`: Get all blogs
* `POST /blogs`: Create all blogs
* `GET /blogs/:blogId`: Get a specific blogs

### Comments
* `GET /comments`: Get all comments
* `POST /comments`: Create all comments
* `GET /comments/:commentId`: Get a specific comments

## To run
`npm start`







