import { object, SchemaOf, string } from "yup";

export type FormValues = {
  name: string;
};

const schema: SchemaOf<FormValues> = object({
  name: string().required().min(2).max(100),
}).required();

export default schema;
