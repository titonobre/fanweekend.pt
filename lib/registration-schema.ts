import { SchemaOf, string, object, boolean, mixed, date, BaseSchema } from "yup";
import { parse, isDate, startOfDay, addYears } from "date-fns";

import looksRealName from "./utils/looksRealName";

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
  "S" = "S",
  "M" = "M",
  "L" = "L",
  "XL" = "XL",
  "XXL" = "XXL",
  "3XL" = "3XL",
}

export const shirtSizes = Object.values(ShirtSize);

export type FormValues = {
  id: string;
  name: string;
  email: string;
  acceptTerms: boolean;
  country: string;
  dateOfBirth: Date;
  shirtSize: ShirtSize;
  gender?: string;
  lug?: string;
  notes?: string;
  plan: string;
};

function parseDateString(currentValue: string, originalValue: unknown, context: BaseSchema) {
  if (context.isType(currentValue)) return currentValue;

  return isDate(currentValue) ? currentValue : parse(currentValue, "yyyy-MM-dd", new Date());
}

const today = startOfDay(new Date());
const minDate = addYears(today, -100);

export const schema: SchemaOf<FormValues> = object({
  id: string().required().max(50),
  name: string()
    .required()
    .max(100)
    .test("not real name", "Please enter your real name", (value) => looksRealName(value)),
  email: string().email().required().max(100),
  acceptTerms: boolean().required(),
  country: mixed().oneOf<string>(countries).required(),
  dateOfBirth: date()
    .transform(parseDateString)
    .min(minDate, "you are not that old...")
    .max(today, "you sure?")
    .required()
    .label("date of birth"),
  gender: mixed().oneOf<string>([""].concat(Object.keys(Gender))),
  shirtSize: mixed().oneOf<ShirtSize>(shirtSizes).required().label("shirt size"),
  lug: mixed().oneOf<string>([""].concat(lugs)),
  notes: string().max(240),
  plan: mixed().oneOf<Plan>(plans).required(),
}).required();

export default schema;
