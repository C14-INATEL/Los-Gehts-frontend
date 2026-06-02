"use client";

import EmptyTasks from "@/components/EmptyTasks";
import TaskItem from "@/components/TaskItem";
import { Task } from "@/services/tasks";

type TaskListProps = {
  errorMessage: string;
  isLoading: boolean;
  tasks: Task[];
  onDelete: (taskId: number) => void;
  onToggle: (taskId: number) => void;
  onUpdate: (taskId: number, title: string) => void;
};

export default function TaskList({
  errorMessage,
  isLoading,
  tasks,
  onDelete,
  onToggle,
  onUpdate,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center border-t border-border text-sm text-zinc-400">
        Carregando tarefas...
      </div>
    );
  }

  if (errorMessage && tasks.length === 0) {
    return (
      <div className="flex min-h-72 items-center justify-center border-t border-border px-6 text-center text-sm text-red-300">
        {errorMessage}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyTasks />;
  }

  return (
    <div className="space-y-3">
      {errorMessage ? (
        <p className="rounded-md border border-red-400/30 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          {errorMessage}
        </p>
      ) : null}

      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  );
}
