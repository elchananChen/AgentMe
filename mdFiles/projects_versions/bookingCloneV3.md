The repository analysis indicates a full-stack application designed to clone the functionality of a major online travel agency (OTA), likely focused on property/hotel bookings. The architecture is clearly split into a `Client` (Frontend) and a `Server` (Backend).

The project scale appears significant, given the large number of component files in the client and the extensive set of models, controllers, and routes in the server, suggesting a comprehensive feature set covering search, property details, user accounts, bookings, and payments.

## Project Structure Assessment
The project is a **Monorepo** structure containing two main directories: `Client` and `Server`.

1.  **`Client` (Frontend)**: A modern Single Page Application (SPA) built with React and TypeScript, utilizing Vite as the build tool. It heavily relies on component-based architecture, state management (Redux Toolkit), routing (`react-router-dom`), and styling via Tailwind CSS.
2.  **`Server` (Backend)**: A Node.js/Express application, also using TypeScript, serving as a RESTful API. It connects to MongoDB for persistence and uses Redis for caching. It implements complex features like user authentication (including Google OAuth), Stripe payments, and booking management.

The next step is to analyze the dependencies and then dive into the core modules of both the client and server to understand the implementation details.

## Technology Stack

### Frontend
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | React | v18.3.1 |
| Build Tool | Vite | |
| Styling | Tailwind CSS | Used with `class-variance-authority` and `tailwind-merge` for utility-first styling. |
| State Management | Redux Toolkit | Used via `react-redux`. |
| Routing | React Router | `react-router-dom` v7.1.1 |
| HTTP Client | Axios | |
| UI Component Library | Custom / Radix UI | Heavily uses components from `@radix-ui/react-*` (e.g., Dialog, DropdownMenu, Toast) and custom wrappers (`Client/src/components/ui`). |
| Forms / Validation | Not explicitly clear | Logic likely embedded in components or custom hooks. |
| Internationalization | i18next | Configured via `Client/src/i18n.ts`. |
| Data Fetching | React Query | `@tanstack/react-query` for server state management. |
| Mapping | Google Maps | `@vis.gl/react-google-maps`. |
| Testing | Python/Pytest | E2E tests written in Python (`Client/tests/test_e2e.py`). |

### Backend
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Node.js | |
| Framework | Express | |
| Database | MongoDB | Connected via Mongoose. |
| Caching | Redis | Implemented via `ioredis` (`redis` package). |
| Authentication | Passport.js | Configured for Google OAuth (`passport-google-oauth20`). Uses JWTs (implied by auth utilities). |
| Payments | Stripe | Integrated via the official `stripe` SDK. |
| Session Mgmt | Express Session | Used alongside Passport for session handling. |
| Task Scheduling | node-cron | Used for background tasks (e.g., cleanup, notifications). |
| Deployment | Docker | A `Dockerfile` is present in the Server directory. |

## Full Dependency List

### Frontend Dependencies
#### Production
- **@radix-ui/\***: Collection of unstyled, accessible UI primitives (Accordion, Avatar, Checkbox, etc.).
- **@react-oauth/google**: Integration for Google Sign-In.
- **@reduxjs/toolkit**: State management library.
- **@stripe/react-stripe-js**: React components for Stripe integration.
- **@stripe/stripe-js**: Stripe JS SDK wrapper.
- **@tanstack/react-query**: Declarative data fetching and caching.
- **@tanstack/react-query-devtools**: Debugging tools for React Query.
- **@vis.gl/react-google-maps**: React wrapper for Google Maps Platform.
- **axios**: Promise-based HTTP client.
- **class-variance-authority**: Utility for defining constrained variants for components.
- **clsx**: Utility for conditionally joining class names.
- **cmdk**: Command palette component library.
- **date-fns**: Date utility library.
- **embla-carousel-react**: Carousel component library.
- **i18next**: Internationalization framework.
- **i18next-browser-languagedetector**: Language detection for i18next.
- **i18next-http-backend**: Backend for loading translations via HTTP.
- **input-otp**: Component for handling OTP input.
- **js-cookie**: Utility for reading/writing browser cookies.
- **lucide-react**: Icon library.
- **react**: Core React library.
- **react-day-picker**: Component for date selection.
- **react-dom**: React DOM bindings.
- **react-i18next**: React bindings for i18next.
- **react-icons**: Library for using various icon sets.
- **react-redux**: React bindings for Redux.
- **react-router-dom**: Declarative routing for React.
- **react-slick**: Responsive carousel component.
- **react-slider**: Component for range sliders.
- **slick-carousel**: Core dependency for the carousel.
- **tailwind-merge**: Utility to merge Tailwind classes intelligently.
- **tailwindcss-animate**: Integration for animations with Tailwind.
- **vaul**: Library for building accessible drawers and dialogs.

