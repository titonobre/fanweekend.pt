import { number, object, SchemaOf, string } from "yup";

export type FormValues = {
  title: string;
  width: number;
  depth: number;
  description?: string;
  photo?: string;
  elements?: number;
  buildTime?: string;
  notes?: string;
};

const schema: SchemaOf<FormValues> = object({
  title: string().required().max(140),
  width: number().integer().required().min(1).max(1000),
  depth: number().integer().required().min(1).max(1000),
  description: string().max(500),
  photo: string().url(),
  elements: number().integer().min(1).max(10000000),
  buildTime: string().max(140),
  notes: string().max(500),
}).required();

export default schema;
