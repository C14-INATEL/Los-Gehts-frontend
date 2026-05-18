export default function EmptyTasks() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center gap-3 border-t border-border text-center text-sm text-zinc-400">
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

      <div>
        <p className="font-semibold text-zinc-400">
          Você ainda não tem tarefas cadastradas
        </p>
        <p className="text-zinc-500">Crie tarefas e as organize</p>
      </div>
    </div>
  );
}
