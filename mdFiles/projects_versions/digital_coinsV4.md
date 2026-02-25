The repository `digital_coins` is a complex, multi-service application designed for monitoring cryptocurrency data across various exchanges. It features a clear separation of concerns between a mobile frontend, a primary Node.js/Express backend API, and a Python-based data scraping/monitoring service.

# digital_coins

> A multi-tiered application providing real-time cryptocurrency data aggregation from multiple exchanges via a dedicated mobile client, a central Node.js API, and a Python scraping backend.

## Project Overview
- **Type**: Full-stack Application (Mobile Client, REST API, Data Scraper)
- **Purpose**: To aggregate, process, and display cryptocurrency market data (specifically order books and potentially other metrics) from various exchanges (Binance, Bitstamp, Coinbase, Kraken, etc.) in a unified mobile interface.
- **Scale**: Medium-sized project with distinct client (React Native/Expo), API (Node.js/Express/TypeScript), and data processing (Python/Playwright/Beanie) layers. Involves multiple external API integrations and a custom data persistence layer.
- **Monorepo?**: Yes, structured as a monorepo with three main top-level directories: `client`, `server`, and `python_server`.

## Technology Stack

### Frontend (Client - React Native/Expo)
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | React Native / Expo | Expo SDK 53.0.9, Hermes engine |
| Build Tool | Expo CLI / Metro | |
| Styling | NativeWind (Tailwind CSS) | Used extensively via `nativewind` and `gluestack-ui` |
| State Management | Zustand | Used via `zustand` for global state |
| Routing | Expo Router | Used for navigation |
| Forms / Validation | Not explicitly clear, but uses standard RN components | |
| HTTP Client | Axios | Used for API communication |
| UI Component Library | Gluestack UI | Provides a comprehensive, themeable component set |
| Internationalization | i18next | Configured with English (`en.json`) and French (`fr.json`) locales |
| Animation | React Native Reanimated | Used for animations |
| Other | D3, React Native Gifted Charts | For data visualization |

### Backend (Server - Node.js/Express/TypeScript)
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Node.js | |
| Framework | Express | Standard REST API framework |
| Database | MongoDB | Implied by Mongoose usage |
| ORM / ODM | Mongoose | Used for data modeling and persistence |
| Authentication | Not explicitly clear from package.json | |
| Caching | Not explicitly clear from package.json | |
| Payment | Not present | |
| File Upload | Not present | |
| Email | Not present | |
| Other | TypeScript, Morgan, Node-Cron | For scheduling tasks |

### Data Scraper (Python Server)
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Python | Version 3.11+ implied by `pyproject.toml` |
| Framework | None explicit (Scripted) | Focuses on data acquisition |
| Database | MongoDB | Uses `Beanie` (Async ODM) and `Motor` (Async MongoDB driver) |
| Web Scraping | Playwright | Used for browser automation/data extraction |
| Data Handling | Pandas, Matplotlib | For data manipulation and potential graphing |
| Dependency Management | Poetry | Used for managing Python dependencies |

## Full Dependency List

