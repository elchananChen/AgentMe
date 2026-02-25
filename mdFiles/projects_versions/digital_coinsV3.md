The repository `digital_coins` is a complex, multi-service application designed for monitoring and analyzing cryptocurrency data across various exchanges. It is structured as a polyglot system, utilizing a TypeScript/Node.js backend, a Python scraping service, and a React Native/Expo frontend.

# digital_coins

> A polyglot system for real-time cryptocurrency order book monitoring and data aggregation across multiple exchanges, featuring a React Native mobile client and dedicated backend/scraping services.

## Project Overview
- **Type**: Full-stack Mobile Application (React Native) with Microservices (Node.js API, Python Scraper)
- **Purpose**: To aggregate, display, and potentially analyze real-time or near real-time order book data from major cryptocurrency exchanges (Binance, Kraken, Coinbase, etc.) in a unified mobile interface. It also appears to handle security features like PIN protection.
- **Scale**: Medium complexity, characterized by three distinct technology stacks and multiple data sources. The frontend has numerous UI components and screens for different exchanges.
- **Monorepo?**: Yes, structured as a monorepo containing three main projects: `client` (React Native), `server` (Node.js/Express API), and `python_server` (Python scraping/data processing).

## Technology Stack

### Frontend (Client - React Native/Expo)
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | React Native / Expo | Expo SDK 53.0.9, Hermes engine |
| Build Tool | Expo CLI / Metro | Managed workflow |
| Styling | NativeWind, Tailwind CSS | Utility-first styling |
| State Management | Zustand | Used via `zustand` package |
| Routing | Expo Router | Used for navigation |
| Forms / Validation | Not explicitly clear, but uses gluestack-ui components | |
| HTTP Client | Axios | Used for API communication |
| UI Component Library | gluestack-ui | Extensive use of custom components |
| Internationalization | i18next | Supports English (`en.json`) and French (`fr.json`) |
| Animation | react-native-reanimated | Used for animations |
| Other | d3-scale, d3-shape, react-native-chart-kit, react-native-wagmi-charts | Charting and data visualization libraries |

### Backend (Server - Node.js/Express)
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Node.js | TypeScript execution via `tsx` |
| Framework | Express | Standard REST API framework |
| Database | MongoDB | Implied by Mongoose usage |
| ORM / ODM | Mongoose | Used for data modeling |
| Authentication | Not explicitly clear, but client has PIN settings | |
| Caching | Not confirmed in source | |
| Payment | Not present | |
| File Upload | Not present | |
| Email | Not present | |
| Other | node-cron | For scheduled tasks |

### Data Scraping/Processing (Python Server)
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Python | Version 3.11+ implied by `pyproject.toml` |
| Framework | None explicit (likely FastAPI/Flask implied by structure) | Uses core Python modules |
| Database | MongoDB | Uses `beanie` (Async ODM) and `motor` (Async MongoDB driver) |
| Scraping Tool | Playwright | Used for browser automation/scraping |
| Data Analysis | Pandas, Matplotlib | Used for data manipulation and graphing |
| Dependency Management | Poetry | Used for package management |

## Full Dependency List

