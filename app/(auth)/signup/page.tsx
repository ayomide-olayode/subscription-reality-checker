import SignupForm from "./SignupForm";

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const next = searchParams?.next ?? "/dashboard";
  return <SignupForm nextUrl={next} />;
}
