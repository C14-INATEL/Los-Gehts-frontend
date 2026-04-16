export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export async function createTask(title: string): Promise<Task> {
  const response = await fetch("http://127.0.0.1:8000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Erro ao criar tarefa");
  }

  return response.json();
}

export async function completeTask(taskId: number): Promise<Task> {
  const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}/complete`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Erro ao concluir tarefa");
  }

  return response.json();
}
