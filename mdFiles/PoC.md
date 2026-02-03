🚀 AI Portfolio Agent - Development Roadmap

Phase A: Static Infrastructure (The Clean Approach)
Focus: Building a reliable foundation for general information retrieval.

[ ] Task 1: Build knowledge.md

Create a central Markdown file containing your full CV.

Add detailed descriptions for 2-3 key projects (including goals, tech stack, technical challenges, and solutions).

[ ] Task 2: Create the Context Route

Implement a service in app.ts that reads knowledge.md from the local disk using fs.promises.readFile.

Inject this content into the system prompt of the Gemini model.

Test: Verify the agent can answer specific questions like "Which project used Redis?" based on the file.

Phase B: Dynamic Integration (The GitHub Agent)
Focus: Enabling the agent to interact with live code and repositories.

[ ] Task 3: GitHub API Connection

Generate a GitHub Personal Access Token (PAT).

Install @octokit/rest.

Write a utility function to fetch raw file content given an owner, repo, and path.

[ ] Task 4: Define the read_project_file Tool

Use the Vercel AI SDK tool function to wrap the GitHub fetch logic.

Define parameters using zod so the agent knows how to provide a file path.

[ ] Task 5: Define the list_repository_files Tool

Create a tool that returns the repository tree (file structure). This prevents the agent from "guessing" file names and helps it navigate your code.

Phase C: Integration & Polishing (The "Wow" Factor)
Focus: Orchestrating the "brain" to choose the right strategy.

[ ] Task 6: Implement Hybrid Logic

Refine the System Prompt to instruct the agent: "Use the internal Markdown knowledge for general info, but use GitHub tools for deep-dive technical questions."

[ ] Task 7: Basic Caching Mechanism

Implement a simple in-memory cache to store recently fetched files, reducing API latency and token consumption.

[ ] Task 8: Robust Error Handling

Add logic to handle cases where files are missing, repositories are private, or API rate limits are reached. Ensure the agent provides a polite explanation instead of failing.