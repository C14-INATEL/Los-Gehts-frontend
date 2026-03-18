"use client";

import { useState, useEffect } from "react";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const successParam = searchParams.get("success");
    if (successParam) {
      setSuccess("Usuário criado com sucesso");
    }
  }, []);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(""), 10000);
    return () => clearTimeout(timer);
  }, [success]);

    useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 10000);
    return () => clearTimeout(timer);
  }, [error]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);

      localStorage.setItem("token", data.JWT);

      router.push("/");

    } catch (error: any) {
      setError(error.message || "Erro ao fazer login");
    }
  }

  return (
    <div className="w-full max-w-sm">
      {success && (
        <div className="mb-4 bg-green-500/10 border border-green-500 text-green-400 px-4 py-2 rounded text-sm">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Acesse a plataforma
      </h2>

      <p className="text-foreground mb-6">
        Faça login ou registre-se para começar a gerenciar suas tarefas ainda hoje.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="text-sm text-foreground">Nome</label>
          <input
            type="text"
            placeholder="Digite seu nome"
            className="w-full p-2 rounded bg-foreground border border-border text-background outline-none focus:ring-2 focus:ring-primary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <div className="flex justify-between">
            <label className="text-sm text-foreground">Senha</label>
            <span className="text-sm text-primary cursor-pointer hover:underline">
              Esqueceu a senha?
            </span>
          </div>

          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full p-2 rounded bg-foreground border border-border text-background outline-none focus:ring-2 focus:ring-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded transition"
        >
          Entrar
        </button>
      </form>

      <p className="text-sm text-foreground mt-6 text-center">
        Ainda não tem uma conta?{" "}
        <a href="/register" className="!text-primary cursor-pointer hover:underline">
          Inscreva-se
        </a>
      </p>
    </div>
  );
}