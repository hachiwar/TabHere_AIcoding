import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [background, content, config, types, offscreen, manifestText] = await Promise.all([
  readFile(new URL("../src/background.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/content.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/shared/config.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/shared/types.ts", import.meta.url), "utf8"),
  readFile(new URL("../src/offscreen/offscreen.ts", import.meta.url), "utf8"),
  readFile(new URL("../manifest.json", import.meta.url), "utf8")
]);
const manifest = JSON.parse(manifestText);

assert(content.includes('"copy"'), "content script must listen for copy events");
assert(content.includes("event.isTrusted"), "synthetic page events must not trigger AI requests");
assert(content.includes("selectionStart") && content.includes("window.getSelection()"), "input and page selections must be supported");
assert(!content.includes("preventDefault"), "normal copying must remain unchanged while AI runs");
assert(content.includes('chrome.runtime.connect({ name: "tabhere-answer" })'), "AI requests must keep a persistent port");
assert(content.includes("TABHERE_PING"), "the request port must keep the service worker alive");
assert(content.includes("if (disconnected) return") && content.includes("catch"), "disconnected ports must not be reused");
assert(background.includes("latestRequestId !== message.requestId"), "an older response must not overwrite a newer copy");
assert(background.includes("REQUEST_TIMEOUT_MS = 300_000") && background.includes("maxRetries: 0"), "AI requests must allow five minutes without retrying failed connections");
assert(background.includes("chrome.action.setTitle"), "the badge tooltip must expose the current status or error");
assert(background.includes("activeRequest?.abort()"), "a stale AI request must be cancelled");
assert(background.includes("ICPC-level competitive-programming solver") && background.includes("complete executable code"), "the Java generation prompt must require a complete competitive-programming solution");
assert(background.includes("Correctness has the highest priority") && background.includes("at most 15 lines of // comments") && background.includes("Never output exploratory reasoning"), "the prompt must prioritize correct complete code over bounded final-solution comments");
assert(background.includes('reasoning: { effort: "medium" }') && background.includes('text: { verbosity: "low" }'), "GPT-5 requests must balance correctness with concise output");
assert(background.includes("Math.min(config.temperature, 0.2)"), "code generation randomness must stay low");
assert(background.includes('DEEPSEEK_MODEL = "deepseek-v4-pro"') && background.includes("DEEPSEEK_MAX_TOKENS = 16_384") && background.includes('thinking: { type: "disabled"'), "DeepSeek must use the requested bounded non-thinking model");
assert(background.includes("```java(?:\\r?\\n)?([\\s\\S]*?)```") && background.includes("?.[1] ?? text"), "a Java Markdown fence must be extracted while unfenced output stays whole");
assert(!background.includes("AI did not return a complete Java Main source file") && !background.includes("finish_reason === \"length\""), "every successful AI output must be copied without content validation");
assert(!`${config}\n${types}`.match(/userInstructions|maxOutputTokens|debounceMs|minTriggerChars|shortcutKey|disabledSites|enabledSites|developerDebug|EditorBridge/), "legacy autocomplete settings must stay removed");
assert(background.includes("chrome.offscreen.createDocument"), "clipboard writes must use an offscreen document");
assert(offscreen.includes('document.execCommand("copy")'), "offscreen document must write the AI answer");
assert(manifest.permissions.includes("offscreen") && manifest.permissions.includes("clipboardWrite"), "clipboard permissions are required");
assert(manifest.content_scripts.length === 1 && manifest.content_scripts[0].js.includes("dist/content.js"), "only the copy listener should be injected");

console.log("Copy-to-AI clipboard checks passed");
