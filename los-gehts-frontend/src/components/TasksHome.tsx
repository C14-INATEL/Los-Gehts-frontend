"use client";

import { SyntheticEvent, useState } from "react";
import AppHeader from "@/components/AppHeader";
import { completeTask, createTask, Task } from "@/services/tasks";

export default function TasksHome() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  async function handleCreateTask(event?: SyntheticEvent<HTMLFormElement>) {
    event?.preventDefault();

    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      return;
    }

    try {
      const createdTask = await createTask(trimmedTask);

      setTasks((currentTasks) => [...currentTasks, createdTask]);
      setNewTask("");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleToggleTask(taskId: number) {
    try {
      const updatedTask = await completeTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
    } catch (error) {
      console.error(error);
    }
  }

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-background-secondary text-foreground">
      <AppHeader />

      <main className="mx-auto -mt-7 w-full max-w-3xl px-6 pb-16">
        <form className="flex gap-3" onSubmit={handleCreateTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            className="h-13 flex-1 rounded-md border border-border bg-background px-4 text-base text-foreground outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="button"
            onClick={() => handleCreateTask()}
            className="h-13 rounded-md bg-primary px-5 font-semibold text-foreground transition hover:bg-primary-hover"
          >
            Criar +
          </button>
        </form>

        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <strong className="text-primary">Tarefas criadas</strong>
              <span className="rounded-full bg-background px-2 py-0.5 text-xs font-semibold text-foreground">
                {tasks.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <strong className="text-primary">Concluidas</strong>
              <span className="rounded-full bg-background px-2 py-0.5 text-xs font-semibold text-foreground">
                {completedTasksCount}
              </span>
            </div>
          </div>

          <div className="rounded-md border border-border bg-background px-4 py-6">
            {tasks.length === 0 ? (
              <div className="flex min-h-72 flex-col items-center justify-center gap-3 text-center text-sm text-zinc-400">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-14 w-14 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M9 3h6" />
                  <rect x="6" y="4" width="12" height="17" rx="2" />
                  <path d="M9 9h6M9 13h6M9 17h4" />
                </svg>

                <p className="text-lg font-semibold text-zinc-400">
                  Voce ainda não tem tarefas cadastradas
                </p>
                <p className="text-zinc-500">Crie tarefas e as organize</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-3 rounded-md border border-border px-4 py-3"
                  >
                    <input
                      aria-label={`Concluir tarefa ${task.title}`}
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => void handleToggleTask(task.id)}
                    />
                    <span
                      className={task.completed ? "line-through text-zinc-500" : ""}
                    >
                      {task.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
