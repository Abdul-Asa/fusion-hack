import { atom } from "jotai";
import useLocalStorage from "./hooks/use-local-storage";

export const userAtom = atom<UserType>({
  name: "Asa",
  currency: "USD",
  symbol: "$",
});

export const storeAtom = atom<Expenses[]>([]);

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
