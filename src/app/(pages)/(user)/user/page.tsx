import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="thin-container mt-10 flex min-h-screen w-full flex-1 flex-col items-center gap-10">
      <UserProfile />
    </section>
  );
}
