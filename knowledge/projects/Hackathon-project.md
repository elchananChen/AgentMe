# Hackathon-project

> A community-focused platform connecting individuals in need with service providers (private or NGO) across various categories, facilitating support for specific demographics and locations.

## Project Overview
- **Type**: Full-stack Application (Client-Server)
- **Purpose**: To create a marketplace/directory where users can post requests for help (based on status, location, and service type) and providers can offer their services. It seems designed to support specific populations (e.g., soldiers, students, disabled persons) in Israel (implied by location names).
- **Scale**: The backend defines a large, fixed set of service categories (over 100) and status types. The frontend has numerous pages for navigation, profile management, posting, and filtering.
- **Monorepo?**: Yes, structured with separate `client` (Frontend) and `server` (Backend) directories.

## Technology Stack

### Frontend
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | React | Using Vite as the build tool. |
| Build Tool | Vite | |
| Styling | Tailwind CSS | Used with `tailwindcss-animate` and `class-variance-authority`. |
| State Management | Redux Toolkit | Used via `react-redux` for global state (e.g., user info). |
| Routing | React Router DOM | Used for navigation between pages. |
| Forms / Validation | Not explicitly shown, but uses controlled components. | |
| HTTP Client | Axios | Used for all API communication. |
| UI Component Library | Shadcn/ui (implied) | Uses components like `Button`, `Accordion` from local/custom implementations based on shadcn patterns (`@/components/ui/button.tsx`). |
| Internationalization | Not confirmed in source | |
| Animation | Not confirmed in source | Uses CSS transitions/transforms for hover effects. |
| Other | TypeScript | Used throughout the client project. |

### Backend
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Node.js | Inferred from Express and module structure (`"type": "module"`). |
| Framework | Express | Minimalist setup with middleware. |
| Database | MongoDB | Using Mongoose as the ODM. |
| ORM / ODM | Mongoose | |
| Authentication | JWT (JSON Web Tokens) | Used for securing routes via `verifyToken` middleware. |
| Caching | Not confirmed in source | |
| Payment | Not confirmed in source | |
| File Upload | Not confirmed in source | `profileImg` and `bannerImg` fields exist but upload logic is not visible. |
| Email | Not confirmed in source | |
| Other | dotenv, bcrypt, morgan, cors | For environment variables, password hashing, logging, and cross-origin resource sharing. |

## Full Dependency List

### Frontend Dependencies
#### Production
- **@radix-ui/react-accordion**: UI primitives for building accessible components.
- **@radix-ui/react-slot**: Primitive for composing components.
- **@reduxjs/toolkit**: State management library.
- **axios**: Promise-based HTTP client for making API requests.
- **class-variance-authority**: Utility for constructing class names based on props.
- **clsx**: Utility for conditionally joining class names.
- **icons**: Generic icon package (likely a placeholder or dependency of another).
- **install**: Command-line utility (unusual for production dependencies).
- **js-cookie**: Library for handling browser cookies.
- **lucide-react**: Icon library.
- **npm**: Package manager (unusual for production dependencies).
- **react**: Core React library.
- **react-dom**: React package for DOM manipulation.
- **react-icons**: Library for using icons from various icon packs.
- **react-redux**: React bindings for Redux.
- **react-router-dom**: Declarative routing for React applications.
- **tailwind-merge**: Utility to merge Tailwind CSS classes while respecting overrides.
- **tailwindcss-animate**: Plugin for Tailwind CSS animations.

#### Dev Dependencies
- **@eslint/js**: ESLint base configuration.
- **@types/node**: TypeScript type definitions for Node.js.
- **@types/react**: TypeScript type definitions for React.
- **@types/react-dom**: TypeScript type definitions for React DOM.
- **@vitejs/plugin-react**: Vite plugin for React.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint**: JavaScript linter.
- **eslint-plugin-react-hooks**: ESLint plugin for React Hooks rules.
- **eslint-plugin-react-refresh**: ESLint plugin for React Fast Refresh.
- **globals**: Provides global variables definitions for ESLint.
- **postcss**: CSS post-processor.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Language for static type checking.
- **typescript-eslint**: ESLint parser for TypeScript.
- **vite**: Next-generation frontend tooling.

