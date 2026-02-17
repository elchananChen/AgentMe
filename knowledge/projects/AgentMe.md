The `src/services/protfolioAgent.service.ts` file confirms the core functionality is driven by an **AI Agent** using the `ai` SDK (likely `ai-sdk`).

Key architectural points from this service:
1.  **AI Model Integration**: It uses `generateText` from the SDK, accepting a `model` (e.g., Google's model via `@ai-sdk/google`).
2.  **Context Loading**: It dynamically loads context via `loadContext()` from `context.service.ts`, which likely pulls in data from the synchronized repositories/CV files.
3.  **System Prompt Engineering**: The agent's behavior is heavily defined by system prompts loaded from `../config/agent.config.ts` (`AGENT_PROMPTS`). These prompts define:
    *   **Identity**: The persona of the agent (`AGENT_PROMPTS.IDENTITY.V2`).
    *   **Guidelines**: Rules for operation (`AGENT_PROMPTS.GUIDELINES.V2`).
    *   **Style Preferences**: Short or Long responses based on the `isShort` flag.
4.  **Tool Use**: It accepts a `tools` object, indicating the agent is designed to be **function-calling capable**. The `tools.service.ts` likely defines these functions.
5.  **Execution Control**: It limits the agent's execution depth using `stopWhen: stepCountIs(5)`, preventing overly long or complex reasoning chains.
6.  **Observability**: It includes an `onStepFinish` callback for logging the agent's reasoning steps (text generation, tool calls, tool results), which is excellent for debugging and understanding the agent's thought process.

This service is the heart of the "AgentMe" system, responsible for answering portfolio-related questions by synthesizing loaded context and executing defined tools under a specific persona.

I have enough information to provide a comprehensive summary.
## Professional Summary of the AgentMe Repository

The **AgentMe** repository, owned by ElchananChen, implements a sophisticated, containerized **AI Agent system** built on **Node.js and TypeScript**. Its primary function appears to be serving as an intelligent interface for querying and presenting information related to a professional portfolio, leveraging external knowledge sources.

### Architecture and Technology Stack
The application follows a standard layered architecture using **Express.js** for the web server:
*   **Entry Point**: `src/app.ts` initializes the Express server, sets up security middleware (`helmet`, `cors`), and registers routes for status checks and portfolio queries.
*   **Data Synchronization**: A critical feature is the automatic synchronization of external data (`SyncService.syncRepos()`) upon startup, suggesting the agent's knowledge base is dynamically updated from sources defined in the `knowledge` directory (e.g., `repositories.md`).
*   **AI SDK**: The core logic relies on the `ai` SDK for interacting with large language models (LLMs), specifically configured to use models like Google's via `@ai-sdk/google`.

### Core Agent Logic (The "Why" and "How")
The system is engineered around the `protfolioAgent.service.ts`, which orchestrates the agent's behavior:
1.  **Contextualization**: It dynamically loads relevant data via `context.service.ts` (likely pulling from the synchronized CV/repository data) to ground the LLM's responses.
2.  **Prompt Engineering**: The agent's persona, guidelines, and response style (short vs. long) are meticulously controlled via configuration files (`agent.config.ts`), ensuring consistent and on-brand output.
3.  **Tool Use**: The agent is designed for **function calling**, accepting a set of defined tools (likely implemented in `src/services/tools.service.ts`) to interact with external systems or perform complex calculations.
4.  **Execution Control**: Reasoning depth is explicitly limited using `stopWhen: stepCountIs(5)`, providing a mechanism to manage complexity and cost.

In summary, **AgentMe is a highly structured, context-aware, and tool-enabled AI Agent designed to answer domain-specific questions about a portfolio by synthesizing internal knowledge and external capabilities.**