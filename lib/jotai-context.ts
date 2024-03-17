import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
export const userAtom = atomWithStorage("user", {
  name: "Asa",
  currency: "USD",
  symbol: "$",
});
export const storeAtom = atomWithStorage<Expenses[]>("expenses", []);

export type UserType = {
  name: string;
  currency: string;
  symbol: string;
};

export type Expenses = {
  description: string;
  amount: number;
  date: string;
  id: string;
  category: string;
};