### Backend Dependencies
#### Production
- **bcrypt**: For hashing passwords.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: To load environment variables from a `.env` file.
- **express**: Web application framework.
- **js-cookie**: Library for handling browser cookies (used for setting JWT).
- **jsonwebtoken**: For creating and verifying JWTs.
- **mongodb**: The native MongoDB driver.
- **mongoose**: ODM for MongoDB.
- **morgan**: HTTP request logger middleware.

#### Dev Dependencies
- **nodemon**: Tool that automatically restarts the Node.js server when file changes are detected (used in `start` script).

## Architecture & Project Structure
The project follows a standard **Client-Server** architecture, with the frontend built as a Single Page Application (SPA) and the backend as a RESTful API.

**Backend Architecture:**
The server appears to follow a **Controller-Service-Model** pattern (though services are merged into controllers):
- **`app.js`**: Main entry point, sets up Express, middleware (CORS, Morgan), connects to MongoDB, and mounts routes.
- **`models/`**: Defines Mongoose schemas (`User`, `Post`, `Provider`).
- **`controllers/`**: Contains the business logic for handling requests (`userController.js`, `providerController.js`, `postController.js`).
- **`routes/`**: Maps HTTP methods and paths to controller functions.
- **`middleware/`**: Contains cross-cutting concerns like JWT verification (`auth.js`).

**Frontend Architecture:**
The client uses a **Component-based architecture** with **Redux** for state management and **React Router** for navigation.
- **`src/pages/`**: Top-level components representing routes (e.g., `HomePage`, `Profile`, `Login`).
- **`src/components/`**: Reusable UI elements (`Header`, `Post`, `Categories`).
- **`src/store/`**: Redux setup, including a `userSlice` for managing user session state.
- **`src/utils/`**: API service layer (`api.service.ts`) abstracting Axios calls.

**Data Flow Overview:**
1.  **Client (React)** makes an API call via `api.service.ts` (Axios), often including a JWT in the `Authorization` header.
2.  **Server (Express)** receives the request. If protected, `verifyToken` middleware extracts and validates the JWT, attaching user data to `req.user`.
3.  The relevant **Controller** executes logic, interacting with **Mongoose Models** to query/update **MongoDB**.
4.  The server responds with JSON data.
5.  The **Client** updates its state (Redux) or UI based on the response.

**Notable Structural Decisions:**
- **Strict Separation**: Clear separation between client and server codebases.
- **Rich Schemas**: The `Post` model has an extensive, hardcoded enum for `serviceType` (over 100 options) and `status`, suggesting a highly specific domain model.
- **Location Mapping**: Locations are also defined as a fixed enum on the server and used for filtering on the client.

## Core Features & Business Logic

1.  **User Authentication & Session Management**:
    -   **Implementation**: Handled in `server/controllers/userController.js` using bcrypt for password hashing and JWT for session tokens. Tokens are set as HTTP-only cookies (though `httpOnly: false` is set in the code, which is a security concern). The client uses Redux (`userSlice.ts`) to store the current user state, including role (`provider`, `customer`, `guest`).
    -   **Validation**: `verifyToken` middleware ensures protected routes require a valid JWT.

2.  **Provider Profile Creation/Management**:
    -   **Implementation**: Providers register via `crateNewProvider` in `providerController.js`. The provider's `userID` links to the main `User` document. Providers can update their bio, banner, and website link via `updateProvider`. User profile images are updated in both `User` and `Provider` documents upon update.

3.  **Post Creation and Filtering (Core Functionality)**:
    -   **Post Creation**: Providers create posts (`crateNewPost`) specifying service type, status, location, title, and description. The post is linked to the provider's ID and type.
    -   **Filtering**: The `getFilteredPosts` endpoint allows complex querying based on multiple criteria (`serviceType`, `status`, `location`, etc.). The client constructs a query string from user selections in `Yourpost.tsx` and sends it to the API.

