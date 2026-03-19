import AppHeader from "@/components/AppHeader";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background-secondary text-foreground">
      <AppHeader />

      {children}
    </div>
  );
}
