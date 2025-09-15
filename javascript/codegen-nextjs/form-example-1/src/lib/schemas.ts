import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const mutualFundSchema = z.object({
  investorId: z.string(),
  portfolio: z.array(
    z.object({
      fundName: z.string(),
      ticker: z.string(),
      isin: z.string(),
      units: z.number(),
      averageCostBasis: z.number(),
      currentValue: z.number(),
      acquisitionDate: z.string().datetime(),
    }),
  ),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type MutualFund = z.infer<typeof mutualFundSchema>;
