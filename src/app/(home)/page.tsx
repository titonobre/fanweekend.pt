import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs/server";

import { Intro } from "@/components/section/intro";
import { Register } from "@/components/section/register";
import { Welcome } from "@/components/section/welcome";
import { What } from "@/components/section/what";
import { Where } from "@/components/section/where";

export default async function Home() {
  noStore();

  const authObject = auth();

  if (authObject.userId) {
    redirect("/dashboard");
  }

  return (
    <>
      <section className="min-h-screen flex-1">
        <Intro />
      </section>
      <section className="flex flex-1 py-10">
        <Welcome />
      </section>
      <section className="flex flex-1 overflow-hidden py-10">
        <Where />
      </section>
      <section className="flex flex-1 py-10">
        <What />
      </section>
      <section className="flex flex-1 py-10">
        <Register />
      </section>
    </>
  );
}
