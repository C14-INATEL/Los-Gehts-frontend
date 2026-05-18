import { fetchApi } from "./api";

type ApiValidationError = {
  msg: string;
};

type ApiErrorResponse = {
  detail?: string | ApiValidationError[];
};

function normalizeApiErrors(error: ApiErrorResponse) {
  if (Array.isArray(error.detail)) {
    return error.detail.map((detail) =>
      detail.msg.replace("Value error, ", "")
    );
  }

  return [
    (error.detail || "Erro no registro").replace("Value error, ", "")
  ];
}

export async function login(username: string, password: string) {
  const response = await fetchApi("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json() as ApiErrorResponse;

    return Promise.reject(normalizeApiErrors(error));
  }

  return response.json();
}

export async function register(username: string, password: string) {
  const response = await fetchApi("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!response.ok) {
    const error = await response.json() as ApiErrorResponse;

    return Promise.reject(normalizeApiErrors(error));
  }

  return response.json();
}
