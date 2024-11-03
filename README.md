## Getting Started

### Prerequisites

1. **NodeJs**: Have Node.js installed.
2. **MySQL**: Install and configure a MySQL database server.

### Setup

1**Install Dependencies**:

   ```bash
   npm install
   ```

2**Configure MySQL Database**:

   ```sql
   CREATE DATABASE IF NOT EXISTS mydatabase;

   USE mydatabase;

   CREATE TABLE IF NOT EXISTS items (
     id INT AUTO_INCREMENT PRIMARY KEY,
     item_name VARCHAR(255) UNIQUE
   );

   CREATE TABLE IF NOT EXISTS combinations (
     id INT AUTO_INCREMENT PRIMARY KEY,
     combination JSON
   );

   CREATE TABLE IF NOT EXISTS responses (
     id INT AUTO_INCREMENT PRIMARY KEY,
     request_body JSON,
     combination_ids JSON
   );
   ```

4. **Configure Database Connection**:

   Open `db.js` and replace the database connection parameters with your MySQL credentials:

   ```javascript
   const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',         // Your MySQL username
     password: 'password', // Your MySQL password
     database: 'mydatabase',
     waitForConnections: true,
     connectionLimit: 10,
     queueLimit: 0
   });
   ```
   
5. **Create .env file from the example file provided.**


6. **Run the Server**:

   ```bash
   node app.js
   ```

### Usage

Use Postman or any API client to send a POST request to the `/api/generate` endpoint.

1. **Endpoint**: `POST http://localhost:3000/api/generate`
2. **Body**:
   ```json
   {
     "items": [1, 2, 1],
     "length": 2
   }
   ```

3. **Response**:
   You should receive a JSON response with an ID and the list of generated combinations:
   ```json
   {
       "id": 1,
       "combination": [
           ["A1", "B1"], ["A1", "B2"], ["A1", "C1"],
           ["B1", "C1"], ["B2", "C1"]
       ]
   }
   ```