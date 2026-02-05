"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/config/nav";
import { cn } from "@/lib/cn";
import LogoutButton from "@/components/layout/LogoutButton";


export default function Sidebar() {
  const pathname = usePathname();

    

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-neutral-200 bg-white lg:block">
      <div className="flex h-full flex-col">
        <div className="px-6 py-6">
          <div className="text-sm font-semibold text-neutral-900">
            Subscription Reality Checker
          </div>
          <div className="mt-1 text-xs text-neutral-600">SaaS demo</div>
        </div>

        <nav className="px-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2 text-sm",
                      active
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-700 hover:bg-neutral-100"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", active ? "text-white" : "text-neutral-600")} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t border-neutral-200 p-4">
          <div className="text-xs text-neutral-600">
            You’ll add user menu + logout here.
            <LogoutButton />
          </div>
        </div>
      </div>
    </aside>
  );
}
