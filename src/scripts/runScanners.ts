/**
 * runScanners.ts
 * 
 * Orchestrates the AI Agent scans across all user repositories.
 */

import { githubLib } from '../lib/github';
import { scanRemoteProjectAsAgent } from './scannerEngine';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';

dotenv.config();

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    const owner = 'ElchananChen';
    console.log(`📡 Orchestrator: Starting AI scan for ${owner}'s repositories`);

    try {
        // const repos = await githubLib.getUserRepos(owner);
        
        const repos = [
            { name: 'BookingClone', }, 
            {name: 'Next_setup'}
        ];
        console.log(`📡 Orchestrator: Found ${repos.length} repositories to analyze.`);

        for (let i = 0; i < repos.length; i++) {
            const repo = repos[i];
            const outputPath = path.resolve(process.cwd(), 'knowledge/projects', `${repo.name}.md`);
            
            // 1. Skip if already exists
            try {
                await fs.access(outputPath);
                console.log(`⏩ Orchestrator: Skipping ${repo.name} (already documented)`);
                continue;
            } catch (e) {
                // proceed
            }

            console.log(`\n--- 🤖 Dispatching Agent to: ${repo.name} ---`);
            try {
                await scanRemoteProjectAsAgent(repo.name, owner);
                
                // Final breather between projects
                console.log(`⏳ Project complete. Waiting 10s before next repo...`);
                await sleep(10000);
            } catch (err: any) {
                if (err.statusCode === 429 || err.message?.includes('quota')) {
                    console.error(`🛑 Orchestrator: Daily Quota effectively dead. Stopping.`);
                    break;
                }
                console.error(`❌ Orchestrator: Agent failed on ${repo.name}:`, err);
                await sleep(5000);
            }
        }
        
        console.log("\n✅ Orchestrator: All AI scans completed.");
    } catch (error) {
        console.error("❌ Orchestrator: Batch operation failed:", error);
        process.exit(1);
    }
}


main();
