import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { env } from "@/env";

const schema = z.object({
  secret: z.string().min(1).max(240),
});

export type Data = z.infer<typeof schema>;

export async function POST(req: NextRequest) {
  const data: unknown = await req.json();

  const parsedData = schema.safeParse(data);

  if (!parsedData.success || parsedData.data.secret !== env.PRISMIC_WEBHOOK_SECRET) {
    return NextResponse.json({ status: 401 });
  }

  revalidateTag("prismic");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
