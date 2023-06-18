import { type PropsWithChildren } from "react";

import { DefaultLayout } from "@/layouts/default-layout";

export default function HomeLayout({ children }: PropsWithChildren) {
  return <DefaultLayout transparentHeader>{children}</DefaultLayout>;
}
