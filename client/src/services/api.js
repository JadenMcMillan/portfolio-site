const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function apiRequest(path, options = {}) {
  const token = sessionStorage.getItem("token");
  const headers = { ...(options.headers || {}) };
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) {
    const message = typeof data === "object" && data?.message ? data.message : `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data;
}
