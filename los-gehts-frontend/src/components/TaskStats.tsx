type TaskStatsProps = {
  completedTasksCount: number;
  tasksCount: number;
};

export default function TaskStats({
  completedTasksCount,
  tasksCount,
}: TaskStatsProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <strong className="text-sm text-primary">Tarefas criadas</strong>
        <span className="rounded-full bg-background px-2 py-0.5 text-xs font-semibold text-foreground">
          {tasksCount}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <strong className="text-sm text-primary">Concluídas</strong>
        <span className="rounded-full bg-background px-2 py-0.5 text-xs font-semibold text-foreground">
          {completedTasksCount} de {tasksCount}
        </span>
      </div>
    </div>
  );
}
