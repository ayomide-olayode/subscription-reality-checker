import Link from "next/link";

export default function AuthShell({
  children,
  right,
}: {
  children: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-main">
      {/* Background layers (same vibe as welcome) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-bg-soft to-transparent" />
        <div className="absolute -top-32 left-1/2 h-105 w-105 -translate-x-1/2 rounded-full bg-primary-light/40 blur-3xl" />
        <div className="absolute bottom-0 -right-40 h-90 w-90 rounded-full bg-accent/30 blur-3xl" />
      </div>
    
      <div className="relative mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-stretch gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-10">
        
        {/* Form side */}
        <div className="flex items-center">
            
          <div className="w-full rounded-2xl border border-border bg-bg-white p-6 shadow-sm sm:p-8">
            <Link href="/"> back to home</Link>
            {children}
          </div>
        </div>

        {/* Illustration side (hidden on mobile) */}
        <div className="hidden lg:flex lg:items-center">
          <div className="w-full rounded-2xl border border-border bg-bg-white/70 p-8 backdrop-blur">
            {right}
          </div>
        </div>
      </div>
    </main>
  );
}
