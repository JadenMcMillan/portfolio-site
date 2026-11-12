import { apiRequest } from "./api";

export async function signin(email, password) {
  const data = await apiRequest("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  sessionStorage.setItem("token", data.token);
  sessionStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function signup(name, email, password) {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function loadProfile() {
  const data = await apiRequest("/auth/profile");
  sessionStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
}

export async function signout() {
  try {
    if (sessionStorage.getItem("token")) {
      await apiRequest("/auth/signout", { method: "POST" });
    }
  } finally {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
}

export function getToken() {
  return sessionStorage.getItem("token");
}

export function getStoredUser() {
  try { return JSON.parse(sessionStorage.getItem("user") || "null"); }
  catch { return null; }
}

export function isAuthenticated() {
  return Boolean(getToken());
}