#### Dev Dependencies
- **@eslint/js**: ESLint core plugins.
- **@types/\***: TypeScript type definitions for various libraries (React, Redux, Node, etc.).
- **@vitejs/plugin-react**: Vite plugin for React.
- **autoprefixer**: PostCSS plugin to parse values and add vendor prefixes.
- **eslint**: Linter for JavaScript/TypeScript.
- **eslint-plugin-react-hooks**: ESLint plugin for React Hooks rules.
- **eslint-plugin-react-refresh**: ESLint plugin for React Fast Refresh.
- **globals**: Provides global variables definitions for ESLint.
- **postcss**: CSS post-processing framework.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: TypeScript compiler.
- **typescript-eslint**: ESLint parser for TypeScript.
- **vite**: Next-generation frontend tooling.

### Backend Dependencies
#### Production
- **@types/stripe**: TypeScript definitions for Stripe.
- **axios**: HTTP client for making external API calls (e.g., to Stripe or other services).
- **bcrypt**: Password hashing utility.
- **cookie-parser**: Middleware for parsing cookies.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **crypto**: Built-in Node.js module for cryptographic functions.
- **dotenv**: To load environment variables from `.env` file.
- **express**: Web application framework.
- **express-session**: Middleware for managing user sessions.
- **google-auth-library**: Library for authenticating Google users.
- **jsonwebtoken**: For creating and verifying JWTs (likely for session management or API tokens).
- **mongodb**: Native MongoDB driver.
- **mongoose**: ODM for MongoDB.
- **node-cron**: For scheduling recurring tasks.
- **nodemailer**: For sending emails (likely verification codes or confirmations).
- **passport**: Authentication middleware.
- **passport-google-oauth20**: Strategy for Google OAuth 2.0 authentication.
- **redis**: Client for connecting to Redis cache.
- **stripe**: Official Stripe SDK for payment processing.
- **tsconfig-paths**: Utility to resolve TypeScript paths during runtime.

#### Dev Dependencies
- **@types/\***: TypeScript type definitions for various Node/Express packages (bcrypt, cors, express, mongoose, etc.).
- **ts-node**: To execute TypeScript files directly.
- **typescript**: TypeScript compiler.

## Architecture & Project Structure

The architecture follows a standard **Client-Server separation**, with the backend adhering to a **Model-View-Controller (MVC)** pattern adapted for modern REST APIs, and the frontend using a **Component-Based Architecture** with centralized state management.

### Backend Structure (`Server/src`)
The backend is organized by domain/resource:
-   **`models`**: Contains Mongoose schemas (`userModel.ts`, `propertyModel.ts`, `bookingModel.ts`, etc.). This is the data layer.
-   **`controllers`**: Contains the business logic handlers for each route (`userController.ts`, `bookingController.ts`, etc.).
-   **`routes`**: Defines the API endpoints and maps them to the corresponding controllers (`userRoutes.ts`, `bookingRoutes.ts`, etc.).
-   **`middleware`**: Contains cross-cutting concerns like `authMiddleware.ts`.
-   **`utils`**: Houses external service integrations (`stripe.ts`, `redisClient.ts`, `auth.ts`) and helper structures.

