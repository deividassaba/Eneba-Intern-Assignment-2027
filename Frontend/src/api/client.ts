import config from "../config";

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  if(!options) {
    options ={
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
  }
  const response = await fetch(`${config.apiBaseUrl}/${endpoint}`, options);

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
