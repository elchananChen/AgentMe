# BookingClone

> A full-stack application cloning the core functionality of a major online travel agency (OTA) like Booking.com, featuring property search, detailed views, user accounts, and a multi-step booking/payment process.

## Project Overview
- **Type**: Full-stack App (Client/Server split)
- **Purpose**: To replicate the user experience of searching for accommodations, viewing property details, managing bookings, and completing secure payments, similar to a major hotel booking platform.
- **Scale**: The structure suggests a comprehensive application with dedicated modules for User Management, Property Listings, Reviews, and Bookings/Payments. The frontend has a large number of components, indicating many distinct UI elements and pages.
- **Monorepo?**: Yes, it is structured as a monorepo with distinct `Client` (Frontend) and `Server` (Backend) directories.

## Technology Stack

### Frontend
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | React | Used with Vite as the build tool. |
| Build Tool | Vite | Used for development and building the client application. |
| Styling | Tailwind CSS | Configuration files (`tailwind.config.js`, `postcss.config.js`) are present, used with `tailwindcss-animate`. |
| State Management | Redux Toolkit | Used via `@reduxjs/toolkit` and `react-redux`. |
| Query/Data Fetching | React Query | Used via `@tanstack/react-query` and `@tanstack/react-query-devtools`. |
| Routing | React Router DOM | Used for client-side navigation. |
| Forms / Validation | Not explicitly clear, but uses custom components and types. | |
| HTTP Client | Axios | Used for API communication (`axios`). |
| UI Component Library | Custom/Shadcn-like | Heavy use of components from `@radix-ui/*` and custom components built on top of them (e.g., `Client/src/components/ui`). |
| Internationalization | i18next | Configured for English ('en') and Hebrew ('he') with `i18next-http-backend`. |
| Other | Google OAuth | Integration via `@react-oauth/google`. |

### Backend
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Node.js | Inferred from `package.json` scripts (`ts-node`, `node dist/app.js`). |
| Framework | Express | Used as the primary web framework. |
| Database | MongoDB | Used via `mongoose`. |
| ORM / ODM | Mongoose | Used for schema definition and database interaction. |
| Authentication | JWT, Passport.js, Google OAuth | JWT for token-based auth, Passport.js for session management and Google OAuth strategy. |
| Caching | Redis | Used via `redis` client, configured in `Server/src/utils/redisClient.ts`. |
| Payment | Stripe | Integrated for payment processing via `stripe` SDK. |
| Other | Node-cron | Used for scheduled tasks (e.g., booking cleanup). |

## Full Dependency List

