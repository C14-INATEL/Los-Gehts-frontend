"use client";

import { FormEvent, useState } from "react";
import { Task } from "@/services/tasks";

type TaskItemProps = {
  task: Task;
  onDelete: (taskId: number) => void;
  onToggle: (taskId: number) => void;
  onUpdate: (taskId: number, title: string) => void;
};

export default function TaskItem({
  task,
  onDelete,
  onToggle,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  function handleCancelEdit() {
    setEditedTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    onUpdate(task.id, trimmedTitle);
    setIsEditing(false);
  }

  return (
    <li className="flex min-h-14 items-center gap-3 rounded-md border border-border bg-zinc-900/50 px-4 py-3">
      <button
        type="button"
        aria-label={`Concluir tarefa ${task.title}`}
        onClick={() => onToggle(task.id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
          task.completed
            ? "border-primary bg-primary text-background"
            : "border-primary text-transparent hover:bg-primary/10"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M3 8l3 3 7-7" />
        </svg>
      </button>

      {isEditing ? (
        <form className="flex flex-1 gap-2" onSubmit={handleSubmitEdit}>
          <input
            aria-label={`Editar título da tarefa ${task.title}`}
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
            className="h-9 min-w-0 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            aria-label={`Salvar tarefa ${task.title}`}
            className="rounded-md bg-primary px-3 text-sm font-semibold text-foreground transition hover:bg-primary-hover"
          >
            Salvar
          </button>
          <button
            type="button"
            aria-label={`Cancelar edição da tarefa ${task.title}`}
            onClick={handleCancelEdit}
            className="rounded-md px-3 text-sm font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-foreground"
          >
            Cancelar
          </button>
        </form>
      ) : (
        <>
          <span
            className={`min-w-0 flex-1 text-sm ${
              task.completed ? "text-zinc-500 line-through" : "text-zinc-100"
            }`}
          >
            {task.title}
          </span>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label={`Editar tarefa ${task.title}`}
              onClick={() => setIsEditing(true)}
              className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-primary"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>

            <button
              type="button"
              aria-label={`Excluir tarefa ${task.title}`}
              onClick={() => onDelete(task.id)}
              className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-800 hover:text-red-400"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M6 6l1 15h10l1-15" />
                <path d="M10 11v6M14 11v6" />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  );
}
