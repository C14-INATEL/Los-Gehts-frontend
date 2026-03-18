export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background-secondary text-foreground">
      
      <div className="w-full bg-background px-8 py-4">
        <h1 className="text-2xl font-bold text-primary">
          Gerenciador de tarefas
        </h1>
      </div>

      {children}
    </div>
  );
}