### Frontend Dependencies
#### Production
- **@radix-ui/react-accordion**: Headless component library for building accessible UI elements.
- **@radix-ui/react-avatar**: Headless component for displaying user avatars.
- **@radix-ui/react-checkbox**: Headless component for checkboxes.
- **@radix-ui/react-collapsible**: Headless component for collapsible content.
- **@radix-ui/react-dialog**: Headless component for modal dialogs.
- **@radix-ui/react-dropdown-menu**: Headless component for dropdown menus.
- **@radix-ui/react-hover-card**: Headless component for hoverable information cards.
- **@radix-ui/react-label**: Headless component for form labels.
- **@radix-ui/react-navigation-menu**: Headless component for navigation menus.
- **@radix-ui/react-popover**: Headless component for popovers.
- **@radix-ui/react-progress**: Headless component for progress bars.
- **@radix-ui/react-radio-group**: Headless component for radio groups.
- **@radix-ui/react-scroll-area**: Headless component for scrollable areas.
- **@radix-ui/react-select**: Headless component for custom select inputs.
- **@radix-ui/react-separator**: Headless component for visual separators.
- **@radix-ui/react-slider**: Headless component for sliders.
- **@radix-ui/react-slot**: Headless component for slot primitive.
- **@radix-ui/react-switch**: Headless component for toggles/switches.
- **@radix-ui/react-tabs**: Headless component for tabbed interfaces.
- **@radix-ui/react-toast**: Headless component for toast notifications.
- **@radix-ui/react-tooltip**: Headless component for tooltips.
- **@react-oauth/google**: Library for integrating Google Sign-In.
- **@reduxjs/toolkit**: Official library for efficient Redux state management.
- **@stripe/react-stripe-js**: React wrapper for Stripe Elements.
- **@stripe/stripe-js**: Stripe.js library for client-side Stripe interactions.
- **@tanstack/react-query**: Library for server state management (fetching, caching, synchronization).
- **@tanstack/react-query-devtools**: Development tools for React Query.
- **@vis.gl/react-google-maps**: React components for Google Maps Platform.
- **axios**: Promise-based HTTP client for making API requests.
- **class-variance-authority**: Utility for creating constrained style variants.
- **clsx**: Utility for constructing class names conditionally.
- **cmdk**: Command palette component library.
- **date-fns**: Utility library for date manipulation.
- **embla-carousel-react**: React component for building touch-friendly carousels.
- **i18next**: Internationalization framework.
- **i18next-browser-languagedetector**: Language detection for i18next.
- **i18next-http-backend**: Backend for loading translations over HTTP for i18next.
- **input-otp**: Component for handling OTP input.
- **js-cookie**: Simple JavaScript cookie reading/writing utility.
- **lucide-react**: Collection of lucid icons.
- **react**: Core UI library.
- **react-day-picker**: Component for date range selection.
- **react-dom**: React package for DOM manipulation.
- **react-i18next**: React bindings for i18next.
- **react-icons**: Collection of popular icon libraries.
- **react-redux**: React bindings for Redux.
- **react-router-dom**: Declarative routing for React.
- **react-slick**: React wrapper for the slick carousel.
- **react-slider**: Component for range sliders.
- **slick-carousel**: Core carousel library.
- **tailwind-merge**: Utility to merge Tailwind CSS classes intelligently.
- **tailwindcss-animate**: Plugin for Tailwind CSS animations.
- **vaul**: Library for building unstyled, accessible components (like drawers).

#### Dev Dependencies
- **@eslint/js**: ESLint parser/plugin.
- **@types/google.maps**: TypeScript definitions for Google Maps.
- **@types/js-cookie**: TypeScript definitions for js-cookie.
- **@types/node**: TypeScript definitions for Node.js.
- **@types/react**: TypeScript definitions for React.
- **@types/react-dom**: TypeScript definitions for React DOM.
- **@types/react-redux**: TypeScript definitions for React Redux.
- **@types/react-router-dom**: TypeScript definitions for React Router DOM.
- **@types/react-slick**: TypeScript definitions for react-slick.
- **@vitejs/plugin-react**: Vite plugin for React.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint**: JavaScript linter.
- **eslint-plugin-react-hooks**: ESLint plugin for React Hooks rules.
- **eslint-plugin-react-refresh**: ESLint plugin for React Fast Refresh.
- **globals**: Provides global variables definitions for ESLint.
- **postcss**: CSS post-processor.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Language for static typing.
- **typescript-eslint**: ESLint parser for TypeScript.
- **vite**: Next-generation frontend tooling.

### Backend Dependencies
#### Production
- **axios**: Promise-based HTTP client for making external API calls (e.g., to Google).
- **bcrypt**: Library for hashing passwords.
- **cookie-parser**: Middleware for parsing cookies.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **crypto**: Built-in Node.js module for cryptographic functions.
- **dotenv**: Module to load environment variables from a `.env` file.
- **express**: Fast, unopinionated web framework for Node.js.
- **express-session**: Middleware for managing user sessions.
- **google-auth-library**: Google's official client library for authentication.
- **jsonwebtoken**: Library for creating and verifying JSON Web Tokens (JWTs).
- **mongodb**: Official MongoDB driver.
- **mongoose**: ODM for MongoDB.
- **node-cron**: Utility for scheduling tasks in Node.js.
- **nodemailer**: Module for sending emails.
- **passport**: Authentication middleware for Node.js.
- **passport-google-oauth20**: Passport strategy for Google OAuth 2.0.
- **redis**: Node.js client for Redis.
- **stripe**: Official Node.js library for Stripe API.
- **tsconfig-paths**: Utility to resolve paths defined in `tsconfig.json`.

