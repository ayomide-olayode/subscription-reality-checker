import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic"; // optional

type SearchParams = {
  next?: string | string[];
  signup?: string | string[];
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp = searchParams ? await searchParams : undefined;

  const next = typeof sp?.next === "string" ? sp.next : "/dashboard";
  const signup = typeof sp?.signup === "string" ? sp.signup : null;

  return <LoginForm nextUrl={next} signup={signup} />;
}
