/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = import.meta.env.VITE_API_URL;

type Headers = {
  [key: string]: string;
};

const getAuthHeader = (): Headers => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ Improved error handling to avoid crashing on non-JSON responses
const handleResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      throw new Error(data.error || data.message || "An error occurred");
    } else {
      const text = await res.text();
      throw new Error(`❌ Server returned non-JSON error: ${text}`);
    }
  }

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    return res.text(); // fallback if response is plain text or HTML
  }
};

const ApiHandler = {
  async get(endpoint: string) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("📤 GET:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return handleResponse(res);
  },

  async post(endpoint: string, body: any) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("📤 POST:", url, body);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  async put(endpoint: string, body: any) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("📤 PUT:", url, body);

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify(body),
    });
    return handleResponse(res);
  },

  async delete(endpoint: string) {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log("📤 DELETE:", url);

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    return handleResponse(res);
  },

  async login(email: string, password: string) {
    const loginUrl = `${API_BASE_URL}/users/login`;
    console.log("🔐 Login URL:", loginUrl);

    const res = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const text = await res.text();
    console.log("🧾 Raw login response:", text);

    try {
      const data = JSON.parse(text);

      if (data.authToken) localStorage.setItem("token", data.authToken);
      if (data.gym_id) localStorage.setItem("gym_id", data.gym_id);

      return data;
    } catch (err) {
      throw new Error("❌ Failed to parse login response as JSON.");
    }
  },
};

export default ApiHandler;