### Frontend Dependencies
#### Production
- **@expo/html-elements**: Rendering HTML elements in Expo.
- **@expo/vector-icons**: Icon library integration.
- **@gluestack-ui/* (multiple)**: Comprehensive UI component library.
- **@legendapp/motion**: Animation library.
- **@react-native-async-storage/async-storage**: Local persistent storage.
- **@react-native-clipboard/clipboard**: Accessing the device clipboard.
- **@react-native-community/datetimepicker**: Date/time picker component.
- **@react-native-picker/picker**: Picker component.
- **@react-navigation/native, @react-navigation/stack**: Navigation stack management.
- **@shopify/flash-list**: High-performance list component.
- **@tanstack/react-query**: Data fetching and state management for server state.
- **axios**: HTTP client for API calls.
- **babel-plugin-module-resolver**: Custom module resolution for Babel.
- **d3-scale, d3-shape**: Data-driven document design utilities (for charts).
- **date-fns**: Date utility library.
- **dotenv**: Environment variable loading.
- **expo (and related packages)**: Core Expo framework and modules (Camera, Localization, SecureStore, SQLite, etc.).
- **i18next, react-i18next**: Internationalization framework.
- **lucide-react-native**: Icon set.
- **nativewind**: Tailwind CSS implementation for React Native.
- **react, react-dom**: Core React libraries.
- **react-native**: Core React Native framework.
- **react-native-chart-kit, react-native-gifted-charts, react-native-wagmi-charts**: Charting libraries.
- **react-native-css-interop**: CSS-in-JS utility.
- **react-native-dotenv**: Handling environment variables at build time.
- **react-native-gesture-handler, react-native-reanimated**: Advanced gesture and animation handling.
- **react-native-maps**: Map integration.
- **react-native-paper**: Secondary UI component library (used alongside gluestack-ui).
- **react-native-safe-area-context, react-native-screens**: Navigation layout helpers.
- **react-native-svg**: SVG rendering support.
- **react-native-touch-id**: Local authentication via biometrics/PIN.
- **react-native-vector-icons**: Icon library.
- **react-native-webview**: Displaying web content within the app.
- **zustand**: Lightweight state management library.

#### Dev Dependencies
- **@babel/core**: Babel compiler core.
- **@react-native-community/cli**: React Native command-line interface.
- **@types/***: TypeScript definitions for various packages.
- **eslint, prettier**: Linting and code formatting tools, configured with `universe`.
- **jscodeshift**: Codemod tool.
- **typescript**: Language compiler.

### Backend Dependencies (Node.js/Express)
#### Production
- **@types/express, @types/morgan**: TypeScript definitions.
- **axios**: HTTP client for external API calls (likely to exchanges).
- **dotenv**: Environment variable management.
- **express**: Web framework.
- **mongoose**: MongoDB ODM.
- **morgan**: HTTP request logger.
- **node-cron**: Scheduling tasks (e.g., periodic data fetching).
- **tsx**: Tool for running TypeScript directly.

#### Dev Dependencies
- **@types/jest**: Jest testing definitions.
- **jest, ts-jest**: Testing framework and TypeScript integration.

### Python Server Dependencies
#### Production
- **playwright**: Headless browser automation for scraping.
- **beanie**: Asynchronous MongoDB ODM for Python.
- **motor**: Asynchronous MongoDB driver.
- **python-dotenv**: Environment variable loading.
- **psutil**: System and process utilities.
- **pandas, matplotlib**: Data analysis and plotting.

#### Dev Dependencies
- **schedule**: Simple task scheduling library.

## Architecture & Project Structure

The system follows a **Microservice Architecture** pattern, separating concerns into three distinct repositories/services:

1.  **Client (React Native/Expo)**: The presentation layer, responsible for UI, user interaction, local state management (Zustand), and data fetching (React Query) from the Node.js API. It handles platform-specific features like local authentication (PIN).
2.  **Server (Node.js/Express)**: The primary API gateway. It aggregates data, likely orchestrating calls to the Python scraping service or directly to exchange APIs, and persists/serves data via MongoDB (Mongoose). It uses TypeScript for strong typing.
3.  **Python Server**: A dedicated data ingestion and processing layer. It uses **Playwright** for sophisticated scraping, **Beanie/Motor** for asynchronous MongoDB interaction, and **Pandas/Matplotlib** for potential offline analysis or graph generation.

**Key Directories and Responsibilities:**

*   **Client**:
    *   `screens/`: Top-level navigation views (e.g., `Binance.tsx`, `Platforms.tsx`).
    *   `components/ui/`: Extensive library of custom, themeable components built on `gluestack-ui`.
    *   `api/`: Contains wrappers for external exchange APIs (e.g., `binanceApi.ts`).
    *   `context/`: Global state management (`dataStore.ts` using Zustand).
*   **Server**:
    *   `src/controllers/`: Handles incoming HTTP requests and delegates logic.
    *   `src/services/`: Contains core business logic (e.g., `orderBookService.ts`).
    *   `src/models/`: Mongoose schemas.
    *   `src/routs/`: Express route definitions.
*   **Python Server**:
    *   `exchanges/`: Contains specific scraping logic for each exchange (e.g., `binance.py`, `kraken.py`).
    *   `core/`: Contains database interaction logic (`db.py`, `models.py`) and monitoring logic (`monitor.py`).
    *   `graphs/`: Logic for generating charts (`monitor_graph.py`).

**Data Flow Overview:**
Mobile Client $\xrightarrow{\text{REST API Calls (Axios)}}$ Node.js Server $\xrightarrow{\text{Internal Request/DB Query}}$ MongoDB $\xleftarrow{\text{Async Scraping/Data Push}}$ Python Server.

## Core Features & Business Logic

1.  **Multi-Exchange Data Aggregation**:
    *   **Description**: The system fetches order book data from multiple sources: Binance, Bitstamp, Coinbase, Kraken, and LiveCoin.
    *   **Implementation**: Handled by dedicated API clients in the frontend (`client/api/`) and corresponding controllers/routes in the backend (`server/src/controllers/`). The Python server likely handles the heavy lifting of real-time scraping.
2.  **Real-Time Order Book Display**:
    *   **Description**: Displays bid/ask spreads and depth for selected coins/exchanges.
    *   **Implementation**: Implemented in screens like `client/screens/Binance.tsx` and components like `client/components/OrderBook.tsx`. Heavy reliance on high-performance lists (`@shopify/flash-list`) and charting libraries (`react-native-wagmi-charts`).
3.  **Security & Local Access Control**:
    *   **Description**: Allows users to set and verify a local PIN for application access.
    *   **Implementation**: Handled in `client/settings/securitySettings/PinSettingsScreen.tsx` using `expo-local-authentication` and `react-native-touch-id` for biometric fallback, with data stored securely via `expo-secure-store` or `async-storage`.
4.  **Data Persistence & Scheduling**:
    *   **Description**: The Python service is scheduled (`node-cron` in Node.js or `schedule` in Python) to pull data, which is then stored in MongoDB using the Beanie ODM.
    *   **Implementation**: `python_server/core/monitor.py` likely drives the scraping loop, interacting with `python_server/exchanges/`.

## Impressive Patterns & Best Practices

*   **Polyglot Architecture**: Successfully integrating TypeScript/Node.js for the API and Python for specialized scraping/data science tasks demonstrates a pragmatic approach to leveraging the best tool for each job.
*   **UI Component System**: Extensive adoption of `gluestack-ui` combined with `nativewind` (Tailwind for RN) suggests a commitment to a highly customizable, utility-first design system for the mobile client.
*   **Asynchronous Data Handling**: The Python service uses `beanie` and `motor`, indicating an intentional choice for non-blocking I/O when interacting with MongoDB, crucial for high-throughput scraping.
*   **Performance Focus**: Use of `@shopify/flash-list` for rendering potentially large lists of order book entries is a strong performance optimization choice over standard `FlatList`.
*   **Type Safety**: Heavy use of TypeScript across both the Node.js backend and the React Native frontend ensures strong contracts between services and components.
*   **Data Visualization**: Integration of multiple charting libraries (`d3`, `react-native-chart-kit`, `react-native-wagmi-charts`) shows a focus on presenting complex financial data effectively.

## Testing & Quality

*   **Test Frameworks**: Jest and `ts-jest` are configured for the Node.js backend (`server/jest.config.js`).
*   **Types of Tests**: Unit tests are present, specifically for utility functions like type guards (`server/tests/utils/bookOrderTypeGuard.test.ts`).
*   **Linting / Formatting**: ESLint (configured with `universe/native`) and Prettier are used in the frontend for code quality enforcement.

## DevOps & Infrastructure

*   **Containerization**: Not explicitly confirmed via Dockerfiles, but the structure is highly conducive to containerization.
*   **CI/CD**: GitHub Actions scripts are not visible, but the presence of `eas.json` in the client suggests use of Expo Application Services (EAS) for building and deployment.
*   **Environment Configuration**: Both backend services use `.env` files (`dotenv` dependency) for configuration management.
*   **Scripts Worth Noting**:
    *   `client`: `lint` and `format` scripts enforce code quality standards.
    *   `server`: `dev` script uses `tsx watch` for hot-reloading during development.

## Security Practices

*   **Local Authentication**: Implements PIN/Biometric security using `expo-local-authentication` and `react-native-touch-id` to protect sensitive views or settings.
*   **Secure Storage**: `expo-secure-store` is used, which is the standard for storing sensitive keys/tokens on mobile devices.
*   **Input Validation**: While not fully analyzed, the presence of type guards in the backend suggests an attempt to validate data structures before processing.

## Portfolio-Ready Highlights

*   Engineered a **polyglot monitoring system** integrating Node.js (API), TypeScript, and Python (Scraping/Data Science) to aggregate real-time crypto data.
*   Developed a **cross-platform mobile client** using React Native and Expo, leveraging **Zustand** for state and **React Query** for server state management.
*   Implemented a **custom, utility-first UI library** for the mobile app by extending `gluestack-ui` with `nativewind` for rapid, consistent styling.
*   Achieved high-performance data rendering by integrating **`@shopify/flash-list`** for displaying large order books.
*   Secured the mobile application by integrating **local authentication** (PIN/Biometrics) using Expo modules and secure storage.
*   Designed the Python data ingestion service to use **Playwright** for robust web scraping and **Beanie/Motor** for asynchronous MongoDB persistence.