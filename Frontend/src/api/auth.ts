import type { LoginRequest, RegisterRequest } from '../types';
import config from "../config";


export async function Register(data : RegisterRequest){
  const response = await fetch(`${config.apiBaseUrl}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.status;
}

export async function ApiLoginRequest(data: LoginRequest): Promise<{token: string, email: string}> {
  try {
    const response = await fetch(`${config.apiBaseUrl}/api/login_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });


    const result = await response.json();

    if (!result.token) {
      throw new Error("Login response does not contain a token");
    }

    return {token: result.token, email: data.email }

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}