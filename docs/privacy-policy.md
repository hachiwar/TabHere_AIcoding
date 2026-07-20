# Privacy Policy for TabHere

Effective date: 2026-07-18

TabHere Desktop sends text copied with Ctrl+C to the AI API endpoint configured by the user and writes the answer to the system clipboard.

## Data processing

- While enabled, the application reacts to every physical Ctrl+C press in any Windows application and sends newly copied plain text to the configured AI provider.
- Ctrl+C is ignored while TabHere's own settings window is in the foreground, preventing accidental submission of the API key.
- Copying from an editable field follows the same rule, including password, one-time-code, and payment-related fields.
- Repeatedly copying the same text creates a new request each time.
- The AI response replaces the current system clipboard contents. No prompt or response history is stored.
- The API key is encrypted for the current Windows user with Windows Data Protection API (DPAPI).
- Settings and diagnostic logs are stored under `%APPDATA%\\TabHere`; logs do not include clipboard text.
- The application starts when the user signs in unless startup is disabled in its settings.

The configured AI provider's privacy and retention policies apply. TabHere does not operate a developer-controlled server.

Users can remove stored settings by deleting `%APPDATA%\\TabHere`.

Questions may be submitted at https://github.com/hachiwar/TabHere_AIcoding/issues.