#### Dev Dependencies
- **@types/bcrypt**: TypeScript definitions for bcrypt.
- **@types/cookie-parser**: TypeScript definitions for cookie-parser.
- **@types/cors**: TypeScript definitions for cors.
- **@types/dotenv**: TypeScript definitions for dotenv.
- **@types/express**: TypeScript definitions for Express.
- **@types/express-session**: TypeScript definitions for express-session.
- **@types/ioredis**: TypeScript definitions for ioredis (though `redis` is used).
- **@types/jsonwebtoken**: TypeScript definitions for jsonwebtoken.
- **@types/mongoose**: TypeScript definitions for Mongoose.
- **@types/node**: TypeScript definitions for Node.js.
- **@types/node-cron**: TypeScript definitions for node-cron.
- **@types/nodemailer**: TypeScript definitions for nodemailer.
- **@types/passport**: TypeScript definitions for Passport.
- **@types/passport-google-oauth20**: TypeScript definitions for passport-google-oauth20.
- **ts-node**: TypeScript execution environment for Node.js.
- **typescript**: Language for static typing.

## Architecture & Project Structure
The project follows a clear **Client-Server architecture**, separated into two main directories: `Client` (React/Vite) and `Server` (Node.js/Express).

**Server Architecture:**
The backend appears to follow a **Controller-Service-Model** pattern, typical for Express applications:
- **Models (`Server/src/models`)**: Define Mongoose schemas (e.g., `userModel.ts`, `propertyModel.ts`, `bookingModel.ts`).
- **Controllers (`Server/src/controllers`)**: Handle request logic, interact with models/services, and send responses.
- **Routes (`Server/src/routes`)**: Map HTTP methods to controller functions.
- **Middleware (`Server/src/middleware`)**: Contains cross-cutting concerns like `authMiddleware.ts` for JWT verification.
- **Utils (`Server/src/utils`)**: Houses external integrations and shared logic, including Stripe integration (`stripe.ts`), Redis caching (`redisClient.ts`), and authentication helpers (`auth.ts`).

**Client Architecture:**
The frontend is a modern React application using **Vite** and **TypeScript**. It heavily leverages:
- **Component-based structure**: Components are organized logically (e.g., `ui`, `booking`, `components/property`).
- **State Management**: Uses **Redux Toolkit** (`Client/src/store`) for global state (like user info).
- **Data Fetching**: Uses **React Query** (`@tanstack/react-query`) for server state management, likely handling caching and background updates for property data.
- **Styling**: Utilizes **Tailwind CSS** for utility-first styling, often combined with Radix UI primitives.
- **Internationalization**: Implemented via **i18next** to support English and Hebrew.

## Core Features & Business Logic

1.  **User Authentication & Profile Management**:
    -   **Logic**: Implemented via JWTs (checked in `authMiddleware.ts`) and supports **Google OAuth 2.0** (`Server/src/auth/googleAuth.ts`). User data is managed in `Client/src/store/slices/userSlices.ts`.
    -   **Pages**: `SignIn.tsx`, `Account.tsx`, `MyAccountPage.tsx`, `MySettings.tsx`.

2.  **Property Search & Listing**:
    -   **Logic**: Handled by `propertyRoutes` and `propertyController.ts`. The client uses a custom hook `useInfiniteProperties.ts` suggesting implementation of **infinite scrolling** or **pagination** for search results (`SearchResults.tsx`).
    -   **UI**: Features complex filtering components (`FilterBadges.tsx`, `FilterSearchResult.tsx`) and map integration (`CheckpointMap.tsx` using `@vis.gl/react-google-maps`).

3.  **Property Detail View**:
    -   **Logic**: Fetches detailed property information, including rooms, features, and reviews.
    -   **UI**: Rich presentation using components like `PropertyHighlight.tsx`, `ImagesProperty.tsx`, `RoomTypeDescription.tsx`, and `GuestReviews.tsx`.

4.  **Booking & Reservation Flow**:
    -   **Logic**: A multi-step process managed by components like `BookingSteps.tsx`. It involves selecting dates, rooms, offers, and user details.
    -   **Pages/Components**: `Booking.tsx`, `BookingStepTwo.tsx`, `BookingStepThree.tsx`.

5.  **Payment Processing**:
    -   **Logic**: Integrates **Stripe** for secure payments. The backend uses `stripe.ts` to create Payment Intents, and the frontend uses `@stripe/react-stripe-js` for the client-side integration.
    -   **Backend**: Handled by `paymentRoutes` and `paymentController.ts`.

