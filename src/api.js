'use strict';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://sentryops-backend-production.up.railway.app';

/**
 * Core fetch wrapper — attaches base URL, JSON headers, and normalizes errors.
 * All request helpers below use this.
 */
async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const token = localStorage.getItem('sentryops_token');

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`[api] ${config.method || 'GET'} ${path} → ${response.status}`);
    error.status = response.status;
    error.body   = body;
    throw error;
  }

  // 204 No Content — nothing to parse
  if (response.status === 204) return null;

  return response.json();
}

// ---------------------------------------------------------------------------
// HTTP helpers
// ---------------------------------------------------------------------------
export const api = {
  get:    (path, options = {})       => request(path, { ...options, method: 'GET' }),
  post:   (path, body, options = {}) => request(path, { ...options, method: 'POST',  body: JSON.stringify(body) }),
  put:    (path, body, options = {}) => request(path, { ...options, method: 'PUT',   body: JSON.stringify(body) }),
  patch:  (path, body, options = {}) => request(path, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path, options = {})       => request(path, { ...options, method: 'DELETE' }),
};

// Convenience export so callers can build URLs when needed (e.g. for file uploads)
export const API_BASE_URL = BASE_URL;
