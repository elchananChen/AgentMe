# AgentMe

> An AI agent system built with Node.js and TypeScript that dynamically loads professional context (CV, project details) to serve as an intelligent, function-calling interface for portfolio inquiries.

## Project Overview
- **Type**: Backend API / AI Agent Service
- **Purpose**: To provide an intelligent, context-aware interface for answering questions about Elchanan Chen's professional experience, skills, and projects by synthesizing internal knowledge and executing external tools (like GitHub API calls).
- **Scale**: Small, focused service. Implements a few core API endpoints (`/status`, `/portfolio/ask`) and a complex internal AI reasoning engine.
- **Monorepo?**: No. It is a dedicated Node.js service, though it is designed to ingest knowledge from other repositories.

## Technology Stack

### Frontend
| Category | Technology | Details |
|----------|-----------|----------|
| Framework | Not Applicable | This is a backend service. |
| Build Tool | Tsup | Used for bundling TypeScript into distributable JavaScript. |
| Styling | Not Applicable | |
| State Management | Not Applicable | |
| Routing | Not Applicable | |
| Forms / Validation | Not Applicable | |
| HTTP Client | Axios | Used internally within the agent's tools (inferred from other projects, not directly in core files). |
| UI Component Library | Not Applicable | |
| Internationalization | Not Applicable | |
| Animation | Not Applicable | |
| Other | Not confirmed in source | |

### Backend
| Category | Technology | Details |
|----------|-----------|----------|
| Runtime | Node.js | |
| Framework | Express | Minimalist framework for routing and middleware. |
| Database | Not confirmed in source | No direct DB connection visible in core files, but context loading suggests file/external source access. |
| ORM / ODM | Not confirmed in source | |
| Authentication | Not confirmed in source | Uses `helmet` and `cors` for basic security posture. |
| Caching | Not confirmed in source | |
| Payment | Not confirmed in source | |
| File Upload | Not confirmed in source | |
| Email | Not confirmed in source | |
| Other | AI SDK | `@ai-sdk/google` for LLM interaction. |

## Full Dependency List

### Frontend Dependencies
(None, as this is a backend service)

#### Production
- List every dependency from package.json with a brief one-line description of what it does

#### Dev Dependencies
- List every devDependency

