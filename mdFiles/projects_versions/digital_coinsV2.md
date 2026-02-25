# digital_coins

> A multi-platform cryptocurrency order book aggregator that fetches, processes, and serves real-time bid/ask data from various exchanges using a hybrid Node.js/Python backend architecture.

## Project Overview
- **Type**: Full-stack App (Mobile Frontend, Hybrid Backend)
- **Purpose**: To provide users with a unified, real-time view of cryptocurrency order book data (bids and asks) across multiple major exchanges (Binance, Kraken, Coinbase, etc.), enabling comparison and analysis from a single application interface.
- **Scale**: Supports 6 major exchanges and 5 core trading pairs (BTC, ETH, LTC, XRP, BCH). The backend involves multiple concurrent data fetching services.
- **Monorepo?**: Yes, structured into three main parts: `client` (React Native/Expo), `server` (Node.js/Express for API), and `python_server` (Python for specialized scraping/monitoring).

## Technology Stack

### Frontend
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | React Native / Expo | Expo SDK 53.0.9, React 19.0.0 |
| Build Tool | Metro | Default Expo bundler |
| Styling | NativeWind, Tailwind CSS | Utility-first styling based on Tailwind CSS |
| State Management | Zustand | Used via `client/context/dataStore.ts` |
| Routing | Expo Router | Stack navigation structure |
| Forms / Validation | Not explicitly detailed | Uses gluestack-ui components |
| HTTP Client | Axios | Used for API calls to the backend |
| UI Component Library | Gluestack-UI | Extensive use of `@gluestack-ui` components |
| Internationalization | i18next | Configured with English and French locales |
| Animation | react-native-reanimated | Used implicitly via UI libraries |
| Other | TypeScript, D3 | TypeScript for type safety, D3 for charting logic |

### Backend
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Node.js (Express) | Primary API server |
| Framework | Express | REST API framework |
| Database | MongoDB | Connected via Mongoose |
| ORM / ODM | Mongoose | Used for schema definition and data persistence |
| Authentication | Not confirmed in source | No explicit auth/session management visible in core files |
| Caching | Not confirmed in source | Data is fetched and stored in DB frequently |
| Payment | Not confirmed in source | |
| File Upload | Not confirmed in source | |
| Email | Not confirmed in source | |
| Other | TypeScript, node-cron | TypeScript for backend logic, `node-cron` for scheduling (though actual cron logic seems replaced by `setInterval` in `app.ts`) |

## Full Dependency List

