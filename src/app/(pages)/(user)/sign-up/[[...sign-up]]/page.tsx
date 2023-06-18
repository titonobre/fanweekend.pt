import { SignUp } from "@clerk/nextjs";

export default function SignOutPage() {
  return (
    <section className="thin-container mt-10 flex flex-1 flex-col items-center justify-center">
      <SignUp />
    </section>
  );
}
