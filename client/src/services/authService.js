const API_URL = "/api/auth";

// Sign in and save JWT token
export async function signin(email, password) {
  const response = await fetch(`${API_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Sign in failed");
  }

  // Store token for the current browser tab
  sessionStorage.setItem("token", data.token);

  return data;
}

// Sign out by removing the token
export function signout() {
  sessionStorage.removeItem("token");
}

// Retrieve the stored token
export function getToken() {
  return sessionStorage.getItem("token");
}

// Check whether a token is stored
export function isAuthenticated() {
  return Boolean(getToken());
}