6.  **Caching Layer**:
    -   **Logic**: The server explicitly checks for `process.env.USE_CACHE` and calls `connectRedis()` in `app.ts`. Utility functions `setCache` and `getCache` in `redisClient.ts` are available for caching data, likely for frequently accessed property listings or user data.

## Impressive Patterns & Best Practices
- **Full-Stack Separation**: Clear separation of concerns between the React frontend and the Node/Express backend.
- **Modern Frontend Stack**: Utilization of **Vite**, **TypeScript**, **React Query**, and **Redux Toolkit** demonstrates a modern, performant approach to complex state management (server state vs. client state).
- **Component Library Strategy**: Heavy reliance on **Radix UI** primitives for building highly customized, accessible UI components (`Client/src/components/ui`), ensuring a consistent look and feel without being locked into a monolithic component library.
- **Internationalization**: Built-in support for at least two languages (EN/HE) using `i18next` and loading translations via HTTP backend, indicating attention to global reach.
- **Server-Side Caching**: Implementation of a **Redis** layer for caching data, which is crucial for performance in a high-read application like a booking platform.
- **Secure Authentication**: Combination of **JWT** for API authorization and **Passport.js/Google OAuth** for user sign-in.
- **Payment Integration**: Direct integration with **Stripe** for handling payment intents, suggesting secure handling of financial transactions.
- **Infinite Scrolling**: The presence of `useInfiniteProperties.ts` strongly suggests an implementation of infinite scrolling for search results, a key performance feature for large datasets.
- **Testing Strategy**: The presence of a `tests` directory with a Python script (`test_e2e.py`) and a script to generate an HTML report (`report.html`) suggests the use of **Pytest** for backend/API testing, possibly E2E tests, which is an interesting cross-language testing approach.

## Security Practices
- **Authentication & Authorization**: Uses **JWT** for session management, verified via `authenticateToken` middleware. Session management is also configured using `express-session`.
- **Third-Party Auth**: Implements **Google OAuth 2.0** for sign-in.
- **CORS Configuration**: Strict **CORS policy** in `Server/src/app.ts` explicitly lists allowed origins, preventing unauthorized cross-site requests. It also handles `OPTIONS` requests correctly.
- **Secret Management**: Relies on **environment variables** (`dotenv`) for secrets like `JWT_SECRET_KEY` and `STRIPE_SECRET_KEY`.
- **Password Security**: Uses **bcrypt** for password hashing on the backend.
- **Cookie Security**: Session cookies are configured with `secure: process.env.NODE_ENV === 'production'` and `sameSite: 'lax'` or `'none'` depending on the environment, indicating awareness of modern cookie security standards.

## DevOps & Infrastructure
- **Containerization**: A `Dockerfile` is present in the `Server` directory, indicating the backend is containerized, likely for deployment on platforms like Vercel or a custom container orchestration system.
- **Deployment Target**: The CORS configuration mentions Vercel URLs, suggesting deployment on **Vercel** for the frontend.
- **Development Scripts**: The server uses `ts-node-dev` for hot-reloading during development (`dev` script).
- **Testing Script**: The `test` script in the server uses `pytest` and generates **Allure reports**, indicating a structured approach to test reporting.

## Portfolio-Ready Highlights
- Designed and implemented a full-stack booking platform clone using a decoupled **React/Vite (Frontend)** and **Node/Express (Backend)** architecture.
- Integrated **Stripe** for secure payment processing, including server-side creation of Payment Intents.
- Implemented robust user authentication using **JWTs** and **Google OAuth 2.0**, secured by custom middleware.
- Achieved performance gains by integrating **Redis** for server-side data caching, with configuration for cache expiration.
- Developed a highly interactive frontend using **TypeScript**, **Tailwind CSS**, **Radix UI** primitives, and **React Query** for efficient data fetching and state synchronization.
- Implemented **Internationalization (i18n)** supporting English and Hebrew, loading translations dynamically via an HTTP backend.
- Utilized **infinite scrolling/pagination** logic for property search results, indicated by the custom `useInfiniteProperties` hook.
- Containerized the backend service using a **Dockerfile**, preparing for scalable deployment.