import type { AnswerRequestMessage, AnswerResultMessage } from "./shared/types";

const REQUEST_TIMEOUT_MS = 310_000;

function copiedText(event: ClipboardEvent): string {
  for (const node of event.composedPath()) {
    if (!(node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement)) continue;
    const start = node.selectionStart;
    const end = node.selectionEnd;
    if (start !== null && end !== null && end > start) return node.value.slice(start, end);
  }
  return window.getSelection()?.toString() || "";
}

function requestAnswer(selectedText: string) {
  const port = chrome.runtime.connect({ name: "tabhere-answer" });
  const requestId = crypto.randomUUID();
  let disconnected = false;
  const keepAlive = window.setInterval(() => {
    if (disconnected) return;
    try {
      port.postMessage({ type: "TABHERE_PING" });
    } catch {
      cleanup();
    }
  }, 20_000);
  const timeout = window.setTimeout(() => {
    if (disconnected) return;
    try {
      port.disconnect();
    } catch {
      cleanup();
    }
  }, REQUEST_TIMEOUT_MS);

  function cleanup() {
    if (disconnected) return;
    disconnected = true;
    window.clearInterval(keepAlive);
    window.clearTimeout(timeout);
  }

  port.onMessage.addListener((message: AnswerResultMessage) => {
    if (message?.type !== "TABHERE_ANSWER_RESULT" || message.requestId !== requestId) return;
    if (message.error) console.error("TabHere AI request failed", message.error);
    try {
      port.disconnect();
    } catch {
      cleanup();
    }
  });
  port.onDisconnect.addListener(cleanup);
  try {
    port.postMessage({ type: "TABHERE_REQUEST_ANSWER", requestId, selectedText } satisfies AnswerRequestMessage);
  } catch {
    cleanup();
  }
}

document.addEventListener(
  "copy",
  (event) => {
    if (!event.isTrusted) return;
    const selectedText = copiedText(event).trim();
    if (selectedText) requestAnswer(selectedText);
  },
  true
);
