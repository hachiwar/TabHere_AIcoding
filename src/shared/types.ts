export type AnswerRequestMessage = {
  type: "TABHERE_REQUEST_ANSWER";
  requestId: string;
  selectedText: string;
};

export type AnswerResultMessage = {
  type: "TABHERE_ANSWER_RESULT";
  requestId: string;
  error?: string;
};

export type ClipboardWriteMessage = {
  type: "TABHERE_WRITE_CLIPBOARD";
  target: "offscreen";
  text: string;
};

export type ClipboardWriteResult = {
  ok: boolean;
  error?: string;
};

export type TestApiRequestMessage = {
  type: "TABHERE_TEST_API";
  apiKey: string;
  baseUrl: string;
  model: string;
};

export type TestApiResponseMessage = {
  type: "TABHERE_TEST_API_RESULT";
  ok: boolean;
  message?: string;
};

export type TabHereConfig = {
  apiKey?: string;
  model: string;
  baseUrl: string;
  temperature: number;
  useSync: boolean;
};
