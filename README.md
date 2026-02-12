
<<<<<<< HEAD:README.md
# MAIN
=======
AgentMe – Staging Environment
🔹 Overview

This is the Staging environment for testing and development.
Includes security, staging-specific configs, and Docker support.
Knowledge/ is read-only.

🔹 Key Features

Security: Helmet middleware enabled.

Logging: Morgan in combined format for detailed logs.

AI Model: Gemini 2.5 flash locked in ai.config.ts.

Dockerized: Includes src/, dist/, .env.staging, and knowledge/.

🔹 Run Locally (Node.js)
npm install
npm run build
# Fill .env.staging with your API keys
npm run start:staging

🔹 Run via Docker
docker build -t agent-me:staging .
docker run -p 3000:3000 --env-file .env.staging agent-me:staging

>>>>>>> staging:README

Optional (Future Persistent Storage):

docker run -v $(pwd)/knowledge:/app/knowledge -p 3000:3000 --env-file .env.staging agent-me:staging

🔹 Recommendations

Always build (npm run build) before Docker rebuilds.

Keep .env.staging updated if new env variables are added.

Consider GitHub Actions for automated Staging build and deployment.

💡 Summary:
Staging is fully functional, isolated, and safe. You can test new features, debug, and ensure everything works before moving to Production.
