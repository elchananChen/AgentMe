import { githubLib } from '../src/lib/github.js';

async function testRateLimit() {
  console.log("Starting GitHub Rate Limit Test...");
  try {
    const rl = await githubLib.getRateLimit();
    console.log("SUCCESS: Rate limit fetched!");
    console.log(`Limit: ${rl.resources.core.limit}`);
    console.log(`Remaining: ${rl.resources.core.remaining}`);
    console.log(`Reset: ${new Date(rl.resources.core.reset * 1000).toLocaleString()}`);
  } catch (error) {
    console.error("FAILURE: Could not fetch rate limit.");
    console.error(error);
  }
}

testRateLimit();