### Frontend Dependencies
#### Production
- **@expo/html-elements**: Renders HTML elements in React Native.
- **@expo/vector-icons**: Provides access to icon sets.
- **@gluestack-ui/* (multiple)**: Core components for the UI library.
- **@legendapp/motion**: Animation library.
- **@react-native-async-storage/async-storage**: Persistent local storage.
- **@react-native-clipboard/clipboard**: Access to the system clipboard.
- **@react-native-community/datetimepicker**: Date/time picker component.
- **@react-native-picker/picker**: Picker component.
- **@react-navigation/native, @react-navigation/stack**: Navigation stack management.
- **@shopify/flash-list**: High-performance list component.
- **@tanstack/react-query**: Data fetching and state management for server state.
- **axios**: HTTP client for API calls.
- **babel-plugin-module-resolver**: Custom module resolution for Babel.
- **d3-scale, d3-shape**: Data visualization utilities.
- **date-fns**: Date utility library.
- **dotenv**: For loading environment variables.
- **expo**: Core Expo framework.
- **expo-camera, expo-image-manipulator, expo-linear-gradient, expo-localization, expo-location, expo-secure-store, expo-sqlite**: Various Expo native modules.
- **expo-router**: Navigation framework for Expo.
- **i18next, react-i18next**: Internationalization framework.
- **lucide-react-native**: Icon library.
- **nativewind**: Tailwind CSS utility-first styling for React Native.
- **react, react-dom**: Core React libraries.
- **react-native**: Core React Native library.
- **react-native-chart-kit, react-native-gifted-charts, react-native-wagmi-charts**: Charting libraries.
- **react-native-css-interop**: Interoperability layer for CSS.
- **react-native-dotenv**: For handling environment variables at build time.
- **react-native-gesture-handler, react-native-reanimated, react-native-safe-area-context, react-native-screens**: Core navigation and UI interaction libraries.
- **react-native-maps**: Mapping component.
- **react-native-paper**: Secondary UI component library (used alongside Gluestack).
- **react-native-svg**: SVG support.
- **react-native-touch-id**: Local authentication via biometrics.
- **react-native-vector-icons**: Icon library.
- **react-native-webview**: For embedding web content.
- **zustand**: Lightweight state management library.

#### Dev Dependencies
- **@babel/core**: Babel compiler core.
- **@types/***: TypeScript definitions for various packages.
- **@typescript-eslint/***: ESLint configuration and parser.
- **eslint, prettier**: Linting and code formatting tools.
- **jscodeshift**: Codemod tool.
- **prettier-plugin-tailwindcss**: Prettier plugin for Tailwind CSS.
- **tailwindcss**: CSS framework.
- **typescript**: Language compiler.

### Backend Dependencies
#### Production
- **@types/express, @types/morgan**: TypeScript definitions for Express and Morgan.
- **axios**: HTTP client for making external requests.
- **dotenv**: Environment variable management.
- **express**: Web application framework.
- **mongoose**: MongoDB Object Data Modeling (ODM).
- **morgan**: HTTP request logger middleware.
- **node-cron**: For scheduling tasks (e.g., data refresh).

#### Dev Dependencies
- **@types/jest**: Jest type definitions.
- **jest, ts-jest**: Testing framework and TypeScript integration.
- **tsx**: Tool for running TypeScript directly.
- **typescript**: Language compiler.

### Python Server Dependencies
#### Production
- **beanie**: Asynchronous MongoDB ODM built on Pydantic.
- **matplotlib**: Plotting library (likely for internal analysis/graphing).
- **motor**: Asynchronous MongoDB driver.
- **pandas**: Data manipulation and analysis library.
- **playwright**: Browser automation tool for scraping.
- **python-dotenv**: Environment variable management.
- **psutil**: Utility for accessing system utilization information.

#### Dev Dependencies
- **schedule**: Library for scheduling Python tasks.

## Architecture & Project Structure

The system employs a **Microservice-Oriented Architecture** pattern, distributing responsibilities across three distinct services:

1.  **Client (`client/`)**: A React Native application built with Expo, responsible for UI/UX, user interaction, and consuming the primary API.
2.  **API Gateway/Aggregator (`server/`)**: A TypeScript/Express service acting as the central hub. It handles client requests, likely aggregates data from the Python scraper or external sources, and manages data persistence via Mongoose/MongoDB.
3.  **Data Scraper/Processor (`python_server/`)**: A Python service using Poetry for dependency management. Its primary role is to interface with external cryptocurrency exchanges using **Playwright** for scraping/API calls and persisting the raw/processed data into MongoDB using **Beanie** and **Motor**.

**Key Directories and Responsibilities:**

*   **`client/screens/`**: Maps directly to the main navigation views (Binance, Bitstamp, Kraken, etc.).
*   **`client/components/ui/`**: Contains the custom, highly styled UI components built on Gluestack UI and NativeWind.
*   **`server/src/controllers/`**: Handles incoming HTTP requests and delegates logic to services.
*   **`server/src/services/`**: Contains the core business logic for data processing and aggregation before sending it to the client.
*   **`python_server/exchanges/`**: Contains specific scraping logic for each exchange (e.g., `binance.py`, `kraken.py`).
*   **`python_server/core/`**: Likely contains the core database interaction logic (`db.py`) and monitoring/scheduling logic (`monitor.py`).

**Data Flow Overview:**
1.  **Data Ingestion**: `python_server` uses Playwright to fetch/scrape data from external exchanges. It processes this data and saves it to MongoDB using Beanie/Motor.
2.  **Data Serving**: The `server` (Node.js) likely queries MongoDB (or perhaps the Python service via an internal endpoint) to retrieve the latest aggregated data. It exposes this data via REST endpoints (e.g., `/api/orderbook`).
3.  **Presentation**: The `client` uses TanStack Query to fetch data from the `server` API and renders it using Gluestack UI components, often visualizing it with charting libraries.

## Core Features & Business Logic

1.  **Multi-Exchange Data Aggregation**:
    *   **Implementation**: Handled by the `python_server` which has dedicated modules for Binance, Kraken, etc. The use of **Playwright** suggests a need to handle complex, potentially JavaScript-heavy, or non-standard REST APIs from exchanges.
    *   **Persistence**: Data is stored in MongoDB via the Beanie ODM.

2.  **Real-time/Near Real-time Order Book Display**:
    *   **Implementation**: The client has dedicated screens (`client/screens/Bitstamp.tsx`, etc.) and components (`client/components/OrderBook.tsx`, `client/components/BitstampBookOrder.tsx`) to display bid/ask data. The Node.js API exposes endpoints for this data, likely polled via TanStack Query.

3.  **Mobile UI/UX**:
    *   **Implementation**: Built entirely with **Expo** and **Gluestack UI**, leveraging **NativeWind** for utility-first styling. This suggests a focus on a modern, consistent, and themeable mobile interface.

4.  **Data Scheduling/Monitoring**:
    *   **Implementation**: The Python server uses `schedule` (dev dependency) and the Node.js server uses `node-cron` to manage when data fetching and processing tasks run. The Python service also includes `graphs/monitor_graph.py`, indicating internal performance or data quality monitoring.

## Impressive Patterns & Best Practices

-   **Technology Diversification for Specific Tasks**: The decision to use Python/Playwright for data scraping (where browser automation is often superior) and Node.js/TypeScript for the high-concurrency API layer demonstrates pragmatic technology selection based on task requirements.
-   **Asynchronous Data Layer (Python)**: Using **Beanie** and **Motor** in the Python service ensures that the data ingestion pipeline is non-blocking, which is crucial for continuous scraping operations.
-   **Modern Frontend Stack**: Heavy reliance on **Expo Router**, **Zustand**, **TanStack Query**, and **Gluestack UI** indicates a commitment to modern, performant, and maintainable React Native development practices.
-   **Type Safety**: Both the Node.js backend and the frontend are written in TypeScript, ensuring strong typing across the application boundary (though the Python service is separate).
-   **Component System**: The frontend utilizes a well-defined, modular component structure (`client/components/ui/`) built on top of Gluestack UI, promoting reusability.

## Testing & Quality

-   **Frontend**: Uses ESLint with the `universe/native` configuration and Prettier for formatting. No explicit test runner (like Jest/Vitest) is immediately visible in the top-level `client/package.json` scripts, though `jest` is a dev dependency in the `server`.
-   **Backend (Node.js)**: Explicitly configured for testing with **Jest** and **ts-jest**. Tests exist in `server/tests/`, including a test for a type guard (`bookOrderTypeGuard.test.ts`).
-   **Python Server**: Uses **Poetry** for dependency management, which aids in creating reproducible environments.

## DevOps & Infrastructure

-   **Containerization**: Not explicitly confirmed via Dockerfiles, but the structure is highly conducive to containerization.
-   **CI/CD**: The presence of `eas.json` in the client directory confirms the use of **Expo Application Services (EAS)** for building and deploying the mobile application.
-   **Scripts**: The `server` uses `tsx watch` for development, enabling hot-reloading/restarting of the TypeScript server. The client uses `DARK_MODE=media` in its start scripts, suggesting built-in support for system dark mode preference.
-   **Configuration**: Environment variables are managed via `.env` files, loaded by `dotenv` in both the Node.js and Python services.

## Security Practices

-   **Authentication**: The client has files related to local authentication (`expo-local-authentication`, `react-native-touch-id`) and secure storage (`expo-secure-store`), suggesting biometric or PIN protection for accessing sensitive data within the app (e.g., in `client/settings/securitySettings/PinSettingsScreen.tsx`).
-   **Input Validation**: The Node.js backend uses Mongoose schemas, which provide built-in validation. The Python scraper uses **Beanie**, which relies on **Pydantic** for data validation, ensuring data integrity upon ingestion.
-   **Data Security**: Use of `expo-secure-store` is a good practice for storing sensitive local credentials or tokens.

## Portfolio-Ready Highlights

-   Architected and implemented a three-tier cryptocurrency data platform spanning mobile (React Native/Expo), API (Node.js/Express), and data ingestion (Python/Playwright).
-   Engineered a robust, asynchronous data scraping pipeline using Python, Playwright, Beanie (Pydantic ODM), and Motor to reliably ingest data from complex exchange APIs into MongoDB.
-   Developed a modern mobile client using Expo Router, Gluestack UI, and NativeWind, achieving a consistent, themeable UI across platforms.
-   Integrated advanced state management using TanStack Query for efficient data fetching and caching on the client-side.
-   Implemented local security features on the mobile client, including PIN/Biometric authentication using `expo-local-authentication` and secure storage.
-   Established CI/CD workflows via Expo Application Services (EAS) for streamlined mobile deployment.