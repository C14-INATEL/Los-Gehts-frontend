export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="rounded-4xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
          <div className="flex flex-col gap-6">
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Los Gehts Frontend
              </h1>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
