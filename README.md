# Phoenix : IMF Gadget API Development 

A RESTful API for managing secret gadgets and admin authentication.
______________________________________________________________________________________________________________________________


## API Structure
The API follows a versioned structure:
- `/api/v1/user` - User authentication endpoints
- `/api/v1/gadgets` - Gadget management endpoints



## Table of Contents
- [Authentication](#authentication)
- [User Endpoints](#user-endpoints)
- [Gadget Endpoints](#gadget-endpoints)


## Authentication

The API uses JWT (JSON Web Token) for authentication. 




## User Endpoints

### Create User
- **URL**: `/user/signup`
- **Method**: `POST`
- **Headers**: 
  ```http
  Content-Type: application/json
  ```
- **Response**: Returns the generated password and admin details
- **Success Response Code**: 201
- ![Screenshot (184)](https://github.com/user-attachments/assets/2a16e0e3-f76c-4b00-8aac-cc015df22732)


### User Login
- **URL**: `/user/login`
- **Method**: `POST`
- **Headers**: 
  ```http
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "codename": "string",
    "password": "string"
  }
  ```
- **Response**: Returns JWT token
- **Success Response Code**: 200
- ![Screenshot (183)](https://github.com/user-attachments/assets/70069841-0ebc-48c8-a1ba-2b06294815d8)


## Gadget Endpoints

All gadget endpoints require authentication. Include the JWT token in the Authorization header.

### Get All Gadgets
- **URL**: `/gadget`
- **Method**: `GET`
- **Headers**: 
  ```http
  Authorization: Bearer <your_token>
  ```
- **Query Parameters**: 
  - `status` (optional) - Filter gadgets by status
- **Success Response Code**: 200
- **Description**: Returns all gadgets. If no status is specified, returns only 'Available' gadgets.
  
### Create Gadget
- **URL** :`/`
- **Method**: `POST`
- ![Screenshot (185)](https://github.com/user-attachments/assets/abbe7020-c250-4e69-a57a-a57726c30b5b)


### Update Gadget
- **URL**: `/:id`
- **Method**: `PATCH`

- **Success Response Code**: 200
- **Description**: Updates specified gadget details.

### Decommission Gadget
- **URL**: `/:id`
- **Method**: `DELETE`

- **Success Response Code**: 200
- **Description**: Changes gadget status to 'Decommissioned' and sets decommission timestamp.

### Self-Destruct Gadget
- **URL**: `/:id/self-destruct`
- **Method**: `POST`

- **Description**: Initiates self-destruct sequence and returns confirmation code.

## Models

### Gadget Model
model Gadget {
  id Int @id @default (autoincrement())
  name String
  codename String @unique
  status String @default ("Available")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt 
  decommissionedAT DateTime?

}

###User Model
model User{
  id Int @id @default (autoincrement())
  username String @unique
  password String
  firstname String
  lastname String

}
----------------------------------------------------------------------------------------------------------------------------------
## Error Handling

All endpoints return appropriate error messages with the following structure:


Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Environment Variables

Required environment variables:
- `NEON_DATABASE_URL`: PostgreSQL database connection URL
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRATION`: JWT token expiration time
- `NODE_ENV`: Application environment (development/production)


### Future Improvements
1. Implement rate limiting using Redis or similar caching system
2. Add pagination for gadget listing endpoint
