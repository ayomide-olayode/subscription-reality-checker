import SignupForm from "./SignupForm";

type SearchParams = {
  next?: string | string[];
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const sp = searchParams ? await searchParams : undefined;

  const next =
    typeof sp?.next === "string" ? sp.next : "/dashboard";

  return <SignupForm nextUrl={next} />;
}
