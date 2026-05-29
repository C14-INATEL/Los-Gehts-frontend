"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import TaskStats from "@/components/TaskStats";
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  Task,
  updateTask,
} from "@/services/tasks";

export default function TasksHome() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    let shouldUpdateState = true;

    async function loadTasks() {
      try {
        const loadedTasks = await getTasks();

        if (shouldUpdateState) {
          setTasks(loadedTasks);
          setErrorMessage("");
        }
      } catch (error) {
        console.error(error);

        if (shouldUpdateState) {
          setErrorMessage("Não foi possível carregar suas tarefas.");
        }
      } finally {
        if (shouldUpdateState) {
          setIsLoading(false);
        }
      }
    }

    void loadTasks();

    return () => {
      shouldUpdateState = false;
    };
  }, []);

  async function handleCreateTask() {
    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      return;
    }

    try {
      setIsCreating(true);
      const createdTask = await createTask(trimmedTask);

      setTasks((currentTasks) => [...currentTasks, createdTask]);
      setNewTask("");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível criar a tarefa.");
    } finally {
      setIsCreating(false);
    }
  }

  async function handleToggleTask(taskId: number) {
    try {
      const updatedTask = await completeTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível atualizar o status da tarefa.");
    }
  }

  async function handleUpdateTask(taskId: number, title: string) {
    try {
      const updatedTask = await updateTask(taskId, title);

      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === taskId ? updatedTask : task)),
      );
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível editar a tarefa.");
    }
  }

  async function handleDeleteTask(taskId: number) {
    try {
      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível excluir a tarefa.");
    }
  }

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-background-secondary text-foreground">
      <AppHeader />

      <main className="mx-auto -mt-7 w-full max-w-3xl px-6 pb-16">
        <TaskForm
          isSubmitting={isCreating}
          newTask={newTask}
          onChange={setNewTask}
          onSubmit={() => void handleCreateTask()}
        />

        <section className="mt-12">
          <TaskStats
            completedTasksCount={completedTasksCount}
            tasksCount={tasks.length}
          />

          <TaskList
            errorMessage={errorMessage}
            isLoading={isLoading}
            tasks={tasks}
            onDelete={(taskId) => void handleDeleteTask(taskId)}
            onToggle={(taskId) => void handleToggleTask(taskId)}
            onUpdate={(taskId, title) => void handleUpdateTask(taskId, title)}
          />
        </section>
      </main>
    </div>
  );
}
