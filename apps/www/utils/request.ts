import axios, { AxiosRequestConfig } from "axios";

export async function sendRequest(url: string, options: { method: string }) {
  try {
    const BACKEND_URL = process.env.BACKEND_URL;
    if (!BACKEND_URL) {
      console.warn("BACKEND_URL is not defined – API calls will likely fail.");
      throw new Error("BACKEND_URL seems not configured");
    }

    const config: AxiosRequestConfig = {
      url: url,
      baseURL: `${BACKEND_URL}/api/v1`,
      method: options.method,
      headers: {},
    };
    const response = await axios(config);
    return response.data;
  } catch (e) {}
}
