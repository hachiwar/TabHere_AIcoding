# TabHere Desktop

Windows 独立桌面版，不依赖 Chrome。程序运行后监听全局实体 `Ctrl+C`，把复制的纯文本发送给配置的 AI 服务，并将生成的 Java 17 `public class Main` 写回系统剪贴板。

## 使用

1. 运行 `TabHereDesktop.exe`。
2. 首次运行填写 API Key、Base URL 和模型 ID。
3. 在任意 Windows 程序中选中题面并按 `Ctrl+C`。
4. 收到“Java 代码已写入剪贴板”通知后直接粘贴。

使用桌面版前请在 `chrome://extensions/` 中停用已安装的 TabHere 扩展，否则在 Chrome 内复制时两者都会调用 AI。

托盘菜单可以暂停监听、打开设置或退出。默认启用监听并随 Windows 登录自动启动；API Key 使用 Windows DPAPI 加密后保存到当前用户的 `%APPDATA%\TabHere`。
为避免泄露 API Key，TabHere 自己的设置窗口位于前台时不触发监听。

连续复制相同文本仍会重新调用 AI。快速连续复制时，每次都会发起请求，但只有最后一次复制的结果可以覆盖剪贴板。

## 构建

在 PowerShell 中运行：

```powershell
.\desktop\build.ps1
```

产物为 `release\TabHereDesktop.exe`，目标机器无需安装 Python。
