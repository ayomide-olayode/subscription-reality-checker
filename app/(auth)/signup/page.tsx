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
import { signUpWithEmail } from "@/lib/auth/client";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const router = useRouter();
  const search = useSearchParams();

  const next = search.get("next") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const { error } = await signUpWithEmail(
      values.email,
      values.password,
      values.name
    );

    if (error) {
      setError("root", { message: error.message });
      return;
    }

    router.push(`/login?signup=success&next=${encodeURIComponent(next)}`);
  };

  return (
    <AuthShell
      right={
        <div>
          <p className="text-xs font-semibold text-primary">What you’ll get</p>

          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-border bg-bg-white p-4">
              <p className="text-sm font-semibold text-primary">Reality score</p>
              <p className="mt-1 text-sm text-text-muted">
                See cost vs usage vs value, clearly ranked.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-bg-white p-4">
              <p className="text-sm font-semibold text-primary">Top leaks</p>
              <p className="mt-1 text-sm text-text-muted">
                Find subscriptions to cancel first.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-bg-white p-4">
              <p className="text-sm font-semibold text-primary">Renewal view</p>
              <p className="mt-1 text-sm text-text-muted">
                Keep renewal dates visible and predictable.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <h1 className="text-xl font-semibold text-primary">Create your account</h1>
      <p className="mt-2 text-sm text-text-muted">
        Use your name, email and password.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {errors.root?.message ? (
          <Alert variant="danger">
            <AlertTitle>Sign up failed</AlertTitle>
            <AlertDescription>{errors.root.message}</AlertDescription>
          </Alert>
        ) : null}

        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary">Name</label>
          <Input
            placeholder="Your name"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

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
            placeholder="At least 8 characters"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full bg-primary text-white hover:bg-primary-light"
        >
          Create account
        </Button>

        <p className="text-sm text-text-muted">
          Already have an account?{" "}
          <Link
            className="font-semibold text-primary-light"
            href={`/login?next=${encodeURIComponent(next)}`}
          >
            Log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
