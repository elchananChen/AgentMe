
# MAIN

<<<<<<< HEAD
Optional (Future Persistent Storage):

docker run -v $(pwd)/knowledge:/app/knowledge -p 3000:3000 --env-file .env.staging agent-me:staging

🔹 Recommendations

Always build (npm run build) before Docker rebuilds.

Keep .env.staging updated if new env variables are added.

Consider GitHub Actions for automated Staging build and deployment.

💡 Summary:
Staging is fully functional, isolated, and safe. You can test new features, debug, and ensure everything works before moving to Production.
=======
# Build script
# • Compiles TS → JS
# using tsup to translate the imports "ts" files to "js" files - 
# with tsc we need to put ".js" in all of the imports despite that in dev we use ".ts" files
# (instead of "rimraf dist && tsc")
"build": "rimraf dist && tsup src/app.ts --format esm --dts",


# Start script (production)
# • Runs compiled JS in dist/
# using "node dist/app.js" because it is faster than running TypeScript directly with tsx in production
# (instead of "start": "tsx src/app.ts")
    "start": "node dist/app.js",

# Dev script
# • Runs two commands concurrently:
#   1️⃣ tsc --noEmit --watch --pretty → live type checking
#   2️⃣ tsx watch src/app.ts → server with live reload
# • Colored prefixes distinguish TypeScript errors vs server logs
    "dev": "concurrently --names \"tsc,server\" --prefix-colors \"yellow,cyan\" \"tsc --noEmit --watch --pretty\" \"tsx watch src/app.ts\""
>>>>>>> origin/main
