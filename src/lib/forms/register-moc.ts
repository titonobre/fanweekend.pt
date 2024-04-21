import { env } from "@/env";

const formUrl = `https://docs.google.com/forms/d/e/${env.REGISTER_MOC_FORM_ID}/formResponse`;

const fields = {
  user: "entry.385305124",
  title: "entry.584855639",
  description: "entry.1807385050",
  photo: "entry.2103067351",
  elements: "entry.350699548",
  buildTime: "entry.2096911212",
  width: "entry.1356582357",
  depth: "entry.373745618",
  notes: "entry.1606661740",
};

export type RegisterMOCData = {
  user: string;
  title: string;
  description: string;
  photo: string;
  elements: number;
  width: number;
  depth: number;
  buildTime: string;
  notes: string;
};

export async function registerMOC(data: RegisterMOCData): Promise<void> {
  const formData = new FormData();
  formData.append(fields.user, data.user);
  formData.append(fields.title, data.title);
  formData.append(fields.width, data.width.toString());
  formData.append(fields.depth, data.depth.toString());
  formData.append(fields.description, data.description || "");
  formData.append(fields.photo, data.photo || "");
  formData.append(fields.elements, data.elements?.toString() || "");
  formData.append(fields.buildTime, data.buildTime || "");
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
