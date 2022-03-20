import { object, SchemaOf, string } from "yup";

export type FormValues = {
  date: string;
  notes?: string;
};

const schema: SchemaOf<FormValues> = object({
  date: string().required().max(10),
  notes: string().max(240),
}).required();

export default schema;