**Data Flow Overview (Backend)**: Requests hit `app.ts`, are routed, pass through middleware (like authentication), hit the controller, which interacts with the Mongoose model (DB) or external services (Stripe/Redis), and returns a response.

### Frontend Structure (`Client/src`)
The frontend is organized around presentation and functionality:
-   **`pages`**: Top-level components representing routes (e.g., `Home.tsx`, `SearchResults.tsx`, `Booking.tsx`).
-   **`components`**: Reusable UI elements, heavily subdivided:
    -   Generic UI primitives (`Client/src/components/ui/`): Wrappers around Radix UI components.
    -   Feature-specific components (e.g., `booking/`, `search.tsx`).
-   **`store`**: Redux Toolkit setup (`userSlices.ts` for global user state).
-   **`utils/api`**: Dedicated API service layer using Axios for interacting with the backend endpoints (`propertyApi.ts`, `bookingApi.ts`).
-   **`hooks`**: Custom React hooks (`useInfiniteProperties.ts`).
-   **`i18n`**: Internationalization configuration.

**Data Flow Overview (Frontend)**: User interaction triggers state changes (Redux) or data fetching (React Query), which calls the API layer. The API layer uses Axios to call the backend. Results update the UI via React Query cache or Redux state.

## Core Features & Business Logic

1.  **Property Search & Discovery**:
    -   **Implementation**: Handled by `SearchResults.tsx` and likely `Client/src/utils/api/propertyApi.ts`. The presence of `useInfiniteProperties.ts` suggests implementation of **infinite scrolling** or **pagination** for large result sets.
    -   **Details**: The UI includes filtering components (`FilterSearchResult.tsx`, `FilterBadges.tsx`) and map integration (`CheckpointMap.tsx`).

2.  **Property Detail View**:
    -   **Implementation**: `Client/src/pages/Property.tsx` and numerous sub-components like `PropertyHighlight.tsx`, `GuestReviews.tsx`, and `RoomTypeDescription.tsx`.
    -   **Details**: Shows rich media (`ImagesProperty.tsx`), detailed features, house rules, and nearby locations.

3.  **User Authentication & Profile**:
    -   **Implementation**: Backend uses Passport with Google OAuth (`Server/src/auth/googleAuth.ts`). Frontend uses `@react-oauth/google` and manages user state via Redux (`userSlices.ts`).
    -   **Details**: Includes sign-in (`SignIn.tsx`), email verification (`EmailCode.tsx`), and account management pages (`MyAccountPage.tsx`, `MySettings.tsx`).

4.  **Booking Flow**:
    -   **Implementation**: A multi-step process managed by `Client/src/pages/Booking.tsx` and components like `BookingStepTwo.tsx` and `BookingStepThree.tsx`. Backend uses `bookingController.ts` and `bookingModel.ts`.
    -   **Details**: Involves selecting dates, room offers (`SelectOffer.tsx`), user details, and payment summary (`BookingPriceSummary.tsx`).

5.  **Payment Processing**:
    -   **Implementation**: Backend uses Stripe (`Server/src/utils/stripe.ts`, `paymentController.ts`). Frontend uses Stripe React components (`@stripe/react-stripe-js`).
    -   **Details**: The flow likely involves creating a payment intent on the server and confirming it on the client.

## Impressive Patterns & Best Practices

