"use client";

import { FormEvent } from "react";

type TaskFormProps = {
  isSubmitting: boolean;
  newTask: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export default function TaskForm({
  isSubmitting,
  newTask,
  onChange,
  onSubmit,
}: TaskFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={newTask}
        onChange={(event) => onChange(event.target.value)}
        className="h-13 flex-1 rounded-md border border-border bg-background px-4 text-base text-foreground outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-primary"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-13 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        Criar
        <span aria-hidden className="text-lg leading-none">
          +
        </span>
      </button>
    </form>
  );
}
