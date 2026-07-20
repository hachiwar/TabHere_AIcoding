import type { TabHereConfig } from "./types";

const buildEnv = (import.meta as ImportMeta & { env?: Record<string, string> }).env ?? {};

const DEFAULT_CONFIG: TabHereConfig = {
  apiKey: buildEnv.VITE_TABHERE_API_KEY || undefined,
  model: buildEnv.VITE_TABHERE_MODEL || "gpt-5-nano",
  baseUrl: buildEnv.VITE_TABHERE_BASE_URL || "https://api.openai.com/v1",
  temperature: 0.2,
  useSync: true
};

const CONFIG_KEYS = ["tabhere_api_key", "tabhere_model", "tabhere_base_url", "tabhere_temperature"];

function normalizeTemperature(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value)
    ? Math.min(Math.max(value, 0), 0.2)
    : DEFAULT_CONFIG.temperature;
}

export async function getConfig(): Promise<TabHereConfig> {
  const sync = await chrome.storage.sync.get("tabhere_use_sync");
  const useSync = sync.tabhere_use_sync ?? DEFAULT_CONFIG.useSync;
  const stored = await (useSync ? chrome.storage.sync : chrome.storage.local).get(CONFIG_KEYS);

  return {
    apiKey: buildEnv.VITE_TABHERE_API_KEY || stored.tabhere_api_key,
    model: buildEnv.VITE_TABHERE_MODEL || stored.tabhere_model || DEFAULT_CONFIG.model,
    baseUrl: buildEnv.VITE_TABHERE_BASE_URL || stored.tabhere_base_url || DEFAULT_CONFIG.baseUrl,
    temperature: normalizeTemperature(stored.tabhere_temperature),
    useSync
  };
}

export async function saveConfig(partial: Partial<TabHereConfig>): Promise<void> {
  const next = { ...(await getConfig()), ...partial };
  next.temperature = normalizeTemperature(next.temperature);
  await chrome.storage.sync.set({ tabhere_use_sync: next.useSync });
  await (next.useSync ? chrome.storage.sync : chrome.storage.local).set({
    tabhere_api_key: next.apiKey,
    tabhere_model: next.model,
    tabhere_base_url: next.baseUrl,
    tabhere_temperature: next.temperature
  });
}

export { DEFAULT_CONFIG };
