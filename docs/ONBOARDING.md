# iMediaSave Mobile — Developer Onboarding

Welcome to the iMediaSave mobile app repository. This guide gets you from zero to running the app on a simulator in under 15 minutes.

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 18 | [nvm](https://github.com/nvm-sh/nvm) |
| Yarn | ≥ 1.22 | `npm i -g yarn` |
| Ruby | ≥ 3.2 | [rbenv](https://github.com/rbenv/rbenv) |
| Bundler | ≥ 2.4 | `gem install bundler` |
| Xcode | ≥ 15 (iOS) | Mac App Store |
| Android Studio | Latest (Android) | [developer.android.com](https://developer.android.com/studio) |
| CocoaPods | ≥ 1.14 | `sudo gem install cocoapods` |

---

## 1. Clone & Install

```bash
git clone https://github.com/Mayorsearch/Testflight-App.git
cd Testflight-App

# Install JS dependencies
yarn install

# Install Ruby gems (Fastlane + plugins)
bundle install

# Install iOS CocoaPods
cd ios && pod install && cd ..
```

---

## 2. Configure Environment

```bash
# Copy example env files
cp .env.dev.example .env.dev
cp .env.staging.example .env.staging
cp .env.prod.example .env.prod

# Edit .env.dev and fill in real API URL, feature flags, etc.
```

> **Never commit `.env.dev`, `.env.staging`, or `.env.prod`** — they are in `.gitignore`.

---

## 3. Run on iOS Simulator

```bash
# Start Metro bundler (terminal 1)
yarn start

# Run on iOS (terminal 2)
yarn ios
```

---

## 4. Run on Android Emulator

```bash
# Start Metro bundler (terminal 1)
yarn start

# Run on Android (terminal 2)
yarn android
```

> Make sure you have an Android emulator running (AVD Manager in Android Studio).

---

## 5. Run Tests

```bash
yarn test              # run all Jest tests
yarn test --watch      # watch mode
yarn test --coverage   # with coverage report
```

---

## 6. Lint & Type-check

```bash
yarn lint              # ESLint
yarn type-check        # TypeScript
yarn validate          # lint + type-check + tests (same as CI)
```

---

## 7. Fastlane (local)

```bash
# iOS — run unit tests
bundle exec fastlane ios tests

# Android — run unit tests
bundle exec fastlane android tests
```

---

## 8. Project Structure

```
iMediaSave/
├── App.tsx                    # Root component
├── index.js                   # App entry point
├── app.json                   # App name, bundle IDs, versioning
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
│
├── src/
│   ├── theme/                 # Color, typography, spacing tokens
│   │   ├── colors.ts          # ← Update iMediaSave brand colors here
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   └── index.ts
│   ├── config/                # Environment config + validation
│   │   ├── env.ts
│   │   └── index.ts
│   ├── components/            # Shared UI components
│   ├── screens/               # Screen-level components
│   ├── navigation/            # Navigation configuration
│   └── __tests__/             # Unit tests
│
├── fastlane/
│   ├── Fastfile               # iOS + Android lanes
│   ├── Appfile                # App identifiers
│   ├── Matchfile              # Code signing sync config
│   └── Pluginfile             # Fastlane plugins
│
├── .github/
│   └── workflows/
│       ├── ci.yml             # Lint / test / build check
│       ├── ios-testflight.yml # iOS → TestFlight
│       └── android-play.yml   # Android → Play Internal
│
├── scripts/
│   └── bump-version.js        # Version bump automation
│
└── docs/
    ├── ONBOARDING.md          # This file
    ├── CODE_SIGNING.md        # Certs & credentials setup
    ├── RELEASE_RUNBOOK.md     # Step-by-step release process
    └── ROLLBACK_RUNBOOK.md    # Rollback procedures
```

---

## 9. Brand Theme

The iMediaSave brand color tokens are in `src/theme/colors.ts`.

Current values are scaffolded placeholders. To update them:

1. Open [https://www.imediasave.com](https://www.imediasave.com) in a browser.
2. Open DevTools → Inspector and capture exact hex values for:
   - Primary navigation background
   - CTA button color
   - Body background
   - Text colors
3. Update `src/theme/colors.ts` accordingly.
4. Commit with message: `theme: update iMediaSave brand tokens`

---

## 10. Adding a New Screen

1. Create `src/screens/MyScreen.tsx`
2. Register it in `src/navigation/AppNavigator.tsx`
3. Add a test in `src/__tests__/MyScreen.test.tsx`

---

## Getting Help

Open an issue at [github.com/Mayorsearch/Testflight-App/issues](https://github.com/Mayorsearch/Testflight-App/issues) or reach out to the mobile platform team.
