// Basis-URL til API'et, kan overskrives med miljøvariabel
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Hent access_token og refresh_token fra localStorage
const getToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

// Gem tokens i localStorage
const saveTokens = (access, refresh) => {
  if (access) localStorage.setItem('access_token', access);
  if (refresh) localStorage.setItem('refresh_token', refresh);
};

// Log brugeren ud og send til login
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
};

// Global cache for refresh-promise, så der kun sker én refresh ad gangen
let refreshPromise = null;

// Funktion til at forny access_token vha. refresh_token
const refreshAccessToken = async () => {
  if (!refreshPromise) {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      logout();
      return null;
    }

    // Start refresh-request og gem den i global promise
    refreshPromise = fetch(`${BASE_URL}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken })
    })
      .then(async (res) => {
        if (!res.ok) {
          logout();
          return null;
        }

        const data = await res.json();
        if (data.access_token) {
          saveTokens(data.access_token, data.refresh_token);
          return data.access_token;
        }

        return null;
      })
      .catch((err) => {
        console.error("Fejl ved refresh:", err);
        logout();
        return null;
      })
      .finally(() => {
        // Reset når promise er afsluttet
        refreshPromise = null;
      });
  }

  // Returner det samme promise, hvis allerede i gang
  return refreshPromise;
};

// Hovedfunktion til API-kald
export const fetchApi = async (
  endpoint,
  method = 'GET',
  body,
  token = getToken() // Brug eksisterende token som fallback
) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const config = {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {})
  };

  try {
    const url = `${BASE_URL}${endpoint}`;
    
    const res = await fetch(`${url}`, config);

    // Hvis token er udløbet (403), forsøg at forny den og prøv igen
    if (res.status === 403) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return fetchApi(endpoint, method, body, newToken);
      }
      return { success: false, error: 'Autentificering fejlede' };
    }

    // Tjek om svaret er JSON og parse det
    const isJson = res.headers.get('Content-Type')?.includes('application/json');
    const data = isJson ? await res.json() : null;

    if (res.ok) {
      
      // Gem nye tokens hvis de findes i svaret
      if (data?.access_token) saveTokens(data.access_token, data.refresh_token);
      return { success: true, data: data.response ?? data };
    }

    // Hvis ikke ok, returner fejl
    return { success: false, error: `${res.status}: ${res.statusText}` };
  } catch (err) {
    // Håndter fetch-fejl
    return { success: false, error: err?.message || 'Ukendt fejl' };
  }
};