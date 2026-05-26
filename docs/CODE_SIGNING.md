# iMediaSave Mobile — Code Signing & Credential Setup

This document covers every secret and credential you need to configure for iOS TestFlight and Android Play Internal deployments.

---

## GitHub Environments Setup

All production secrets live in the **`production`** GitHub Environment, which requires **manual approval** before any deployment workflow runs.

### Creating the Environment

1. Go to **Settings → Environments → New environment**.
2. Name it `production`.
3. Enable **Required reviewers** and add at least one reviewer.
4. Add all secrets from the tables below.

---

## iOS Secrets

### Required GitHub Secrets

| Secret Name | Description | How to Obtain |
|-------------|-------------|---------------|
| `APPLE_ID` | Apple ID email used for App Store Connect | Your Apple developer account email |
| `APPLE_TEAM_ID` | 10-char Apple Developer Team ID | [developer.apple.com/account](https://developer.apple.com/account) → Membership |
| `APP_STORE_CONNECT_TEAM_ID` | App Store Connect team ID (often same as APPLE_TEAM_ID) | App Store Connect → Users & Access |
| `IOS_BUNDLE_ID` | Production bundle identifier | `com.imediasave.app` (confirm in App Store Connect) |
| `APP_STORE_CONNECT_API_KEY_JSON` | JSON blob of App Store Connect API key | See below |
| `MATCH_GIT_URL` | HTTPS URL of the private certs repository | Create a private GitHub repo, e.g. `https://github.com/YourOrg/iMediaSave-certs` |
| `MATCH_PASSWORD` | Passphrase to encrypt/decrypt the certs repo | Generate a strong random password; store it securely |
| `PROD_API_BASE_URL` | Production API base URL | `https://api.imediasave.com` |

### Creating App Store Connect API Key

1. Log into [App Store Connect](https://appstoreconnect.apple.com).
2. Go to **Users and Access → Keys → App Store Connect API**.
3. Click **+** to generate a new key with **App Manager** role.
4. Download the `.p8` file (only downloadable once!).
5. Build the JSON blob in this format and store as `APP_STORE_CONNECT_API_KEY_JSON`:

```json
{
  "key_id": "XXXXXXXXXX",
  "issuer_id": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----",
  "in_house": false
}
```

### Setting Up Fastlane Match (Certificate Sync)

Match syncs your signing certificates and provisioning profiles through a private Git repository.

```bash
# First-time setup (run locally, NOT in CI)
bundle exec fastlane match init

# Generate App Store certificates + profiles
bundle exec fastlane match appstore --readonly false

# After setup, CI always runs in readonly mode
```

> ⚠️ **The certs repository must be private.** Never commit certificates to the app repository.

---

## Android Secrets

### Required GitHub Secrets

| Secret Name | Description | How to Obtain |
|-------------|-------------|---------------|
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded release keystore | `base64 -w 0 release.keystore` |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password | Set when creating the keystore |
| `ANDROID_KEY_ALIAS` | Key alias within the keystore | Set when creating the keystore |
| `ANDROID_KEY_PASSWORD` | Key password | Set when creating the keystore |
| `GOOGLE_PLAY_JSON_KEY` | Service account JSON for Play API | See below |
| `ANDROID_PACKAGE_NAME` | Android package name | `com.imediasave.app` |

### Creating the Release Keystore

```bash
# Generate a new keystore (run once, store securely)
keytool -genkey -v \
  -keystore imediasave-release.keystore \
  -alias imediasave-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Encode for GitHub Secret
base64 -w 0 imediasave-release.keystore | pbcopy
# Paste into ANDROID_KEYSTORE_BASE64 secret
```

> ⚠️ **Store the keystore file securely offline.** If you lose it, you CANNOT update the app on Play Store.

### Creating Google Play Service Account

1. Go to [Google Play Console](https://play.google.com/console) → **Setup → API access**.
2. Link to a Google Cloud project (or create one).
3. Create a **Service Account** with **Release Manager** role.
4. Download the JSON key file.
5. Store the entire JSON content as `GOOGLE_PLAY_JSON_KEY` secret.

---

## Slack Webhook (Notifications)

| Secret Name | Description | How to Obtain |
|-------------|-------------|---------------|
| `SLACK_WEBHOOK_URL` | Incoming webhook URL | [Slack API → Incoming Webhooks](https://api.slack.com/messaging/webhooks) |

---

## Secret Rotation

- Rotate `MATCH_PASSWORD` and re-encrypt the certs repo if it is ever exposed.
- Rotate App Store Connect API keys from App Store Connect → Keys.
- For Android, new keystores require a new app listing — **never lose the original**.
- Service account JSON keys can be deleted and recreated from Google Cloud Console.

---

## Local Development (Never Commit)

For local development only, copy secrets into your shell profile or use a `.env.dev` file:

```bash
# ~/.zshrc or ~/.bashrc (local machine only)
export MATCH_GIT_URL="https://github.com/YourOrg/iMediaSave-certs"
export MATCH_PASSWORD="your-passphrase"
export APPLE_ID="you@example.com"
```