-   **Separation of Concerns (Frontend)**: Excellent separation between UI primitives (`Client/src/components/ui`), feature components (`Client/src/components/booking`), state management (`store`), and data fetching logic (`utils/api`).
-   **Server State Management**: Effective use of **React Query** (`@tanstack/react-query`) for handling asynchronous data fetching, caching, and synchronization, reducing boilerplate in components.
-   **Infinite Scrolling**: The custom hook `useInfiniteProperties.ts` strongly suggests an optimized approach to loading search results, improving perceived performance.
-   **Component Library Strategy**: The adoption of **Radix UI** primitives as a base for custom components (`Client/src/components/ui`) is a modern best practice, ensuring accessibility while allowing for complete visual customization via Tailwind CSS.
-   **Caching Layer**: The backend explicitly integrates **Redis** (`redisClient.ts`), indicating an awareness of performance bottlenecks and the need to cache frequently accessed, non-volatile data (like property listings or configuration).
-   **Security & Auth**: Implementation of session management (`express-session`) alongside Passport for Google OAuth, and the use of JWTs (implied by token usage in API calls) suggests a robust authentication strategy.
-   **Containerization**: The presence of a `Dockerfile` in the server root indicates readiness for containerized deployment (e.g., to Kubernetes or cloud services).
-   **i18n Support**: Full internationalization setup is present, supporting at least English (`en`) and Hebrew (`he`), demonstrating multi-lingual capability.

## Testing & Quality

-   **Backend Testing**: The server uses Python's **Pytest** (`Server/tests/test_api/`) for API integration testing, which is an unusual but valid choice for testing a Node.js API, suggesting the developer is proficient in Python for testing infrastructure. The test script also generates **Allure reports**.
-   **Frontend Testing**: The client has a dedicated `tests` directory with a `test_e2e.py` file, suggesting **End-to-End (E2E) testing** is performed using Python tools (likely Selenium or Playwright driven by Python).
-   **Linting/Formatting**: ESLint and Prettier are configured for the client project, ensuring code quality standards.

## DevOps & Infrastructure

-   **Containerization**: Server is Dockerized (`Server/Dockerfile`).
-   **CI/CD**: The client has a `vercel.json` file, indicating deployment to **Vercel**. The test script in the client (`"test:run": "cd tests && call venv\\Scripts\\activate && pytest ..."`) suggests a CI pipeline that executes Python-based tests against the built client.
-   **Environment Configuration**: Uses `dotenv` for configuration management.
-   **Deployment Scripts**: The server has `start` (production) and `dev` (hot-reloading via `ts-node-dev`) scripts.

## Security Practices

-   **Authentication**: Implements OAuth 2.0 via Google and uses sessions/cookies, secured with `cookie-parser` and configured `secure`/`sameSite` flags based on the environment (production vs. development).
-   **Authorization**: An `authMiddleware.ts` is present, which is crucial for protecting routes.
-   **CORS**: Strict CORS policy is implemented in `Server/src/app.ts`, explicitly allowing only known origins, which mitigates unauthorized cross-site requests.
-   **Input Validation/Sanitization**: Not explicitly confirmed in the core setup files, but likely handled within the controllers or Mongoose schemas.
-   **Secrets Management**: Relies on `.env` files, standard for development/initial deployment.

## Portfolio-Ready Highlights

-   Engineered a high-fidelity, full-stack booking platform clone using a modern **MERN/PERN-like stack (Node/Express/Mongo/React)**, demonstrating end-to-end development capability.
-   Architected a clear **Monorepo structure** separating concerns between a TypeScript/Vite frontend and a TypeScript/Express backend.
-   Implemented a robust, multi-layered data fetching strategy on the frontend utilizing **React Query** for server state and **Redux Toolkit** for global client state (User Profile).
-   Integrated **Stripe** for secure payment processing, handling both client-side tokenization and server-side intent management.
-   Achieved multi-lingual support (i18n) for at least two languages (EN/HE) using **i18next**.
-   Leveraged **Redis** for backend caching to optimize read performance for high-traffic data endpoints.
-   Established a comprehensive testing suite using **Pytest** for backend API integration tests and E2E testing, with results generated via **Allure Reports**.
-   Built a highly customizable and accessible UI layer by composing **Radix UI** primitives with **Tailwind CSS** utility classes.
-   Containerized the backend service using **Docker** for consistent deployment environments.