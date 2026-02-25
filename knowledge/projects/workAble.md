I have gathered sufficient information to construct the analysis. I will now generate the final report based on the file structure, package dependencies, and the code snippets reviewed from the client and server components. I noted the absence of `businessRoute.js` and `businessController.js`, which limits the analysis of the business logic side.

# workAble

> A full-stack application designed to connect users with businesses, likely featuring user authentication, business profiles, and a subscription/plan selection mechanism.

## Project Overview
- **Type**: Full-stack App (Client-Server architecture)
- **Purpose**: To provide a platform where users can sign up, select service plans (Standard, Gold, Platinum), and presumably interact with or subscribe to businesses listed on the platform. The sign-up flow explicitly separates "serious businessmen" from "important customers."
- **Scale**: Moderate. The structure suggests multiple user roles, business profiles with image galleries, services, and reviews. The client has a significant number of UI components (Radix/Shadcn based).
- **Monorepo?**: No. It is a standard client/server split with separate repositories/folders.

## Technology Stack

### Frontend
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | React | Version not explicitly found, but uses modern hooks and functional components. |
| Build Tool | Vite | Configured via `vite.config.ts`. |
| Styling | Tailwind CSS | Used extensively with `clsx` and `tailwind-merge` for utility class composition (`cn` function). |
| State Management | TanStack Query | Used for data fetching and caching (`useQuery`, `useMutation`). |
| Routing | React Router DOM | Used for navigation (`react-router-dom` v7.0.2). |
| Forms / Validation | React Hook Form, Zod | Used together with `zodResolver` for robust form handling and validation. |
| HTTP Client | Axios | Used for API communication (`axios` v1.7.9). |
| UI Component Library | Shadcn/ui | Heavily utilized, built on top of Radix UI primitives (e.g., `Button`, `Card`, `Input`, `Sheet`). |
| Internationalization | Not confirmed in source | |
| Animation | Not confirmed in source | Embla Carousel is present, suggesting image/content sliders. |
| Other | TypeScript | Used throughout the client (`tsconfig.json`). |

### Backend
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Node.js | Inferred from Express usage. |
| Framework | Express | Minimalist setup using `express`. |
| Database | MongoDB | Used via Mongoose ODM. |
| ORM / ODM | Mongoose | Used for defining schemas for `User` and `Business`. |
| Authentication | JWT, bcryptjs | JWT for token-based authentication; bcryptjs for password hashing. |
| Caching | Not confirmed in source | |
| Payment | Not confirmed in source | |
| File Upload | Not confirmed in source | `scrollImages` in `BusinessModel` suggests image handling, but the upload mechanism is not visible. |
| Email | Not confirmed in source | |
| Other | dotenv | For environment variable management. |

## Full Dependency List

### Frontend Dependencies
#### Production
- **@hookform/resolvers**: Integrates Zod schema validation with React Hook Form.
- **@radix-ui/react-aspect-ratio**: UI primitive for aspect ratio control.
- **@radix-ui/react-avatar**: UI primitive for user avatars.
- **@radix-ui/react-collapsible**: UI primitive for collapsible content.
- **@radix-ui/react-dialog**: UI primitive for modal dialogs.
- **@radix-ui/react-dropdown-menu**: UI primitive for dropdown menus.
- **@radix-ui/react-hover-card**: UI primitive for hoverable information cards.
- **@radix-ui/react-label**: UI primitive for form labels.
- **@radix-ui/react-radio-group**: UI primitive for radio groups.
- **@radix-ui/react-scroll-area**: UI primitive for scrollable areas.
- **@radix-ui/react-separator**: UI primitive for visual separators.
- **@radix-ui/react-slot**: UI primitive for slot component.
- **@radix-ui/react-tooltip**: UI primitive for tooltips.
- **@tanstack/react-query**: Library for server state management and caching.
- **@tanstack/react-query-devtools**: Developer tools for TanStack Query.
- **axios**: Promise-based HTTP client for making API requests.
- **class-variance-authority**: Utility for creating constrained style variants.
- **clsx**: Utility for conditionally joining class names.
- **embla-carousel-react**: Library for building touch-friendly carousels.
- **lucide-react**: Icon library.
- **react**: Core UI library.
- **react-dom**: DOM renderer for React.
- **react-hook-form**: Library for efficient form management.
- **react-router-dom**: Declarative routing for React applications.
- **tailwind-merge**: Utility to merge Tailwind CSS classes, resolving conflicts.
- **tailwindcss-animate**: Utility for applying animations via Tailwind CSS.
- **vaul**: Library for building accessible drawers/bottom sheets.
- **zod**: Schema declaration and validation library.

