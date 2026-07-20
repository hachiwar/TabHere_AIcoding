# TabHere Desktop

TabHere Desktop is a standalone Windows assistant for competitive programming. It watches for physical `Ctrl+C` presses in any application, sends the copied plain text to your configured AI provider, and replaces the clipboard with a complete Java 17 `public class Main` solution.

Chrome is not required. If the old TabHere Chrome extension is installed, disable it in `chrome://extensions/` to avoid duplicate requests inside Chrome.

## Use

1. Run `release/TabHereDesktop.exe`.
2. Enter the API key, OpenAI-compatible Base URL, and model ID on first launch.
3. Copy a programming problem with `Ctrl+C` in any Windows application.
4. Paste after the tray notification confirms that the Java answer is ready.

The tray menu provides pause/resume, settings, and exit. Monitoring and Windows sign-in startup are enabled by default. The API key is protected with Windows DPAPI.

See [desktop/README.zh.md](./desktop/README.zh.md) for Chinese documentation and [docs/privacy-policy.md](./docs/privacy-policy.md) for data-handling details.

## Build

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\desktop\build.ps1
```

The standalone executable is written to `release/TabHereDesktop.exe`; Python is not required on the target computer.

## License

[MIT](./LICENSE)
