import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateMock } from "@anatine/zod-mock";
import { mutualFundSchema } from "./schemas";

export function cn(
  // Utility function to combine class names using clsx and twMerge
  ...inputs: ClassValue[]
) {
  return twMerge(clsx(inputs));
}

export const mockMutualFundData = generateMock(mutualFundSchema);
export function addNumbers(
  // Adds two numbers and returns the sum
  a: number,
  b: number
): number {
  return a + b;
}