#### Dev Dependencies
- **@eslint/js**: ESLint parser/plugin for modern JavaScript.
- **@types/node**: TypeScript type definitions for Node.js.
- **@types/react**: TypeScript type definitions for React.
- **@types/react-dom**: TypeScript type definitions for React DOM.
- **@vitejs/plugin-react**: Vite plugin for React support.
- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint**: Pluggable JavaScript linter.
- **eslint-plugin-react-hooks**: ESLint plugin for enforcing React Hooks rules.
- **eslint-plugin-react-refresh**: ESLint plugin for React Fast Refresh.
- **globals**: Provides global variables definitions for ESLint.
- **postcss**: Tool for transforming CSS with JavaScript plugins.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Language for static type checking.
- **typescript-eslint**: ESLint parser for TypeScript.
- **vite**: Next-generation frontend tooling.

### Backend Dependencies
#### Production
- **axios**: HTTP client used, likely for internal service-to-service communication or external API calls.
- **bcryptjs**: Library for hashing passwords securely.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a `.env` file.
- **express**: Fast, unopinionated web framework for Node.js.
- **jsonwebtoken**: Library for creating and verifying JSON Web Tokens (JWT).
- **libphonenumber-js**: Library for phone number parsing, formatting, and validation.
- **mongoose**: MongoDB object modeling for Node.js.
- **morgan**: HTTP request logger middleware for Node.js.

#### Dev Dependencies
- **nodemon**: Tool that automatically restarts the Node.js server when file changes are detected (used in `start` script).

## Architecture & Project Structure
The application follows a classic **Client-Server** architecture.

**Client (React/Vite):**
- **Structure**: Feature-based organization within `src/` (e.g., `app/login`, `pages`, `components`, `hook`, `services`).
- **UI/UX**: Heavily relies on a component library built from Shadcn/ui primitives, suggesting a focus on modern, clean, and customizable UI.
- **Data Flow**: Uses TanStack Query for state management, abstracting API calls made via Axios instances (`api` for general, `apiToken` for authenticated).

**Server (Express/Mongoose):**
- **Structure**: Traditional MVC-like pattern: `routes` -> `controllers` -> `models`.
- **Entry Point**: `server/app.js` initializes Express, connects to MongoDB, sets up middleware (CORS, JSON parsing, Morgan), and mounts routes.
- **Data Flow**: Requests hit routes (e.g., `/api/user`), are validated by middleware, processed by controllers, which interact with Mongoose models to perform database operations.

**Notable Structural Decisions:**
1.  **Separation of Concerns in Auth:** Authentication logic (hashing, token creation) is centralized in `server/auth/auth.js`, which is then used by the controller.
2.  **Client-Side Auth Handling:** The client uses `document.cookie` to retrieve the JWT token for authenticated requests, suggesting the token is set as an HTTP-only cookie by the server, although the client-side cookie retrieval logic is slightly unusual for a standard JWT flow.
3.  **Business Model Rigidity:** The `BusinessModel` enforces that the `whyUs` array must contain exactly 3 items, indicating a strict requirement for this feature's content.

## Core Features & Business Logic

1.  **User Authentication & Sign-Up:**
    *   **Implementation**: Handled in `server/controllers/usersController.js` and `server/auth/auth.js`. Passwords are combined with `process.env.BCRYPT_KEY` before hashing with `bcrypt.hash`. Login compares the input password (also combined with the key) against the stored hash.
    *   **Client Flow**: The client's sign-up (`client/src/components/signUpForm/signUpForm.tsx`) features a multi-step process: role selection (Businessman vs. Customer), plan selection (Standard, Gold, Platinum), and finally, form submission using Zod/RHF.
    *   **Token Management**: Upon successful login, a JWT is created and set as a cookie (`httpOnly: false` in the server code, which is unusual for security).

