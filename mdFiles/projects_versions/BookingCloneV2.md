The analysis of the repository structure and key files reveals a sophisticated, modern full-stack application architecture.

### Client Analysis Summary (Frontend)
The client is a **React SPA** built with **TypeScript** and **Vite**. It heavily utilizes **Tailwind CSS** for styling, with custom color definitions and responsive breakpoints (`xs`, `sm2`, `grid1`, etc.).

**Key Frontend Technologies & Patterns:**
*   **State Management:** Uses **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`) for global state, specifically a `userSlices.ts`.
*   **Data Fetching/Caching:** Leverages **TanStack Query** (`@tanstack/react-query`) for server state management and data fetching, including devtools.
*   **UI/Components:** A large set of custom components built using **Radix UI** primitives (e.g., `accordion`, `dialog`, `dropdown-menu`) styled via Tailwind CSS (using `class-variance-authority` and `tailwind-merge`). It also uses **`embla-carousel-react`** and **`react-slick`** for carousels.
*   **Routing:** Uses **React Router DOM** (`react-router-dom`).
*   **Internationalization (i18n):** Implemented with **`i18next`** and **`react-i18next`**, loading translations from `public/locales`.
*   **Authentication:** Uses **`js-cookie`** for token management and **`@react-oauth/google`** for Google Sign-In integration.
*   **Mapping:** Integrates **`@vis.gl/react-google-maps`**.
*   **Testing:** Includes a Python-based E2E testing setup using **`pytest`** (`Client/tests/test_e2e.py`).

### Server Analysis Summary (Backend)
The backend is a **Node.js/Express** server written in **TypeScript**, designed for scalability and external service integration.

**Key Backend Technologies & Patterns:**
*   **Database:** **MongoDB** via **Mongoose**. The `User` model uses a custom post-save hook (`UserSchema.post('findOneAndUpdate', ...)`) to limit the size of `search` and `interested` arrays to 10 entries.
*   **Caching:** Implements **Redis** (`redis` client) for caching search results, controlled by an environment variable (`USE_CACHE`). It uses `setCache` and `getCache` functions, and flushes the cache on booking creation.
*   **Authentication:** Uses **JWT** stored in an **HTTP-only cookie** (`token`) for session management, protected by `authMiddleware.ts`. It also integrates **Google OAuth 2.0** via **Passport** and `express-session`.
*   **Payments:** Integrates **Stripe** for payment processing, with a dedicated utility for creating Payment Intents.
*   **Scheduling/Transactions:** Uses **`node-cron`** to schedule a job that checks for expired "on going" bookings every minute, automatically un-reserving rooms via `unTakeAvailableRooms` and deleting the booking record.
*   **Search Logic:** The property search endpoint (`POST /api/property`) is highly complex, featuring:
    *   **Streaming Response:** Uses `res.setHeader('Transfer-Encoding', 'chunked')`, `res.write()`, and `res.flush()` to stream results, sending initial properties first, and then sending filter counts later in a separate chunk.
    *   **Geospatial Search:** Uses MongoDB's `$near` operator for radius-based searching.
    *   **Dynamic Filtering:** Implements primary filtering (location, dates, guests) and secondary filtering (type, price, facilities, etc.).
    *   **Availability Check:** Uses a custom function (`getAvailability`) that checks room availability across a date range, supporting flexible date inputs (specific dates, weekends, or fixed-length stays with day-of-week constraints).
    *   **Room Combination Optimization:** Employs a **Dynamic Programming (DP)** approach (`findBestRoomCombinationDP`) to find the optimal combination of available rooms that meets the guest and room count requirements while minimizing "wasted space" (excess capacity).

---

# BookingClone

> A full-stack clone of a major online travel agency (OTA) featuring complex search logic, user personalization, and integrated payment/authentication systems.

## Project Overview
- **Type**: Full-stack App
- **Purpose**: To replicate the core functionality of an OTA, allowing users to search for properties based on complex criteria (dates, guests, preferences), view detailed property information, manage bookings, and handle user accounts/preferences.
- **Scale**: Features multiple complex API endpoints (Search, Booking, User Profile), numerous data models (User, Property, Room, Booking, Review), and extensive UI components.
- **Monorepo?**: Yes, structured as separate `Client` and `Server` directories.

## Technology Stack

### Frontend
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | React | Latest version inferred from dependencies |
| Build Tool | Vite | `vite` |
| Styling | Tailwind CSS | Custom configuration with many utility classes and breakpoints |
| State Management | Redux Toolkit | Used for user state (`userSlices.ts`) |
| Routing | React Router DOM | `react-router-dom` v7.1.1 |
| Forms / Validation | Not explicitly clear, likely custom/built-in | Uses various Radix components for input control |
| HTTP Client | Axios | `axios` |
| UI Component Library | Custom (Radix UI + Tailwind) | Heavily relies on `@radix-ui/*` packages |
| Internationalization | i18next | `i18next`, `react-i18next`, `i18next-http-backend` |
| Animation | Embla Carousel, Slick Carousel | `embla-carousel-react`, `react-slick` |
| Other | TanStack Query, Google OAuth | For data fetching/caching and social login |

### Backend
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Node.js | `ts-node-dev` for development |
| Framework | Express | `express` |
| Database | MongoDB | Mongoose ODM |
| ORM / ODM | Mongoose | Used for all data modeling |
| Authentication | JWT, Passport/Google OAuth | JWT in HTTP-only cookies, Passport for Google Sign-In |
| Caching | Redis | Used for search result caching via `redis` client |
| Payment | Stripe | Integration via `stripe` SDK for Payment Intents |
| File Upload | Not confirmed in source | |
| Email | Nodemailer | Used for verification codes |
| Other | node-cron, TypeScript | For scheduled tasks and strong typing |

## Full Dependency List

### Frontend Dependencies
#### Production
- **@radix-ui/react-accordion**: Accessible UI primitives.
- **@radix-ui/react-avatar**: UI primitive for user avatars.
- **@radix-ui/react-checkbox**: UI primitive for checkboxes.
- **@radix-ui/react-collapsible**: UI primitive for collapsible content.
- **@radix-ui/react-dialog**: UI primitive for modal dialogs.
- **@radix-ui/react-dropdown-menu**: UI primitive for dropdown menus.
- **@radix-ui/react-hover-card**: UI primitive for hover cards.
- **@radix-ui/react-label**: UI primitive for form labels.
- **@radix-ui/react-navigation-menu**: UI primitive for navigation menus.
- **@radix-ui/react-popover**: UI primitive for popovers.
- **@radix-ui/react-progress**: UI primitive for progress bars.
- **@radix-ui/react-radio-group**: UI primitive for radio groups.
- **@radix-ui/react-scroll-area**: UI primitive for scrollable areas.
- **@radix-ui/react-select**: UI primitive for select inputs.
- **@radix-ui/react-separator**: UI primitive for visual separators.
- **@radix-ui/react-slider**: UI primitive for sliders.
- **@radix-ui/react-slot**: UI primitive for composing components.
- **@radix-ui/react-switch**: UI primitive for switches.
- **@radix-ui/react-tabs**: UI primitive for tabs.
- **@radix-ui/react-toast**: UI primitive for toast notifications.
- **@radix-ui/react-tooltip**: UI primitive for tooltips.
- **@react-oauth/google**: Integration for Google Sign-In.
- **@reduxjs/toolkit**: Redux state management library.
- **@stripe/react-stripe-js**: React components for Stripe.
- **@stripe/stripe-js**: Stripe.js wrapper.
- **@tanstack/react-query**: Data fetching and state management.
- **@tanstack/react-query-devtools**: Debugging tools for React Query.
- **@vis.gl/react-google-maps**: React wrapper for Google Maps Platform.
- **axios**: HTTP client.
- **class-variance-authority**: Utility for defining constrained variants.
- **clsx**: Utility for conditionally joining classNames.
- **cmdk**: Command palette component.
- **date-fns**: Date utility library.
- **embla-carousel-react**: Touch-friendly carousel library.
- **i18next**: Internationalization framework.
- **i18next-browser-languagedetector**: Language detection for i18next.
- **i18next-http-backend**: Backend for loading translations.
- **input-otp**: Component for OTP input.
- **js-cookie**: Utility for reading/writing cookies.
- **lucide-react**: Icon library.
- **react**: Core React library.
- **react-day-picker**: Date picker component.
- **react-dom**: React DOM.
- **react-i18next**: React bindings for i18next.
- **react-icons**: Icon library.
- **react-redux**: React bindings for Redux.
- **react-router-dom**: Client-side routing.
- **react-slick**: Carousel component.
- **react-slider**: Slider component.
- **slick-carousel**: Core dependency for react-slick.
- **tailwind-merge**: Utility for merging Tailwind classes.
- **tailwindcss-animate**: Plugin for Tailwind animations.
- **vaul**: Component library for building accessible drawers/sheets.

#### Dev Dependencies
- **@eslint/js**: ESLint parser/plugin.
- **@types/google.maps**: TypeScript definitions for Google Maps.
- **@types/js-cookie**: TypeScript definitions for js-cookie.
- **@types/node**: TypeScript definitions for Node.js.
- **@types/react**: TypeScript definitions for React.
- **@types/react-dom**: TypeScript definitions for React DOM.
- **@types/react-redux**: TypeScript definitions for React-Redux.
- **@types/react-router-dom**: TypeScript definitions for React Router.
- **@types/react-slick**: TypeScript definitions for react-slick.
- **@vitejs/plugin-react**: Vite plugin for React.
- **autoprefixer**: PostCSS plugin for Tailwind.
- **eslint**: Linter.
- **eslint-plugin-react-hooks**: ESLint plugin for React Hooks rules.
- **eslint-plugin-react-refresh**: ESLint plugin for React refresh.
- **globals**: ESLint environment definitions.
- **postcss**: PostCSS tool for transforming CSS.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Language.
- **typescript-eslint**: ESLint parser for TypeScript.
- **vite**: Build tool.

### Backend Dependencies
#### Production
- **axios**: HTTP client for external requests.
- **bcrypt**: Password hashing utility.
- **cookie-parser**: Middleware to parse cookies.
- **cors**: Middleware for Cross-Origin Resource Sharing.
- **crypto**: Built-in Node.js module for cryptography.
- **dotenv**: To load environment variables from `.env` files.
- **express**: Web application framework.
- **express-session**: Middleware for session management.
- **google-auth-library**: For Google authentication logic.
- **jsonwebtoken**: For creating and verifying JWTs.
- **mongodb**: Native MongoDB driver.
- **mongoose**: ODM for MongoDB.
- **node-cron**: For scheduling recurring tasks (e.g., cleaning up expired bookings).
- **nodemailer**: For sending emails (verification codes).
- **passport**: Authentication middleware.
- **passport-google-oauth20**: Strategy for Google OAuth.
- **redis**: Client for connecting to Redis.
- **stripe**: Payment processing library.
- **tsconfig-paths**: Utility for resolving paths in TypeScript.

#### Dev Dependencies
- **@types/bcrypt**: TypeScript definitions for bcrypt.
- **@types/cookie-parser**: TypeScript definitions for cookie-parser.
- **@types/cors**: TypeScript definitions for cors.
- **@types/dotenv**: TypeScript definitions for dotenv.
- **@types/express**: TypeScript definitions for Express.
- **@types/express-session**: TypeScript definitions for express-session.
- **@types/ioredis**: TypeScript definitions for Redis client (though the project uses the native `redis` package).
- **@types/jsonwebtoken**: TypeScript definitions for JWT.
- **@types/mongoose**: TypeScript definitions for Mongoose.
- **@types/node**: TypeScript definitions for Node.js.
- **@types/node-cron**: TypeScript definitions for node-cron.
- **@types/nodemailer**: TypeScript definitions for nodemailer.
- **@types/passport**: TypeScript definitions for Passport.
- **@types/passport-google-oauth20**: TypeScript definitions for Passport Google OAuth.
- **@types/stripe**: TypeScript definitions for Stripe.
- **ts-node**: To run TypeScript files directly.
- **typescript**: Language.

## Architecture & Project Structure
The architecture is a classic **Client-Server separation**, with the backend following a **Controller-Service-Model** pattern layered over Express, and the frontend being a **Component-based SPA**.

**Key Directories and Responsibilities:**
*   **`Client/src`**: Contains all frontend source code.
    *   **`pages`**: Top-level routes/views (e.g., `Home.tsx`, `Property.tsx`, `Account.tsx`).
    *   **`components/ui`**: Reusable, generic UI components, mostly wrappers around Radix UI primitives.
    *   **`components`**: Feature-specific components (e.g., `MainCard`, `Search`).
    *   **`store`**: Redux logic.
    *   **`utils/api`**: API service layer using Axios/TanStack Query hooks.
*   **`Server/src`**: Contains all backend source code.
    *   **`models`**: Mongoose schemas (`userModel.ts`, `propertyModel.ts`, etc.).
    *   **`controllers`**: Business logic handlers for routes.
    *   **`routes`**: Defines API endpoints.
    *   **`middleware`**: Cross-cutting concerns like `authMiddleware.ts`.
    *   **`utils`**: Helper functions, including integrations for `stripe`, `redisClient`, and `maps`.

**Data Flow Overview:**
1.  **Client Search:** User interacts with components (`Search.tsx`), which triggers an API call to `POST /api/property`.
2.  **Server Search:** The controller (`getSearchProperties`) checks Redis cache first. If a miss, it queries MongoDB using geospatial indexing (`$near`) and then applies complex availability and preference filtering. It streams results back to the client.
3.  **Booking:** A user submits booking details to `POST /api/booking/create`. The server validates availability, *takes* the rooms in the `Room` model (decrementing available count), creates a `Booking` record, and sets the status to "on going".
4.  **Authentication:** User signs in via Google or email code, receives a JWT, which is stored in an **HTTP-only cookie** for subsequent requests.

**Notable Structural Decisions:**
*   **TypeScript Everywhere:** Both client and server are strongly typed, enhancing maintainability.
*   **Separation of Concerns:** Clear separation between API calls (`utils/api`), state management (`store`), and UI (`components`).
*   **Complex Search Implementation:** The server's search logic is decoupled into primary (location/date/guest) and secondary (amenity/price) filters, with availability checks integrated directly into the primary filter stage.

## Core Features & Business Logic

1.  **Complex Property Search & Filtering:**
    *   **Implementation:** `Server/src/controllers/propertyController.ts` (`getSearchProperties`).
    *   **Details:** Supports searching by location radius, date ranges, guest counts, and complex secondary filters (price range, amenities, room features). It uses a DP algorithm (`findBestRoomCombinationDP`) to ensure the requested number of rooms/guests can be accommodated across available room types.
2.  **Real-Time Availability Management:**
    *   **Implementation:** `Server/src/models/roomModel.ts` (via controller helpers `takeAvailableRooms` and `unTakeAvailableRooms`).
    *   **Details:** Room availability is tracked day-by-day in the `Room` model's `available` array. When a booking is created, rooms are "taken" (count decremented); when a booking is cancelled or expires, they are "un-taken" (count incremented).
3.  **User Personalization & History:**
    *   **Implementation:** `Server/src/models/userModel.ts` and `Client/src/pages/Home.tsx`.
    *   **Details:** Users' last 10 searches and interested properties are stored directly on the `User` document, which is then displayed on the homepage via the `mapUserSearches` function.
4.  **Scheduled Booking Expiration:**
    *   **Implementation:** `Server/src/models/bookingModel.ts` using `node-cron`.
    *   **Details:** A cron job runs every minute to find bookings older than 15 minutes with status "on going". It automatically calls `unTakeAvailableRooms` to release the inventory before deleting the booking record.
5.  **Streaming Search Results:**
    *   **Implementation:** `Server/src/controllers/propertyController.ts` using `res.write()` and `res.flush()`.
    *   **Details:** The server sends the initial list of properties immediately, and then, in a subsequent `process.nextTick`, sends the calculated filter counts, allowing the client to render results faster.

## Impressive Patterns & Best Practices
*   **Dynamic Programming for Optimization:** The use of DP (`findBestRoomCombinationDP`) to solve the **Knapsack-like problem** of fitting guests into the minimum number of rooms while respecting availability constraints is a significant engineering achievement for an OTA search engine.
*   **Search Result Streaming:** Implementing chunked responses (`res.write`, `res.flush`) to stream property results before calculating and sending filter metadata demonstrates a focus on perceived performance.
*   **Time-Based Inventory Locking:** The combination of an "on going" booking status and a `node-cron` job to automatically release inventory after a timeout (15 minutes) provides a robust, self-healing mechanism for temporary holds.
*   **Geospatial Indexing:** Utilizing MongoDB's geospatial queries (`$near`) for efficient radius-based property lookups.
*   **Type Safety:** Extensive use of TypeScript across the entire stack, including custom types for API requests/responses (`AuthenticatedRequest`, `TBookingStringified`).
*   **Custom Tailwind Configuration:** Extensive customization of `tailwind.config.js` to include specific colors (e.g., `deals`, `rating`, `guinesBlue`) and custom screen sizes tailored to the application's layout needs.

## Testing & Quality
- **Test framework(s) used**: **Jest/Vitest** (inferred from client dev dependencies like `eslint-plugin-react-refresh`) and **Pytest** (explicitly called in `Client/package.json` and present in `Client/tests/`).
- **Types of tests present**: Unit/Integration tests are implied by the structure, but **E2E tests** are explicitly present using Python's `pytest` framework (`Server/tests/test_api/` and `Client/tests/`).
- **Linting / formatting tools**: **ESLint** (`eslint`) and **Prettier** (inferred from standard setup, though not explicitly listed in dependencies, ESLint config is present).

## DevOps & Infrastructure
- **Docker / containerization**: A **`Dockerfile`** is present in the `Server` directory, indicating containerization readiness for the backend.
- **CI/CD pipelines**: Not explicitly detailed (no `.github/workflows` visible), but the presence of a `Dockerfile` and test scripts suggests a CI/CD process is intended.
- **Environment configuration**: Uses **`.env`** files, loaded via `dotenv` in the server's `app.ts`. Configuration for Redis connection (`REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`) and secrets (`JWT_SECRET_KEY`, `STRIPE_SECRET_KEY`) is managed via environment variables.
- **Scripts in package.json worth noting**:
    *   **Server `dev`**: Uses `ts-node-dev` for fast, hot-reloading TypeScript server development.
    *   **Server `test`**: Runs `pytest` with Allure reporting integration (`allure serve allure-results`).
    *   **Client `test:run`**: Executes Python `pytest` against the client, suggesting some form of end-to-end testing framework interaction between the client and server during testing.

## Security Practices
- **Authentication & Authorization**: Implemented via **JWT** stored in **HTTP-only cookies** (`authenticateToken` middleware). Authorization checks are performed on protected routes (e.g., `/api/users/edit-profile`).
- **Input Validation & Sanitization**: Basic validation is present in controllers (checking for required fields). Mongoose schemas enforce data types and enums.
- **Secrets Management**: Secrets like `JWT_SECRET_KEY` and `STRIPE_SECRET_KEY` are loaded from environment variables, implying external secret management (e.g., Vercel secrets).
- **CORS Configuration**: Strict CORS policy in `Server/src/app.ts` explicitly lists allowed origins, including Vercel deployments, and enforces `credentials: true`.
- **Password Handling**: Passwords are not stored in plain text; the `UserSchema` implies hashing is used (though the hashing logic itself is not in the retrieved files, `bcrypt` is a dependency).

## Portfolio-Ready Highlights
*   Engineered a high-performance, complex property search API using **MongoDB Geospatial Queries** and **streaming responses** to deliver results and filter metadata asynchronously.
*   Developed and implemented a **Dynamic Programming algorithm** to solve the NP-hard-like problem of optimally allocating guests to available rooms based on complex constraints (room type, capacity, availability).
*   Architected a robust, self-healing **inventory reservation system** using Mongoose models and **`node-cron`** to automatically release room inventory from expired, unconfirmed bookings.
*   Built a full-stack application using **TypeScript** end-to-end (React/Vite client and Node/Express server), integrating **Stripe** for payments and **Redis** for distributed caching of search results.
*   Implemented secure user authentication using **JWTs stored in HTTP-only cookies** and integrated **Google OAuth 2.0** via Passport.