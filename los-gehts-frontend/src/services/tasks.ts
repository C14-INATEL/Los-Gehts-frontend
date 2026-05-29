import { fetchApi } from "./api";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const TASKS_PATH = "/tasks";

async function readTasksResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`Erro ao buscar tarefas (${response.status})`);
  }

  return response.json() as Promise<Task[]>;
}

export async function getTasks(): Promise<Task[]> {
  const [pendingResponse, completedResponse] = await Promise.all([
    fetchApi(`${TASKS_PATH}/pending`, undefined, { auth: true }),
    fetchApi(`${TASKS_PATH}/completed`, undefined, { auth: true }),
  ]);

  const [pendingTasks, completedTasks] = await Promise.all([
    readTasksResponse(pendingResponse),
    readTasksResponse(completedResponse),
  ]);

  return [...pendingTasks, ...completedTasks];
}

export async function createTask(title: string): Promise<Task> {
  const response = await fetchApi(
    `${TASKS_PATH}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    },
    { auth: true },
  );

  if (!response.ok) {
    throw new Error("Erro ao criar tarefa");
  }

  return response.json();
}

export async function completeTask(taskId: number): Promise<Task> {
  const response = await fetchApi(
    `${TASKS_PATH}/${taskId}/complete`,
    {
      method: "POST",
    },
    { auth: true },
  );

  if (!response.ok) {
    throw new Error("Erro ao concluir tarefa");
  }

  return response.json();
}

export async function updateTask(taskId: number, title: string): Promise<Task> {
  const response = await fetchApi(
    `${TASKS_PATH}/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    },
    { auth: true },
  );

  if (!response.ok) {
    throw new Error("Erro ao editar tarefa");
  }

  return response.json();
}

export async function deleteTask(taskId: number): Promise<void> {
  const response = await fetchApi(
    `${TASKS_PATH}/${taskId}`,
    {
      method: "DELETE",
    },
    { auth: true },
  );

  if (!response.ok) {
    throw new Error("Erro ao excluir tarefa");
  }
}
