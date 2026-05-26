# iMediaSave Mobile — Rollback Runbook

This document describes rollback procedures for TestFlight, Google Play, and production App Store releases.

---

## Decision Tree

```
Issue reported in production?
│
├─► Crash / regression in latest build?
│   │
│   ├─► YES → Roll back to previous build (see Section 1 / 2)
│   └─► NO  → Investigate further; hotfix via standard release
│
└─► Issue in TestFlight / Internal test build?
    │
    └─► Remove the build from testing (see Section 3)
```

---

## Section 1 — iOS Rollback

### Option A: Re-enable a Previous App Store Build (Fastest)

If you previously submitted an older build version, you can re-submit it without a new binary.

1. Log into [App Store Connect](https://appstoreconnect.apple.com).
2. Navigate to **My Apps → iMediaSave → App Store**.
3. Click **+ Version or Platform** (or edit the existing submission).
4. In the build selector, choose the last known-good build.
5. Add rollback release notes: `"Reverted to version X.Y.Z due to [issue description]."`
6. Submit for expedited review (Apple's **Emergency App Store Review**: [https://developer.apple.com/contact/app-store/?topic=expedite](https://developer.apple.com/contact/app-store/?topic=expedite)).

> Apple typically processes expedited reviews within 24–48 hours for critical issues.

### Option B: Remove Current TestFlight Build

If the issue is only in TestFlight and not in production:

1. App Store Connect → TestFlight → Build.
2. Set the build to **Expired** — testers can no longer install it.
3. Upload a hotfix build using the standard release process.

### Option C: Fastlane Rollback (Submit Previous Build)

```bash
# Trigger previous build upload manually
BUILD_NUMBER=<previous-good-build-number> \
VERSION_NAME=<previous-version> \
  bundle exec fastlane ios beta
```

---

## Section 2 — Android Rollback

### Option A: Halt a Staged Rollout (Fastest)

If you used staged rollout:

1. [Google Play Console](https://play.google.com/console) → **iMediaSave → Production**.
2. Click the release → **Halt rollout**.
3. Users who already installed the new version will remain on it; no new installs will get it.

### Option B: Roll Back to Previous Release

1. Google Play Console → **iMediaSave → Production**.
2. Find the previous release version.
3. Click **Re-activate** (or use **Promote** from the previous version's track).

> Note: Google Play does not allow downgrading `versionCode`. The rollback build must have a higher `versionCode` than the broken build.

**Workaround for versionCode constraint:**

```bash
# Use a build number higher than the broken build
# e.g., broken build = 105, good code = v1.1.0 → roll out as v1.1.0-rollback with build 106
node scripts/bump-version.js --version 1.1.0 --build 106
bundle exec fastlane android beta
```

### Option C: Fastlane Rollback

```bash
ANDROID_PACKAGE_NAME=com.imediasave.app \
BUILD_NUMBER=<higher-than-broken-build> \
VERSION_NAME=<rollback-version> \
  bundle exec fastlane android beta
```

---

## Section 3 — Rollback from TestFlight / Internal Track

### iOS TestFlight

- Go to App Store Connect → TestFlight → Build → **Expire Build**.
- Testers cannot install or reinstall the expired build.
- Upload a corrected build as per the standard release process.

### Android Play Internal

- Go to Play Console → Testing → Internal testing → Edit release → **Pause release**.
- Upload a corrected build.

---

## Section 4 — Hotfix Process

For critical production bugs that need same-day resolution:

```bash
# Cut hotfix branch from the last release tag
git checkout v1.2.0
git checkout -b hotfix/1.2.1-crash-fix

# Make the fix, commit, and push
git add .
git commit -m "fix: resolve login crash on iOS 17"
git push origin hotfix/1.2.1-crash-fix

# Open a PR → main AND release/1.2.x (cherry-pick if needed)
# Once merged, trigger the deploy workflows manually (see RELEASE_RUNBOOK.md)
```

---

## Communication Template

Use this template to communicate incidents:

```
**[INCIDENT] iMediaSave vX.Y.Z — [Platform] — [Short description]**

Status: Investigating / Mitigating / Resolved
Affected: iOS / Android / Both
Severity: P1 (production broken) / P2 (degraded) / P3 (minor)

Summary: [1-2 sentences]

Impact: [Who is affected and how]

Current action: [What is being done right now]

ETA for fix: [Time estimate]

Updates: #incidents channel
```

---

## Post-Mortem

After every P1 incident, hold a blameless post-mortem within 48 hours:

1. **Timeline** — What happened and when?
2. **Root cause** — Why did it happen?
3. **Detection** — How was it discovered? How long before detection?
4. **Resolution** — How was it fixed?
5. **Prevention** — What process/automation change prevents this class of issue?

Document findings in a GitHub issue labelled `post-mortem`.
