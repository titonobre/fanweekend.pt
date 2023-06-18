import { type PropsWithChildren } from "react";

import { DefaultLayout } from "@/layouts/default-layout";

export default function PageLayout({ children }: PropsWithChildren) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
