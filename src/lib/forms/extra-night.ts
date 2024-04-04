import { format } from "date-fns";

import { env } from "@/env";

const formUrl = `https://docs.google.com/forms/d/e/${env.EXTRA_NIGHT_FORM_ID}/formResponse`;

const fields = {
  id: "entry.621062025",
  date: "entry.235736086",
  notes: "entry.908548082",
};

export type ExtraNightData = {
  id: string;
  date: Date | undefined;
  notes: string;
};

export async function submitExtraNight(data: ExtraNightData): Promise<void> {
  const formData = new FormData();
  formData.append(fields.id, data.id);
  formData.append(fields.date, data.date ? format(data.date, "yyyy-MM-dd") : "none");
  formData.append(fields.notes, data.notes || "");

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  try {
    const response = await fetch(formUrl, requestOptions);

    const body = await response.text();

    if (!response.ok) {
      console.error(body);
      throw new Error("Form submission rejected!");
    }
  } catch (error) {
    throw new Error("Form submission rejected!", { cause: error });
  }
}