### Frontend Dependencies
#### Production
- **@babel/helpers, @babel/runtime**: Babel runtime helpers.
- **@expo/html-elements**: Expo utility for rendering HTML elements.
- **@expo/vector-icons**: Icon library.
- **@gluestack-ui/* (multiple)**: Components library (Accordion, ActionSheet, Alert, Avatar, Button, Checkbox, Divider, FormControl, Icon, Image, Input, Link, Modal, Progress, Radio, Select, Slider, Spinner, Switch, Table, Text, Textarea, Toast).
- **@legendapp/motion**: Animation library.
- **@react-native-async-storage/async-storage**: Local storage access.
- **@react-native-clipboard/clipboard**: Clipboard access.
- **@react-native-community/datetimepicker**: Date/time picker component.
- **@react-native-picker/picker**: Picker component.
- **@react-navigation/native, @react-navigation/stack**: Navigation stack management.
- **@shopify/flash-list**: Optimized list component.
- **@tanstack/react-query**: Data fetching and state management for server state.
- **axios**: HTTP client for API calls.
- **babel-plugin-module-resolver**: Custom module path resolution for imports.
- **d3-scale, d3-shape**: D3 libraries for data visualization/charting.
- **date-fns**: Date utility library.
- **dotenv**: For loading environment variables.
- **expo, expo-camera, expo-dev-client, expo-image-manipulator, expo-linear-gradient, expo-localization, expo-location, expo-router, expo-secure-store, expo-sqlite, expo-status-bar**: Core Expo modules and specific device/feature APIs.
- **i18next, react-i18next**: Internationalization framework.
- **lucide-react-native**: Icon set.
- **nativewind**: Utility for using Tailwind CSS in React Native.
- **react, react-dom**: Core React libraries.
- **react-native**: Core React Native framework.
- **react-native-chart-kit, react-native-gifted-charts, react-native-wagmi-charts**: Charting libraries.
- **react-native-css-interop**: Interoperability layer for CSS.
- **react-native-dotenv**: For handling environment variables in the client.
- **react-native-gesture-handler, react-native-reanimated**: Gesture and animation handling.
- **react-native-maps**: Mapping component.
- **react-native-safe-area-context, react-native-screens**: Safe area and screen management.
- **react-native-svg**: SVG support.
- **react-native-touch-id**: Local authentication via device biometrics.
- **react-native-vector-icons**: Icon library.
- **react-native-webview**: For embedding web content.
- **zustand**: Lightweight state management library.

#### Dev Dependencies
- **@babel/core**: Babel compiler.
- **@react-native-community/cli**: React Native CLI.
- **@types/***: TypeScript definitions for various packages.
- **eslint, eslint-config-universe**: Linting tools and configuration.
- **jscodeshift**: Codemod tool.
- **prettier, prettier-plugin-tailwindcss**: Code formatting and Tailwind plugin.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Language compiler.

### Backend Dependencies
#### Production
- **@types/express**: TypeScript definitions for Express.
- **axios**: HTTP client for external API calls.
- **dotenv**: For loading environment variables.
- **express**: Web application framework.
- **mongoose**: MongoDB ODM.
- **morgan**: HTTP request logger middleware.
- **node-cron**: Task scheduler (though its usage is superseded by `setInterval` in `app.ts`).

#### Dev Dependencies
- **@types/jest**: Jest type definitions.
- **@types/morgan**: Morgan type definitions.
- **jest, ts-jest**: Testing framework and integration.
- **tsx**: Tool for running TypeScript files directly.
- **typescript**: Language compiler.

## Architecture & Project Structure
The project employs a microservice-like structure across three distinct directories:

1.  **`client` (React Native/Expo)**: The presentation layer, handling UI, navigation, and fetching data from the Node.js API. It uses Gluestack-UI for a consistent look and feel, and Zustand for local state management.
2.  **`server` (Node.js/Express/TypeScript)**: The primary REST API layer. It handles client requests, communicates with MongoDB via Mongoose, and crucially, manages the *scheduling* of data ingestion from external exchanges.
3.  **`python_server` (Python/Poetry)**: A specialized service, likely for data collection or resource monitoring, using Playwright and Beanie (an async ODM for MongoDB).

**Data Flow Overview (Ingestion):**
The `server/src/app.ts` initiates concurrent, fixed-interval fetching jobs (every 500ms) for each exchange using functions like `insertBinance()`, `insertKraken()`, etc., located in `server/src/services/orderBookService.ts`. These services fetch data, validate it using type guards, transform symbols (e.g., `KrakenSymbolsToUsdSymbols`), and persist the results into MongoDB via Mongoose.

**Data Flow Overview (Serving):**
The client requests data via the `/api/order_book` endpoint on the Node.js server. The `orderBookController` queries MongoDB for the latest entry (`.sort({ timestamp: -1 })`) for the requested exchange/symbol and returns it.

**Key Directories and Responsibilities:**
*   **`server/src/services/`**: Contains the core logic for fetching data from external exchange APIs (Binance, Kraken, etc.) and saving it to the database.
*   **`server/src/utils/typeGuards/`**: Implements runtime type checking for inconsistent external API responses, ensuring data integrity before database insertion.
*   **`python_server/core/`**: Contains database initialization (`db.py`) and resource monitoring logic (`monitor.py`).
*   **`client/screens/`**: Defines the main application views (e.g., `Coins.tsx` for selection, specific exchange screens like `Binance.tsx`).

## Core Features & Business Logic

1.  **Multi-Exchange Data Ingestion**:
    *   **Description**: Concurrently fetches order book data (top 10 bids/asks) from 6 exchanges (Binance, Kraken, Coinbase, Crypto.com, ByBit, BitStamp) every 500ms.
    *   **Implementation**: Handled in `server/src/services/orderBookService.ts` using `Promise.allSettled` to manage failures gracefully across multiple API calls. Data transformation (symbol mapping) is done via utility functions like `KrakenSymbolsToUsdSymbols`.

2.  **Robust Data Validation**:
    *   **Description**: Ensures that the structure of the raw JSON response from each exchange matches the expected TypeScript interface before insertion.
    *   **Implementation**: Achieved using custom type guards in `server/src/utils/typeGuards/bookOrderTypeGuards.ts` (e.g., `binanceOrderBookTypeGuard`, `krakenOrderBookTypeGuard`). This is critical due to the varying response formats across exchanges.

3.  **Unified Data Model**:
    *   **Description**: All disparate exchange data is normalized into a single Mongoose schema (`OrderBookModel`) using standardized symbols (`BTCUSD`, `ETHUSD`, etc.) for storage.
    *   **Implementation**: Handled in `server/src/models/orderBookModel.ts`. The schema includes a compound index on `symbol`, `exchange`, and `timestamp` for efficient retrieval of the latest data.

4.  **RESTful Order Book API**:
    *   **Description**: Provides endpoints to retrieve the latest order book data, either for a specific exchange/symbol or aggregated across all symbols for one exchange.
    *   **Implementation**: Implemented in `server/src/controllers/orderBookController.ts`. It handles validation of input parameters (`exchange`, `symbol`) and uses MongoDB's `.sort({ timestamp: -1 }).findOne()` pattern to guarantee the freshest data.

5.  **Client-Side Data Visualization & Selection**:
    *   **Description**: The client allows users to select a coin (e.g., BTC, ETH) via `client/screens/Coins.tsx` and presumably view its aggregated data on dedicated screens (e.g., `client/screens/Binance.tsx`).
    *   **Implementation**: Uses Gluestack-UI for UI components and React Query for managing the asynchronous state of fetched data.

6.  **System Resource Monitoring (Python Service)**:
    *   **Description**: A separate Python service monitors the resource usage (CPU, RAM, Threads) of its own process and the system, logging metrics to a CSV file for graphing.
    *   **Implementation**: Found in `python_server/core/monitor.py`, utilizing the `psutil` library for process metrics and `matplotlib` (dependency) for potential graphing.

## Impressive Patterns & Best Practices
- **Hybrid Backend Strategy**: Utilizing Node.js for the high-concurrency, I/O-bound API layer and Python for what appears to be specialized, potentially CPU-intensive or browser-automation tasks (given the `playwright` dependency in `pyproject.toml`).
- **Defensive Data Ingestion**: Extensive use of runtime type guards (`bookOrderTypeGuards.ts`) to validate external API responses, preventing malformed data from corrupting the MongoDB collection.
- **Symbol Normalization**: A clear pattern of mapping exchange-specific symbols (e.g., `btcusd` for Kraken, `BTC-USD` for Coinbase) to internal, standardized USD/USDT symbols (`BTCUSD`, `BTCUSDT`) using utility functions (`server/src/utils/utils.ts`).
- **Efficient Database Indexing**: A compound index (`{ symbol: 1, exchange: 1, timestamp: -1 }`) is defined on the `OrderBook` schema, specifically designed to optimize the primary query pattern: fetching the *latest* record for a given pair/exchange.
- **Concurrent Fetching**: Using `Promise.allSettled` in the service layer to fetch data from all exchanges simultaneously, ensuring the ingestion process is not bottlenecked by the slowest external API.
- **Fixed-Interval Polling**: The Node.js server polls all exchange APIs every 500ms using `setInterval` with a running map (`runningMap`) to prevent overlapping executions, ensuring near real-time updates without overwhelming the external APIs or the local service.

## Testing & Quality
- **Test Frameworks**: Jest is configured for the Node.js backend (`server/jest.config.js`).
- **Types of tests present**: Unit tests are present for utility functions, specifically one test file for type guards (`server/tests/utils/bookOrderTypeGuard.test.ts`).
- **Linting / formatting tools**: ESLint (configured with `universe/native`) and Prettier are used across the TypeScript/JavaScript codebase.

## DevOps & Infrastructure
- **Containerization**: Not explicitly confirmed via Dockerfiles, but the presence of `eas.json` in the client suggests use of Expo Application Services (EAS) for building and deployment.
- **CI/CD pipelines**: Not explicitly visible (no `.github/workflows` found), but EAS implies a managed CI/CD environment for the mobile client.
- **Environment configuration**: Uses `.env` files via `dotenv` in both the Node.js server and the React Native client. The Python server also uses `python-dotenv`.
- **Scripts in package.json worth noting**:
    *   `server/dev`: Uses `tsx watch` for hot-reloading the TypeScript backend server.
    *   `client/format`: Runs ESLint and Prettier for code quality enforcement.

## Security Practices
- **Authentication & Authorization**: Not confirmed in the visible API controller/routes; the API appears open for fetching public order book data.
- **Input Validation & Sanitization**: The API controller (`orderBookController.ts`) performs basic validation on the `exchange` query parameter, checking against the `EExchangeEnum` whitelist to prevent injection of unsupported or malicious exchange names.
- **Secrets Management**: Environment variables are loaded via `dotenv` in all three components, suggesting secrets are managed via environment variables at runtime.
- **Database Security**: The Mongoose schema includes validation logic to ensure the `symbol` matches the expected format for the requested `exchange`.

## Portfolio-Ready Highlights
- Architected and implemented a high-frequency, multi-threaded data ingestion pipeline using Node.js to aggregate real-time order book data from 6 distinct cryptocurrency exchanges concurrently.
- Developed a robust data validation layer using TypeScript type guards to ensure data integrity across heterogeneous external API responses, achieving high reliability in data persistence to MongoDB.
- Designed a normalized MongoDB schema with compound indexing to optimize read performance for retrieving the absolute latest price data across all tracked assets and exchanges.
- Built a full-stack application featuring a React Native client styled with NativeWind/Gluestack-UI, consuming a custom REST API built with Express and TypeScript.
- Implemented a specialized Python microservice utilizing `psutil` for detailed system resource monitoring, demonstrating proficiency in polyglot persistence and service architecture.