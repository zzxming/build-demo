#!/usr/bin/env node
import process from 'node:process';
import { buildTS } from './bundle';

async function main() {
  const args = process.argv.slice(2);
  const isDev = args[0] === 'watch';

  await buildTS({
    isDev,
    onSuccess() {
      console.log(`[${new Date().toLocaleString()}] Build completed successfully!`);
    },
  })
}

main().catch((error) => {
  console.error('Error during build:', error);
  process.exit(1);
});
