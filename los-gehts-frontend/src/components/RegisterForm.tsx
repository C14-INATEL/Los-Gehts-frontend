"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (error.length === 0) return;
    const timer = setTimeout(() => setError([]), 10000);
    return () => clearTimeout(timer);
  }, [error]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError([]);

    if (password !== confirmPassword) {
      setError(["As senhas não coincidem"]);
      return;
    }

    try {
      const data = await register(username, password);

      localStorage.setItem("token", data.JWT);

      router.push("/login?success=1");

    } catch (error: any) {
      if (Array.isArray(error)) {
        setError(error);
      } else {
        setError([error.message || "Erro desconhecido"]);
      }
    }
  }

  const inputClass =
    "w-full p-2 rounded bg-foreground border border-border text-background outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="w-full max-w-sm">
      {error.length > 0 && (
        <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded text-sm">
          {error.map((e, i) => (
            <p key={i}>{e}</p>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-2">
        Crie sua conta
      </h2>

      <p className="text-foreground mb-6">
        Registre-se para começar a gerenciar suas tarefas ainda hoje.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="text-sm">Nome</label>
          <input
            placeholder="Digite seu nome"
            className={inputClass}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Senha</label>
          <input
            type="password"
            placeholder="Crie uma senha"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Confirmar senha</label>
          <input
            type="password"
            placeholder="Digite a senha novamente"
            className={inputClass}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white py-2 rounded"
        >
          Registrar
        </button>
      </form>

      <p className="text-sm mt-6 text-center">
        Já tem uma conta?{" "}
        <a href="/login" className="!text-primary hover:underline">
          Entrar
        </a>
      </p>
    </div>
  );
}