### Backend Dependencies
#### Production
- **@ai-sdk/google**: Adapter for using Google AI models (Gemini) with the AI SDK.
- **@octokit/rest**: Library for interacting with the GitHub REST API, used for tool execution.
- **@types/express**: TypeScript definitions for Express.
- **ai**: The core SDK for building AI agents and function calling.
- **axios**: Promise-based HTTP client (likely used in the GitHub tool for API calls).
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a `.env` file.
- **express**: Web application framework.
- **helmet**: Middleware to secure Express apps by setting various HTTP headers.
- **mongoose**: ODM for modeling MongoDB data (though not used in the visible service files, it's a dependency).
- **morgan**: HTTP request logger middleware.
- **node-cron**: For scheduling tasks (inferred from dependency, not used in visible files).
- **zod**: Library for schema validation, used extensively in defining tool input schemas.

#### Dev Dependencies
- **@types/cors**: TypeScript definitions for CORS.
- **@types/jest**: TypeScript definitions for Jest testing framework.
- **@types/morgan**: TypeScript definitions for Morgan logger.
- **concurrently**: Runs multiple commands in parallel, used for the `dev` script.
- **jest**: JavaScript testing framework.
- **rimraf**: Command-line utility to remove files and directories recursively.
- **ts-jest**: Jest preset for TypeScript.
- **tsup**: Fast, zero-config bundler for TypeScript.
- **tsx**: Tool to run TypeScript/TSX files directly without a separate compilation step.
- **typescript**: The core language compiler.

## Architecture & Project Structure
The architecture is a **Layered Service Architecture** built on Express, heavily augmented by the **AI Function Calling Pattern**.

- **Key directories and their responsibilities**:
    - `src/app.ts`: Server bootstrap, middleware setup (`helmet`, `cors`, `morgan`), and route registration.
    - `src/config/`: Stores configuration constants, most notably the detailed system prompts (`agent.config.ts`) and AI model settings (`ai.config.ts`).
    - `src/controllers/`: Handles incoming HTTP requests, delegates logic to services, and formats the final response.
    - `src/services/`: Contains the core business logic, including the AI orchestration (`protfolioAgent.service.ts`) and tool definitions (`tools.service.ts`).
    - `src/lib/`: Houses external library wrappers, specifically for GitHub interaction (`github.ts`).
    - `knowledge/`: Stores the static context data (CV, project summaries) that the agent synthesizes.
- **Data flow overview (Query)**:
    1.  Client sends a POST request to `/api/portfolio/ask` with a `question`.
    2.  `askPortfolioAgentController` validates input and calls `askPortfolioAgent`.
    3.  `askPortfolioAgent` loads context, constructs a detailed system prompt (including style preferences), and calls `generateText` from the AI SDK, passing the user question and the defined `githubTools`.
    4.  The LLM reasons, potentially calling the GitHub tools.
    5.  The final text response is returned to the client.
- **Notable structural decisions**:
    - **Tool Abstraction**: The GitHub interaction logic is cleanly abstracted into a `githubTools` object using the `ai` SDK's `tool()` wrapper, making the agent's capabilities explicit and declarative.
    - **Prompt Centralization**: System prompts and style guides are externalized into `agent.config.ts`, allowing for easy iteration on the agent's persona and rules without touching the core service logic.
    - **Context Loading**: The service relies on a `loadContext()` function (though its implementation file was not found), indicating a dynamic knowledge retrieval mechanism is in place.

## Core Features & Business Logic
1.  **Intelligent Portfolio Querying**:
    -   **Description**: The primary feature allowing users to ask natural language questions about Elchanan's professional background.
    -   **Implementation**: Handled by `askPortfolioAgent` in `protfolioAgent.service.ts`. It uses the `generateText` function with a highly engineered system prompt (`AGENT_PROMPTS.IDENTITY.V2` and `AGENT_PROMPTS.GUIDELINES.V2`) to enforce a "Senior Architect" persona and specific research steps.
2.  **Dynamic Tool Execution (Function Calling)**:
    -   **Description**: The agent is equipped to use tools to gather real-time or deep-dive information beyond its initial context load.
    -   **Implementation**: Defined in `tools.service.ts`, the agent has access to `getProjectStructure`, `getFileCode`, and `getFilesCode`. The `getFileCode` tool is particularly powerful, allowing the agent to read source code directly from GitHub.
3.  **Contextual Grounding**:
    -   **Description**: Ensures answers are based on provided knowledge, minimizing hallucination.
    -   **Implementation**: The system prompt explicitly includes context loaded dynamically (via `loadContext()`) and instructs the agent to use GitHub tools only when necessary, prioritizing the provided context.
4.  **Response Style Control**:
    -   **Description**: Allows the caller to request either a brief or a detailed answer.
    -   **Implementation**: Controlled by the `isShort` boolean passed in the request body, which selects between `AGENT_PROMPTS.STYLE_PREFERENCES.SHORT` and `LONG`.
5.  **Health Check Endpoint**:
    -   **Description**: Standard API endpoint for monitoring service availability.
    -   **Implementation**: Implemented via `status.routes.ts` and `health.controller.ts`, delegating to `health.service.ts`.

## Impressive Patterns & Best Practices
- **Advanced Prompt Engineering**: The system prompt (`GUIDELINES.V2`) is exceptionally detailed, instructing the LLM on tonality, adaptive research strategy (when to use tools), verbosity control, and the requirement to connect technical findings back to Elchanan's stated principles ("Plan-First", "Clean Engineering"). This shows a deep understanding of LLM orchestration.
- **Declarative Tool Definition**: The use of the `ai` SDK's `tool()` wrapper in `tools.service.ts` provides clean, Zod-validated schemas for tool inputs and clear execution logic, which is the modern standard for function calling.
- **Execution Guardrails**: The use of `stopWhen: stepCountIs(5)` is a crucial engineering pattern to prevent runaway LLM reasoning, controlling execution time and cost.
- **Observability in AI Flow**: The inclusion of the `onStepFinish` callback provides excellent internal logging of the agent's reasoning steps (tool calls, text generation), which is vital for debugging complex AI workflows.
- **Separation of Concerns**: Clear separation between the Express layer (controllers/routes), the AI orchestration layer (services), and the external API abstraction layer (`lib/github.ts`).

## Testing & Quality
- **Test framework(s) used**: Jest (`"test": "jest"` in package.json).
- **Types of tests present**: Unit tests are configured.
- **Test coverage observations**: No test files were visible in the structure scan.
- **Linting / formatting tools**: TypeScript is used throughout (`tsconfig.json`). ESLint/Prettier setup is implied by the modern dependency list but not explicitly confirmed via config files.

## DevOps & Infrastructure
- **Docker / containerization**: A `Dockerfile` is present, indicating the application is containerized for consistent deployment.
- **CI/CD pipelines**: A `.github/workflows/generate-readme.yml` file suggests GitHub Actions are used, likely for automated documentation generation.
- **Environment configuration**: Uses `dotenv` to load secrets like `GITHUB_TOKEN` (inferred from `github.ts`) and port settings.
- **Deployment target**: The `app.ts` CORS configuration lists a specific deployment URL (`https://agent-me-164419455256.me-west1.run.app`), suggesting deployment on Google Cloud Run or a similar serverless platform.
- **Scripts in package.json worth noting**:
    - `"build:context": "tsx src/scripts/runScanners.ts"`: Indicates a dedicated script to pre-process or scan knowledge sources before deployment or runtime.
    - `"list-models": "tsx src/scripts/listAvailableModels.ts"`: A utility script for checking available LLM models.
    - `"build"`: Uses `tsup` to compile TypeScript to ES modules (`dist/app.js`) and generate type definitions (`.dts`).

## Security Practices
- **Authentication & authorization approach**: The API endpoints exposed (`/status`, `/portfolio/ask`) do not appear to require user authentication, suggesting they are public-facing knowledge retrieval endpoints.
- **Input validation & sanitization**: Input validation is performed on the request body in the controller (`question` check). Tool inputs are strictly validated using **Zod** schemas within the tool definitions.
- **Security headers & middleware**: `helmet` is used to set security-enhancing HTTP headers. `cors` is configured to restrict access to known origins, including a specific production URL.
- **Secrets management**: Relies on `dotenv` to load secrets, including the `GITHUB_TOKEN` required for the agent's tools to function.
- **Any OWASP considerations observed**: The primary security focus is on securing the Express server via middleware and validating tool inputs. The AI interaction itself is secured by the guardrails in the system prompt (e.g., "NO GUESSING").

## Portfolio-Ready Highlights
- Engineered a **Function-Calling AI Agent** using the modern `ai` SDK, capable of dynamically executing custom tools against external APIs (GitHub).
- Developed **highly detailed, multi-layered System Prompts** to enforce a specific "Senior Architect" persona, response style, and structured reasoning process for the LLM.
- Implemented **execution guardrails** (`stopWhen: stepCountIs(5)`) to manage LLM complexity, cost, and response time.
- Established a robust **knowledge grounding pipeline** that synthesizes static context (CV/Projects) with dynamic research capabilities (GitHub API tools).
- Containerized the application using a **Dockerfile** and configured deployment for a serverless environment (inferred from deployment URL).
- Utilized **Tsup** for efficient, zero-config TypeScript bundling and type definition generation.