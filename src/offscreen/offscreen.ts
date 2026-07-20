import type { ClipboardWriteMessage, ClipboardWriteResult } from "../shared/types";

const clipboard = document.getElementById("clipboard") as HTMLTextAreaElement;

chrome.runtime.onMessage.addListener(
  (message: ClipboardWriteMessage, _sender, sendResponse: (response: ClipboardWriteResult) => void) => {
    if (message?.type !== "TABHERE_WRITE_CLIPBOARD" || message.target !== "offscreen") return;
    clipboard.value = message.text;
    clipboard.select();
    const ok = document.execCommand("copy");
    sendResponse({ ok, error: ok ? undefined : "Browser rejected the clipboard write" });
  }
);
