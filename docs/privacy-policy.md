# Privacy Policy for TabHere

Effective date: 2026-07-18

TabHere sends copied webpage text to the AI API endpoint configured by the user and writes the answer to the system clipboard.

## Data processing

- When the user copies selected webpage text, TabHere sends only that selected text to the configured AI provider.
- Copying selected text from an editable field follows the same rule, including password, one-time-code, and payment-related fields.
- It does not send the page title, URL, surrounding page content, field metadata, browsing history, or telemetry.
- API settings are stored in `chrome.storage.local` or `chrome.storage.sync`, according to the user's sync choice.
- The AI response replaces the current system clipboard contents. No prompt or response history is stored by the extension.

The configured AI provider's privacy and retention policies apply. TabHere does not operate a developer-controlled server.

Users can remove stored settings by clearing the extension's storage or uninstalling it.

Questions may be submitted at https://github.com/scarletkc/TabHere/issues.
