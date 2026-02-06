import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic"; // optional

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string; signup?: string };
}) {
  const next = searchParams?.next ?? "/dashboard";
  const signup = searchParams?.signup ?? null;

  return <LoginForm nextUrl={next} signup={signup} />;
}
