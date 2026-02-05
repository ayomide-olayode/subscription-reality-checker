"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/client";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();          // clears Supabase session
    router.push("/login");    // go to login
    router.refresh();         // refresh server state
  };

  return (
    <Button
      variant="secondary"
      className="w-full border border-border bg-bg-white text-primary hover:bg-bg-soft"
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
}