2.  **User Data Retrieval:**
    *   **Implementation**: `server/controllers/usersController.js` provides an endpoint to fetch a user by ID. The password field is explicitly excluded (`select: false`) in the Mongoose schema (`server/models/usersModel.js`).
    *   **Client Hook**: `useAuth.ts` uses TanStack Query to fetch the current user based on an ID, with a long cache time (12 hours).

3.  **Business Profile Management (Partial View):**
    *   **Schema Definition**: `server/models/businessModel.js` defines a rich schema including `name`, `description`, `owner` (User reference), `scrollImages` (array of objects with URL and description), `services`, and a strictly enforced 3-item `whyUs` array.
    *   **Client Hook**: `useAddBusiness.ts` exists to handle the creation of a new business, including its associated image data.
    *   **Missing Logic**: The corresponding controller and route for business CRUD operations were not found in the file listing.

## Impressive Patterns & Best Practices
- **Utility Function Composition (`cn`)**: The client uses `clsx` and `tailwind-merge` via a `cn` utility (`client/src/lib/utils.ts`) to safely compose dynamic Tailwind CSS classes, a modern best practice for component libraries like Shadcn/ui.
- **Strict Schema Enforcement**: The Mongoose `BusinessModel` enforces a length constraint of exactly 3 items for the `whyUs` array using a custom validator, ensuring data integrity for a core feature.
- **Separation of Authentication Primitives**: The backend separates password hashing and token creation into a dedicated `auth.js` module, promoting reusability and testability of cryptographic operations.
- **Client-Side State Caching**: Extensive use of TanStack Query for managing server state, including custom hooks (`useSignUp`, `useLogIn`) that handle mutation side effects (like invalidating queries on success).
- **Progressive Disclosure in UI**: The sign-up form uses progressive disclosure, first asking the user's role, then their plan, before presenting the final input form, improving user experience for a complex registration.

## DevOps & Infrastructure
- **Containerization**: No `Dockerfile` or related infrastructure files were found in the root or client/server directories.
- **CI/CD pipelines**: No GitHub Actions or other CI/CD configuration files were found.
- **Environment Configuration**: Uses `dotenv` on the backend (`server/app.js`, `server/auth/auth.js`) to load secrets like `URI`, `JWT_KEY`, `BCRYPT_KEY`, and `SALT_NUM`. The client relies on environment variables injected during the Vite build process.
- **Scripts in package.json worth noting**:
    - **Client**: `dev` (runs Vite), `build` (compiles TypeScript then builds with Vite).
    - **Server**: `start` (runs `nodemon app.js` for development hot-reloading).

## Security Practices
- **Authentication & Authorization**: Implemented via JWTs. The server controller (`usersController.js`) uses a `verifyToken` middleware to protect routes (though the specific route protected by this middleware was not visible, it is defined).
- **Password Hashing**: Uses `bcryptjs` with a secret key (`process.env.BCRYPT_KEY`) and a salt factor (`process.env.SALT_NUM`) to secure stored passwords.
- **Input Validation**:
    - **Server**: A generic `validator.validateBody` middleware is present, though its implementation is basic (just checking for `req.body`).
    - **Client**: Robust validation is enforced client-side using Zod schemas before submission.
- **Cookie Security**: The JWT is set via `res.cookie`. Notably, `httpOnly: false` is set, which means the cookie is accessible via client-side JavaScript (`document.cookie`), posing a potential XSS risk if not handled carefully. `secure: false` is also set, meaning cookies are sent over HTTP in non-production environments.

## Portfolio-Ready Highlights
- Architected a full-stack application using a modern React/Vite frontend with a Node/Express backend, demonstrating proficiency in both environments.
- Implemented secure user authentication using JWTs and bcryptjs, centralizing cryptographic logic in a dedicated authentication module.
- Developed a complex, multi-step user registration flow with progressive disclosure, leveraging Zod and React Hook Form for robust client-side validation.
- Utilized TanStack Query for efficient server state management, including custom hooks for handling sign-up mutations and long-term data caching.
- Designed a flexible MongoDB schema for business profiles, enforcing data integrity with Mongoose custom validators (e.g., requiring exactly 3 "Why Us" points).
- Built a highly composable and maintainable UI layer using Tailwind CSS and Shadcn/ui components, utilizing utility functions for safe class merging.