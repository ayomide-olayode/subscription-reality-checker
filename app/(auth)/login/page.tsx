"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthShell from "@/components/layout/AuthShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { signInWithEmail } from "@/lib/auth/client";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();

  const next = search.get("next") || "/dashboard";
  const signup = search.get("signup");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const { error } = await signInWithEmail(values.email, values.password);

    if (error) {
      setError("root", { message: "Invalid email or password" });
      return;
    }

    router.replace(next);
  };

  return (
    <AuthShell
      right={
        <div>
          <p className="text-xs font-semibold text-primary">Quick check</p>

          <div className="mt-5 rounded-xl border border-border bg-bg-white p-4">
            <p className="text-sm font-semibold text-primary">Ask yourself</p>
            <ul className="mt-2 space-y-2 text-sm text-text-muted">
              <li>• Did I use this subscription this week?</li>
              <li>• Did it save time or money?</li>
              <li>• What am I paying per use?</li>
            </ul>
            <p className="mt-4 text-xs text-text-muted">
              This app makes those answers obvious.
            </p>
          </div>
        </div>
      }
    >
      <h1 className="text-xl font-semibold text-primary">Welcome back</h1>
      <p className="mt-2 text-sm text-text-muted">Log in to continue.</p>

      <div className="mt-4 space-y-3">
        {signup === "success" ? (
          <Alert variant="success">
            <AlertTitle>Account created</AlertTitle>
            <AlertDescription>Log in to continue.</AlertDescription>
          </Alert>
        ) : null}

        {errors.root?.message ? (
          <Alert variant="danger">
            <AlertTitle>Login failed</AlertTitle>
            <AlertDescription>{errors.root.message}</AlertDescription>
          </Alert>
        ) : null}
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary">Email</label>
          <Input
            placeholder="you@example.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary">Password</label>
          <Input
            type="password"
            placeholder="Your password"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-primary text-white hover:bg-primary-light"
        >
          Log in
        </Button>

        <p className="text-sm text-text-muted">
          New here?{" "}
          <Link
            className="font-semibold text-primary-light"
            href={`/signup?next=${encodeURIComponent(next)}`}
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
