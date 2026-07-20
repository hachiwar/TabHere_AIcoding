# TabHere

TabHere 是一个 Chrome 扩展：在网页中复制编程题描述后，扩展会把题目发送给你配置的 AI 服务，再将完整的 Java 17 `public class Main` 程序写入系统剪贴板。

图标角标从 `...` 变为 `✓` 后，即可在任意位置按 Ctrl+V 粘贴生成的 Java 代码；角标为 `!` 表示请求失败。

## 开发

```bash
npm install
npm run verify
npm run typecheck
npm run build
npm run package
```

在 `chrome://extensions/` 中启用开发者模式，选择“加载已解压的扩展程序”，然后选择项目根目录。
