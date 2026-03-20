export async function login(username: string, password: string) {
  const response = await fetch("http://127.0.0.1:8000/auth/login", {
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
    const error = await response.json();

    if (Array.isArray(error.detail)) {
      return Promise.reject(
        error.detail.map((e: any) =>
          e.msg.replace("Value error, ", "")
        )
      );
    }

    return Promise.reject([
      (error.detail || "Erro no registro").replace("Value error, ", "")
    ]);
  }

  return response.json();
}

export async function register(username: string, password: string) {
  const response = await fetch("http://127.0.0.1:8000/auth/register", {
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
    const error = await response.json();

    if (Array.isArray(error.detail)) {
      return Promise.reject(
        error.detail.map((e: any) =>
          e.msg.replace("Value error, ", "")
        )
      );
    }

    return Promise.reject([
      (error.detail || "Erro no registro").replace("Value error, ", "")
    ]);
  }

  return response.json();
}