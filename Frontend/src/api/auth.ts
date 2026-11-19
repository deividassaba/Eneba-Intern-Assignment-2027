import { apiFetch } from './client';
import type { LoginRequest, RegisterRequest, User } from '../types';
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

    // if (!response.ok) {
    //   return response.status;
    // }

    const result = await response.json();

    if (!result.token) {
      throw new Error("Login response does not contain a token");
    }

    // Save authentication data in the current browser session
    // sessionStorage.setItem("token", result.token);
    // sessionStorage.setItem("email", data.email);
    return {token: result.token, email: data.email }//response.status;

  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}