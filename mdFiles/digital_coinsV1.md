# Project Name
digital_coins

## Problem Statement (The "Why")
The project aims to provide a comprehensive platform for monitoring and analyzing digital currency data from various exchanges. It addresses the need for a unified interface to track cryptocurrency prices, order books, and potentially other market data, simplifying the process for users to stay informed about the volatile digital asset market.

## Technical Stack (Languages, Frameworks, Key Libs)
*   **Frontend:** TypeScript, React Native, Gluestack UI, NativeWind (for Tailwind CSS), Expo
*   **Backend:** Python, FastAPI (implied by `pyproject.toml` and `main.py` structure), potentially SQLAlchemy or similar ORM (inferred from `core/db.py`)
*   **Key Libraries:** `react-native-reanimated`, `axios` (likely for API calls), `i18next` (for internationalization)

## Frontend Features (Top 3 UI/UX highlights)
1.  **Exchange-Specific Views:** Dedicated screens for major exchanges (Binance, Coinbase, Kraken, Bitstamp, LiveCoin) allowing users to view tailored data.
2.  **Unified Order Book Display:** A consistent `OrderBook` component used across different exchanges, suggesting a standardized way to visualize trading data.
3.  **Component-Driven UI:** Extensive use of reusable UI components (`client/components/ui`) built with Gluestack UI, promoting a consistent design system and efficient development.

## Backend Features (Top 3 Architectural/Logic highlights)
1.  **Modular Exchange Integration:** Separate modules for each cryptocurrency exchange (`python_server/exchanges/`) indicate a strategy for easily adding or maintaining exchange-specific data fetching and processing logic.
2.  **Data Monitoring Service:** A `monitor.py` script within the `core` module suggests a background service responsible for continuously fetching and processing data, likely for real-time updates or historical data aggregation.
3.  **API Layer Abstraction:** The `server/src/controllers` and `server/src/routs` directories point to a well-defined API structure, abstracting the underlying data fetching and business logic from the API endpoints.

## Solution Impact (Patterns & Seniority)
The project demonstrates a clear separation of concerns between the frontend (React Native) and backend (Python/FastAPI), following a typical client-server architecture. The use of TypeScript on the frontend and Python on the backend, along with structured API design and modular exchange handling, indicates a senior-level approach to building a scalable and maintainable application. The frontend's reliance on a UI component library (Gluestack UI) and theming suggests a focus on design consistency and developer efficiency.

## Installation & Run (Minimal commands)
*   **Frontend (React Native):**
    ```bash
    cd client
    npm install
    npx expo start
    ```
*   **Backend (Python):**
    ```bash
    cd python_server
    pip install -r requirements.txt # Assuming requirements.txt exists, or use poetry install
    python main.py
    ```
    *(Note: Specific backend installation commands may vary based on `pyproject.toml` and actual dependencies.)*

## AI Insights (Gotchas & Future plans)
*   **Gotchas:**
    *   The project structure suggests multiple independent services (client, python_server, server). Ensuring seamless communication and deployment orchestration between these could be complex.
    *   Reliance on external exchange APIs means the application is susceptible to changes in those APIs, requiring ongoing maintenance.
    *   Error handling and rate limiting for API calls across numerous exchanges need robust implementation to prevent service disruptions.
*   **Future Plans (Inferred):**
    *   Expansion to include more cryptocurrency exchanges.
    *   Development of advanced charting and analytical tools.
    *   Implementation of user accounts and personalized watchlists.
    *   Potential integration of real-time trading features.
    *   Further optimization of data fetching and processing for performance.