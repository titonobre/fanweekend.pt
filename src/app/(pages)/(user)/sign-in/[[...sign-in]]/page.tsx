import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <section className="thin-container mt-10 flex flex-1 flex-col items-center justify-center">
      <SignIn />
    </section>
  );
}
