# TabHere

[![Release](https://img.shields.io/github/v/release/scarletkc/TabHere?style=flat-square)](https://github.com/scarletkc/TabHere/releases)

**English** | **[中文](./docs/README.zh.md)**

---

TabHere is a Chrome extension that sends a copied programming problem to your configured AI provider and writes a complete Java 17 `public class Main` solution back to the system clipboard.

Select a problem description on a webpage and copy it. When the extension badge changes from `...` to `✓`, paste the generated Java code anywhere with Ctrl+V. A `!` badge means the request failed.

## Development

```bash
npm install
npm run build     # output to dist/
npm run dev       # watch mode
npm run package   # build release package
npm run version:set -- x.y.z  # set version
```

In `chrome://extensions/` → enable **Developer mode** → **Load unpacked**, then select the project root directory.

## Links

- [Chrome Web Store](https://chromewebstore.google.com/detail/oeokpncnejjfjdbpnchhldjdabhppnlb)
- [Privacy Policy](https://github.com/scarletkc/TabHere/blob/main/docs/privacy-policy.md)
- [Roadmap](./docs/roadmap.md)
- [MIT License](./LICENSE)
