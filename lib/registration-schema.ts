import { SchemaOf, string, object, boolean, mixed } from "yup";

import countries from "../data/countries.json";

import lugs from "../data/lugs.json";

export { countries, lugs };

export enum Gender {
  male = "Male",
  female = "Female",
  other = "Other",
  "rather not say" = "Rather not say",
}

export const genders = Object.entries(Gender);

export enum Plan {
  basic = "basic",
  full = "full",
}

export const plans = Object.values(Plan);

export enum ShirtSize {
  XXS = "XXS",
  XS = "XS",
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
  XXL = "XXL",
}

export const shirtSizes = Object.values(ShirtSize);

export type FormValues = {
  id: string;
  name: string;
  email: string;
  acceptTerms: boolean;
  country: string;
  dateOfBirth: string;
  shirtSize: ShirtSize;
  gender?: string;
  lug?: string;
  notes?: string;
  plan: string;
};

export const schema: SchemaOf<FormValues> = object({
  id: string().required().max(50),
  name: string().required().max(100),
  email: string().email().required().max(100),
  acceptTerms: boolean().required(),
  country: mixed().oneOf<string>(countries).required(),
  dateOfBirth: string()
    .required()
    .matches(/^\d{4}-\d{2}-\d{2}$/),
  gender: mixed().oneOf<string>([""].concat(Object.keys(Gender))),
  shirtSize: mixed().oneOf<ShirtSize>(shirtSizes).required(),
  lug: mixed().oneOf<string>([""].concat(lugs)),
  notes: string().max(240),
  plan: mixed().oneOf<Plan>(plans).required(),
}).required();

export default schema;