4.  **Dynamic UI for Posting/Filtering**:
    -   **Implementation**: The `Yourpost.tsx` page dynamically renders selection forms using custom components (`Categories.tsx` and `MapAccordion.tsx`) to handle multi-select checkboxes for service types, locations, and statuses.

5.  **Profile Viewing**:
    -   **Implementation**: The `Profile.tsx` page fetches provider details by `userId` (`getProviderByUserId`), populating the associated user data (username, email, phone) to display a comprehensive profile.

## Impressive Patterns & Best Practices
- **Extensive Domain Modeling**: The use of large, fixed enums for `serviceType` and `status` in `postModel.js` demonstrates a commitment to data integrity and constrained input for core entities.
- **Token Refresh on Update**: In `userController.js` and `providerController.js`, after a successful update, a new JWT is generated and sent back to the client, ensuring the session token reflects the latest user data (like `profileImg`).
- **Separation of Concerns in API Calls**: The client abstracts all API logic into `api.service.ts`, keeping components clean.
- **Dynamic Filtering Logic**: The client correctly translates complex filter selections (arrays of strings) into URL query parameters for the backend to process using `$in` MongoDB queries.
- **Component Reusability**: `MapAccordion` is reused for both `location` and `status` selection forms, promoting DRY principles in the UI.

## Testing & Quality
- **Test framework(s) used**: Not confirmed in source.
- **Types of tests present**: No test files or folders (e.g., `__tests__`, `.test.js`, `.spec.ts`) were found in the structure scan.
- **Test coverage observations**: No testing artifacts were found.
- **Linting / formatting tools**: ESLint and Prettier are configured in the client project (`eslint.config.js`, `tsconfig.json`).

## DevOps & Infrastructure
- **Docker / containerization**: Not confirmed in source.
- **CI/CD pipelines**: Not confirmed in source.
- **Environment configuration**: Uses `dotenv` in the backend (`server/app.js` calls `dotenv.config()`) and relies on `process.env.DB_URI`. The client uses Vite's environment variable handling (implied by `vite.config.ts`).
- **Deployment target**: Not explicitly stated.
- **Scripts in package.json worth noting**:
    -   **Client**: `dev` (starts Vite dev server), `build` (compiles TypeScript and builds for production).
    -   **Server**: `start` (runs `nodemon app.js` for development).

## Security Practices
- **Authentication & authorization approach**: JWTs are used. Routes are protected using `verifyToken` middleware which checks for a token in the `Authorization` header.
- **Input validation & sanitization**: Basic validation exists in controllers (checking for required fields). Mongoose schemas enforce data types and use built-in validation (e.g., email regex, enum constraints).
- **Security headers & middleware**: `cors` middleware is used to restrict origins to `http://localhost:5173`. `morgan` is used for logging.
- **Secrets management**: Relies on `process.env.JWT_KEY` loaded via `dotenv`.
- **OWASP considerations observed**:
    -   **Vulnerability**: JWTs are set via `res.cookie` with `httpOnly: false` in the backend code (`userController.js`, `providerController.js`). This makes the token accessible via client-side JavaScript (`Cookies.get("jwt")` in `api.service.ts`), which is a significant Cross-Site Scripting (XSS) risk, as an attacker could steal the token.

## Portfolio-Ready Highlights
- Designed and implemented a full-stack community support platform using React/Vite and Node/Express/MongoDB.
- Developed a complex, multi-criteria filtering system for service requests, translating frontend selections into MongoDB `$in` queries on the backend.
- Implemented secure user authentication and role-based authorization using JWTs and Express middleware.
- Created a highly structured data model featuring over 100 predefined service categories and specific user status types to ensure data consistency.
- Utilized Redux Toolkit for robust global state management of user sessions and roles across the SPA.
- Implemented dynamic UI forms using custom reusable components (`MapAccordion`, `Categories`) to manage complex, multi-select inputs for posting requests.