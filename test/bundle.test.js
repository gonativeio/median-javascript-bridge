/**
 * Basic test to verify the rollup IIFE bundle exports Median correctly,
 * and that the package entry point loads for npm consumers.
 * Run with: npm test
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const bundlePath = path.join(__dirname, '../dist/median.min.js');
const entryPath = path.join(__dirname, '../dist/index.js');

// Check bundle exists
if (!fs.existsSync(bundlePath)) {
  console.error('❌ Bundle not found. Run `npm run build` first.');
  process.exit(1);
}

// Evaluate bundle as browser would (IIFE assigns to global `Median`)
const bundleCode = fs.readFileSync(bundlePath, 'utf8');
eval(bundleCode);

// Test cases
const tests = [
  // Core namespace
  { name: 'Median exists', check: () => typeof Median === 'object' },
  { name: 'Median.isNativeApp is function', check: () => typeof Median.isNativeApp === 'function' },
  { name: 'Median.onReady is function', check: () => typeof Median.onReady === 'function' },
  
  // General commands
  { name: 'Median.clipboard exists', check: () => typeof Median.clipboard === 'object' },
  { name: 'Median.deviceInfo is function', check: () => typeof Median.deviceInfo === 'function' },
  { name: 'Median.share exists', check: () => typeof Median.share === 'object' },
  
  // Plugins
  { name: 'Median.onesignal exists', check: () => typeof Median.onesignal === 'object' },
  { name: 'Median.onesignal.login is function', check: () => typeof Median.onesignal?.login === 'function' },
  { name: 'Median.branch exists', check: () => typeof Median.branch === 'object' },
  { name: 'Median.iap exists', check: () => typeof Median.iap === 'object' },
  { name: 'Median.healthBridge exists', check: () => typeof Median.healthBridge === 'object' },
  { name: 'Median.auth exists', check: () => typeof Median.auth === 'object' },
  { name: 'Median.backgroundLocation exists', check: () => typeof Median.backgroundLocation === 'object' },
  
  // Events
  { name: 'Median.appResumed exists', check: () => typeof Median.appResumed === 'object' },
  { name: 'Median.appResumed.addListener is function', check: () => typeof Median.appResumed?.addListener === 'function' },
  { name: 'Median.jsNavigation exists', check: () => typeof Median.jsNavigation === 'object' },

  // Package entry point — Node's ESM resolver does no extension guessing, so a
  // relative import emitted without `.js` fails the whole graph for npm users.
  {
    name: 'dist/index.js resolves through the Node ESM loader',
    check: async () => {
      const module = await import(pathToFileURL(entryPath).href);
      return typeof module.default === 'object' && typeof module.default.shareIntoApp === 'object';
    },
  },
];

let passed = 0;
let failed = 0;

console.log('\n🧪 Testing Median IIFE bundle...\n');

async function run() {
  for (const test of tests) {
    try {
      if (await test.check()) {
        console.log(`  ✅ ${test.name}`);
        passed++;
      } else {
        console.log(`  ❌ ${test.name}`);
        failed++;
      }
    } catch (err) {
      console.log(`  ❌ ${test.name} (Error: ${err.message})`);
      failed++;
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

run();
