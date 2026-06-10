import { z } from "zod";

const genderEnum = z.enum(["male", "female", "rather not say"]);
const purchasedCategoryEnum = z.enum(["Electronics", "Clothing", "Home", "Books", "Sports"]);

export const userProfileSchema = z.object({
  full_name: z.string().min(1, "missing_name"),
  gender: genderEnum,
  age: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number({ invalid_type_error: "invalid_age" })
      .int("invalid_age")
      .min(5, "invalid_age")
      .max(90, "invalid_age")
  ),
  country: z.string().min(1, "invalid_country"),
  income: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    z.number({ invalid_type_error: "invalid_income" }).nonnegative("invalid_income")
  ),
  purchased_category: purchasedCategoryEnum,
  created_at: z.preprocess(
    (val) => (val ? new Date(String(val)) : undefined),
    z.date().refine((date) => !isNaN(date.getTime()), { message: "invalid_date" })
  ),
});

export type ValidatedUserProfile = z.infer<typeof userProfileSchema>;
