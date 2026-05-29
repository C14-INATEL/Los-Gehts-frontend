const API_BASE_URL = "/api";

type FetchApiOptions = {
  auth?: boolean;
};

export function buildApiUrl(path: string) {
  const baseUrl = API_BASE_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("token");
}

function withAuthHeaders(init?: RequestInit, options?: FetchApiOptions) {
  const headers = new Headers(init?.headers);
  const token = options?.auth ? getAuthToken() : null;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return {
    ...init,
    headers,
  };
}

export async function fetchApi(
  path: string,
  init?: RequestInit,
  options?: FetchApiOptions,
) {
  try {
    return await fetch(buildApiUrl(path), withAuthHeaders(init, options));
  } catch {
    throw new Error(
      `Não foi possível conectar à API em ${API_BASE_URL}. Verifique se o backend está rodando e se a URL da API está correta.`,
    );
  }
}
