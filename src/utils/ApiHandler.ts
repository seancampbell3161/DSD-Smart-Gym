// src/utils/ApiHandler.ts
const API_BASE_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:4242/api").replace(/\/+$/, "");

type HeadersMap = { [key: string]: string };

const getStoredToken = () =>
  localStorage.getItem("authToken") || localStorage.getItem("token");

const getAuthHeader = (): HeadersMap => {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const join = (base: string, endpoint: string) =>
  `${base}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

// Unified response handler (handles 204, JSON, or text)
const handleResponse = async (res: Response) => {
  if (res.status === 204) return { ok: true };

  const contentType = res.headers.get("content-type") || "";
  const parseBody = async () => {
    if (contentType.includes("application/json")) return res.json();
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  };

  const body = await parseBody();

  if (!res.ok) {
    if (body && typeof body === "object") {
      throw new Error((body as any).error || (body as any).message || `HTTP ${res.status}`);
    }
    throw new Error(`HTTP ${res.status}: ${String(body)}`);
  }

  return body ?? { ok: true };
};

const ApiHandler = {
  async get(endpoint: string) {
    const url = join(API_BASE_URL, endpoint);
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      credentials: "include",
    });
    return handleResponse(res);
  },

  async post(endpoint: string, body: any) {
    const url = join(API_BASE_URL, endpoint);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  async put(endpoint: string, body: any) {
    const url = join(API_BASE_URL, endpoint);
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  async delete(endpoint: string) {
    const url = join(API_BASE_URL, endpoint);
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      credentials: "include",
    });
    return handleResponse(res);
  },

  // ---- Auth ----
  async login(email: string, password: string) {
    const loginUrl = join(API_BASE_URL, "/users/login");
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const payload = await handleResponse(res);

    const authToken =
      (payload as any)?.authToken ??
      (payload as any)?.token ??
      null;

    const emailOut = (payload as any)?.email ?? (payload as any)?.user?.email ?? "";

    const roleRaw = (payload as any)?.role ?? (payload as any)?.user?.role ?? "";
    const roleOut = typeof roleRaw === "string" ? roleRaw.toLowerCase() : "";

    const gymIdOut = (payload as any)?.gym_id ?? (payload as any)?.user?.gym_id ?? "";

    if (!authToken) throw new Error("Login succeeded but no authToken returned.");

    localStorage.setItem("authToken", authToken);
    localStorage.setItem("token", authToken);
    if (emailOut) localStorage.setItem("email", emailOut);
    if (roleOut) localStorage.setItem("role", roleOut);
    if (gymIdOut) localStorage.setItem("gym_id", gymIdOut);

    return payload;
  },

  // ---- Classes (Admin) ----
  async getAdminClasses() {
    const gym_id = localStorage.getItem("gym_id") || "";
    const res = await this.get(`/classes?gym_id=${encodeURIComponent(gym_id)}`);
    return Array.isArray(res) ? res : res?.data ?? res?.allClasses ?? [];
  },

  async createClass(payload: any) {
    return this.post("/classes", payload);
  },

  async updateClass(id: string, payload: any) {
    return this.put(`/classes/${id}`, payload);
  },

  async cancelClass(id: string, reason?: string) {
    return this.put(`/classes/${id}/cancel`, { reason: reason ?? "" });
  },

  async uncancelClass(id: string) {
    return this.put(`/classes/${id}/uncancel`, {});
  },

  async deleteClass(id: string) {
    return this.delete(`/classes/${id}`);
  },
};

export default ApiHandler;
