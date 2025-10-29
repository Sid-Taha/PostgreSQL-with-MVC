# Project Analysis

## Project Name
book-api

## Description
A simple REST API for managing books and authors.

## Tech Stack
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM

## Project Structure
```
C:\Users\PMLS\Desktop\book-api/
├───.env
├───docker-compose.yaml
├───drizzle.config.js
├───index.js
├───package-lock.json
├───package.json
├───controllers/
│   └───books.controler.js
├───db/
│   └───connection.js
├───drizzle/
├───middlewares/
│   └───globalmiddleware.js
├───models/
│   ├───author.model.js
│   ├───book.model.js
│   └───index.js
├───node_modules/...
└───routes/
    └───book.route.js
```

## File Descriptions

- **`index.js`**: The main entry point of the application. It sets up the Express server, middlewares, and routes.
- **`package.json`**: Lists the project dependencies and scripts.
- **`docker-compose.yaml`**: Defines the services, networks, and volumes for the Dockerized application. It's configured to run a PostgreSQL database.
- **`drizzle.config.js`**: Configuration file for Drizzle ORM, specifying the database dialect, schema location, and output directory for migrations.
- **`.env`**: Stores environment variables, such as the `DATABASE_URL`.

### `controllers/`
- **`books.controler.js`**: Contains the logic for handling requests related to books.

### `db/`
- **`connection.js`**: Establishes the connection to the PostgreSQL database using Drizzle ORM.

### `middlewares/`
- **`globalmiddleware.js`**: A sample global middleware.

### `models/`
- **`author.model.js`**: Defines the schema for the `Author` table.
- **`book.model.js`**: Defines the schema for the `bookLibrary` table.
- **`index.js`**: Exports all the models.

### `routes/`
- **`book.route.js`**: Defines the API routes for books.

## Database Schema

### `Author` Table
| Column      | Type    | Constraints              |
|-------------|---------|--------------------------|
| `id`        | UUID    | Primary Key, Default Random |
| `firstName` | VARCHAR(100) | Not Null                 |
| `lastName`  | VARCHAR(100) |                          |
| `email`     | VARCHAR(255) | Not Null, Unique         |

### `bookLibrary` Table
| Column        | Type    | Constraints              |
|---------------|---------|--------------------------|
| `id`          | UUID    | Primary Key, Default Random |
| `title`       | VARCHAR(255) | Not Null                 |
| `description` | TEXT    | Not Null                 |
| `authorId`    | UUID    | Not Null, Foreign Key to `Author(id)` |

## API Routes

- **`GET /`**: Fetches all books.

## How to Run
1.  Install dependencies: `npm install`
2.  Start the database: `docker-compose up -d`
3.  Run migrations: `npx drizzle-kit migrate`
4.  Start the server: `npm start`
