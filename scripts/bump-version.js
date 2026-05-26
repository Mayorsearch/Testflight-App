#!/usr/bin/env node
/**
 * iMediaSave — Version Bump Script
 *
 * Updates version/build numbers across:
 *   - package.json (version)
 *   - app.json (version, buildNumber, versionCode)
 *   - ios/iMediaSave/Info.plist (via regex, if present)
 *   - android/app/build.gradle (via regex, if present)
 *
 * Usage:
 *   node scripts/bump-version.js --version 1.2.3 --build 42
 *   node scripts/bump-version.js --patch          (auto-increments patch)
 *   node scripts/bump-version.js --minor          (auto-increments minor)
 *   node scripts/bump-version.js --major          (auto-increments major)
 *
 * In CI, BUILD_NUMBER env var is used automatically if --build is not provided.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ─── Argument Parsing ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const argMap = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    argMap[key] = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
  }
}

// ─── Load current versions ────────────────────────────────────────────────────

const pkgPath = path.join(ROOT, 'package.json');
const appJsonPath = path.join(ROOT, 'app.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

const currentVersion = pkg.version || '1.0.0';
const parts = currentVersion.split('.').map(Number);

// ─── Determine new version ────────────────────────────────────────────────────

let newVersion;

if (argMap.version && argMap.version !== true) {
  newVersion = argMap.version;
} else if (argMap.major) {
  newVersion = `${parts[0] + 1}.0.0`;
} else if (argMap.minor) {
  newVersion = `${parts[0]}.${parts[1] + 1}.0`;
} else if (argMap.patch) {
  newVersion = `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
} else {
  // Default: bump patch
  newVersion = `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

const buildNumber = (argMap.build && argMap.build !== true)
  ? String(argMap.build)
  : (process.env.BUILD_NUMBER || String(Date.now()));

console.log(`Version: ${currentVersion} → ${newVersion}`);
console.log(`Build:   ${buildNumber}`);

// ─── Update package.json ──────────────────────────────────────────────────────

pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('✓ Updated package.json');

// ─── Update app.json ──────────────────────────────────────────────────────────

appJson.version = newVersion;
appJson.buildNumber = buildNumber;
appJson.versionCode = buildNumber;
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n', 'utf8');
console.log('✓ Updated app.json');

// ─── Update android/app/build.gradle (if present) ─────────────────────────────

const gradlePath = path.join(ROOT, 'android', 'app', 'build.gradle');
if (fs.existsSync(gradlePath)) {
  let gradle = fs.readFileSync(gradlePath, 'utf8');
  gradle = gradle.replace(
    /versionCode\s+\d+/,
    `versionCode ${buildNumber}`,
  );
  gradle = gradle.replace(
    /versionName\s+"[^"]+"/,
    `versionName "${newVersion}"`,
  );
  fs.writeFileSync(gradlePath, gradle, 'utf8');
  console.log('✓ Updated android/app/build.gradle');
}

// ─── Update ios/*/Info.plist (if present) ─────────────────────────────────────

const infoPlistPath = path.join(ROOT, 'ios', 'iMediaSave', 'Info.plist');
if (fs.existsSync(infoPlistPath)) {
  let plist = fs.readFileSync(infoPlistPath, 'utf8');
  plist = plist.replace(
    /(<key>CFBundleShortVersionString<\/key>\s*<string>)[^<]+(<\/string>)/,
    `$1${newVersion}$2`,
  );
  plist = plist.replace(
    /(<key>CFBundleVersion<\/key>\s*<string>)[^<]+(<\/string>)/,
    `$1${buildNumber}$2`,
  );
  fs.writeFileSync(infoPlistPath, plist, 'utf8');
  console.log('✓ Updated ios Info.plist');
}

console.log('\nVersion bump complete.');
