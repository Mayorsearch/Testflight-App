# iMediaSave Mobile — Release Runbook

This document describes the step-by-step process to release a new version of iMediaSave to TestFlight (iOS) and Google Play Internal (Android).

---

## Overview

| Track | Platform | Workflow | Environment Gate |
|-------|----------|----------|-----------------|
| Beta / QA | iOS → TestFlight | `iOS → TestFlight` | `production` (manual approval) |
| Beta / QA | Android → Play Internal | `Android → Play Internal` | `production` (manual approval) |

---

## Pre-release Checklist

Before triggering a release, confirm:

- [ ] All feature PRs are merged to `main`
- [ ] CI passes on `main` (lint / test / build-check all green)
- [ ] Product owner has signed off on the build
- [ ] `CHANGELOG.md` has been updated with release notes
- [ ] Version number is agreed (`MAJOR.MINOR.PATCH`)
- [ ] All required GitHub Secrets are configured (see `docs/CODE_SIGNING.md`)

---

## Step 1 — Create a Release Branch

```bash
# From main, create a release branch
git checkout main
git pull origin main
git checkout -b release/1.2.0
git push origin release/1.2.0
```

Pushing to `release/**` automatically triggers both deploy workflows.
Alternatively, trigger manually (Step 2).

---

## Step 2 — Trigger Deployments Manually (Optional)

### iOS → TestFlight

1. Go to **Actions → iOS → TestFlight**.
2. Click **Run workflow**.
3. Fill in:
   - **Version name**: `1.2.0`
   - **Release notes**: e.g. `"Fix login screen crash, add dark mode support"`
4. Click **Run workflow**.
5. Approve the `production` environment gate when prompted.

### Android → Play Internal

1. Go to **Actions → Android → Play Internal**.
2. Click **Run workflow**.
3. Fill in the same version and notes.
4. Approve the `production` environment gate.

---

## Step 3 — Monitor the Workflow

1. Watch the workflow run in **Actions**.
2. Check the Slack `#deployments` channel for success/failure notifications.
3. If the workflow fails:
   - Check the logs in Actions → failed job.
   - See the Troubleshooting section below or follow [ROLLBACK_RUNBOOK.md](./ROLLBACK_RUNBOOK.md).

---

## Step 4 — Verify on TestFlight / Play Console

### iOS (TestFlight)
1. Log into [App Store Connect](https://appstoreconnect.apple.com).
2. Go to **My Apps → iMediaSave → TestFlight**.
3. Wait for Apple to finish processing (usually 5–30 minutes).
4. Confirm the build appears under the correct version.
5. Add internal testers or distribute to external testing groups.

### Android (Play Console)
1. Log into [Google Play Console](https://play.google.com/console).
2. Go to **iMediaSave → Testing → Internal testing**.
3. Confirm the build appears.
4. Opt-in internal testers to the track.

---

## Step 5 — Tag the Release

```bash
git tag v1.2.0
git push origin v1.2.0
```

Update `CHANGELOG.md` to move `[Unreleased]` to the new version section.

---

## Step 6 — Promote to Production (App Store / Play Production)

> Only after QA sign-off and stakeholder approval.

### iOS → App Store
```bash
bundle exec fastlane ios release
```
Or submit manually from App Store Connect review.

### Android → Production
```bash
bundle exec fastlane android promote
```
Or promote from Play Console: Testing → Internal → Promote release.

---

## Versioning Convention

| Change Type | Version Bump | Example |
|-------------|-------------|---------|
| Bug fix | Patch | `1.0.0 → 1.0.1` |
| New feature | Minor | `1.0.1 → 1.1.0` |
| Breaking change | Major | `1.1.0 → 2.0.0` |

Build number = GitHub Actions `run_number` (auto-increments with every CI run).

```bash
# Manual local bump
node scripts/bump-version.js --version 1.2.0 --build 100
node scripts/bump-version.js --patch   # auto-increments patch
node scripts/bump-version.js --minor   # auto-increments minor
```

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `match: no profile found` | Match certs repo not configured | Run `bundle exec fastlane match appstore` locally first |
| `upload_to_testflight: API key error` | `APP_STORE_CONNECT_API_KEY_JSON` is malformed | Regenerate the key JSON — ensure the `key` field has `\n` not literal newlines |
| `upload_to_play_store: 401` | Service account lacks permissions | Add **Release Manager** role to the service account in Play Console |
| `Gradle build failed: keystore` | Keystore base64 is invalid | Re-encode: `base64 -w 0 release.keystore` and update the secret |
| Slack notification not received | `SLACK_WEBHOOK_URL` not set | Add the secret to the `production` environment |
