
// export function getToken(): string | null {
//   return sessionStorage.getItem("token");
// }

// export function getEmail(): string | null {
//   return sessionStorage.getItem("email");
// }

// export function isLoggedIn(): boolean {
//   return !!getToken();
// }

// export function Logout(): void {
//   sessionStorage.removeItem("token");
//   sessionStorage.removeItem("email");
// }

export function getAuthHeaders(token: string): HeadersInit {
  // const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}
