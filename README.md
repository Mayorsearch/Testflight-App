# iMediaSave Mobile App

> Production-ready React Native (TypeScript) mobile application for iOS and Android,
> implementing the iMediaSave brand with full CI/CD delivery to TestFlight and Google Play.

[![CI](https://github.com/Mayorsearch/Testflight-App/actions/workflows/ci.yml/badge.svg)](https://github.com/Mayorsearch/Testflight-App/actions/workflows/ci.yml)

---

## Quick Start

```bash
git clone https://github.com/Mayorsearch/Testflight-App.git
cd Testflight-App
yarn install
bundle install
cp .env.dev.example .env.dev   # fill in API URL + feature flags
cd ios && pod install && cd ..
yarn ios       # run on iOS Simulator
yarn android   # run on Android Emulator
```

See **[docs/ONBOARDING.md](docs/ONBOARDING.md)** for the full setup guide.

---

## Architecture

```
src/
├── theme/          # Color, typography, spacing tokens (iMediaSave brand)
├── config/         # Runtime env config + validation (dev / staging / prod)
├── components/     # Shared UI components
├── screens/        # Screen-level components
└── navigation/     # Navigation tree
```

### Brand Theme

iMediaSave brand tokens live in `src/theme/colors.ts`. Current values are
scaffolded placeholders — see the file header for instructions on updating
them with exact values from [imediasave.com](https://www.imediasave.com).

### Environment Strategy

| File | Purpose |
|------|---------|
| `.env.dev.example` | Development config template |
| `.env.staging.example` | Staging config template |
| `.env.prod.example` | Production config template |

Copy, rename (remove `.example`), and fill in values. Real env files are
git-ignored. CI injects values via GitHub Actions environment variables.

---

## CI/CD Pipelines

| Workflow | Trigger | Description |
|----------|---------|-------------|
| **CI** | Push / PR to `main`, `release/**` | Lint, type-check, Jest tests, iOS/Android build sanity |
| **iOS → TestFlight** | Push to `release/**` or manual | Build signed IPA + upload to TestFlight |
| **Android → Play Internal** | Push to `release/**` or manual | Build signed AAB + upload to Play Internal track |

Both deploy workflows require **manual approval** via the `production` GitHub Environment.

### Release Flow

```
feature branch → PR → main → release/X.Y.Z → CI → (approval) → TestFlight / Play Internal
```

---

## Required GitHub Secrets

All secrets belong to the **`production`** GitHub Environment.

### iOS

| Secret | Description |
|--------|-------------|
| `APPLE_ID` | Apple ID email |
| `APPLE_TEAM_ID` | 10-char Apple Developer Team ID |
| `APP_STORE_CONNECT_TEAM_ID` | App Store Connect team ID |
| `IOS_BUNDLE_ID` | Bundle identifier (`com.imediasave.app`) |
| `APP_STORE_CONNECT_API_KEY_JSON` | JSON blob of App Store Connect API key |
| `MATCH_GIT_URL` | URL of private certificates repository |
| `MATCH_PASSWORD` | Passphrase to decrypt certificates repository |
| `PROD_API_BASE_URL` | Production API base URL |

### Android

| Secret | Description |
|--------|-------------|
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded release keystore |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password |
| `ANDROID_KEY_ALIAS` | Key alias |
| `ANDROID_KEY_PASSWORD` | Key password |
| `GOOGLE_PLAY_JSON_KEY` | Google Play service account JSON |
| `ANDROID_PACKAGE_NAME` | Package name (`com.imediasave.app`) |

### Shared

| Secret | Description |
|--------|-------------|
| `SLACK_WEBHOOK_URL` | Slack incoming webhook for deploy notifications |

See **[docs/CODE_SIGNING.md](docs/CODE_SIGNING.md)** for step-by-step credential setup.

---

## Versioning

Version and build numbers are managed by `scripts/bump-version.js`.

```bash
# Bump patch (1.0.0 → 1.0.1)
node scripts/bump-version.js --patch

# Bump minor (1.0.1 → 1.1.0)
node scripts/bump-version.js --minor

# Set explicit version + build
node scripts/bump-version.js --version 2.0.0 --build 99
```

In CI, `BUILD_NUMBER` = GitHub Actions `run_number` (auto-increments with each run).

---

## Fastlane Lanes

```bash
bundle exec fastlane ios tests          # Run iOS tests
bundle exec fastlane ios beta           # Build + upload to TestFlight
bundle exec fastlane android tests      # Run Android tests
bundle exec fastlane android beta       # Build + upload to Play Internal
bundle exec fastlane android promote    # Promote Internal → Alpha
```

---

## Documentation

| Document | Description |
|----------|-------------|
| [ONBOARDING.md](docs/ONBOARDING.md) | Developer setup guide |
| [CODE_SIGNING.md](docs/CODE_SIGNING.md) | iOS + Android credentials and code signing setup |
| [RELEASE_RUNBOOK.md](docs/RELEASE_RUNBOOK.md) | Step-by-step release process |
| [ROLLBACK_RUNBOOK.md](docs/ROLLBACK_RUNBOOK.md) | Rollback procedures |
| [CHANGELOG.md](CHANGELOG.md) | Version history |

---

## Contributing

1. Branch off `main`: `git checkout -b feat/my-feature`
2. Make changes and add tests.
3. Run `yarn validate` (lint + type-check + tests) — must pass before PR.
4. Open a PR → `main`.

---

## License

Proprietary — © iMediaSave. All rights reserved.
