export default function Topbar({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-sm font-semibold text-neutral-900">{title}</h1>
          <p className="mt-1 text-xs text-neutral-600">
            Track spend, usage, and value.
          </p>
        </div>
      </div>
    </header>
  );
}
