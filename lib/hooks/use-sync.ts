import { UserType, Expenses, userAtom, storeAtom } from "@/lib/jotai-context";
import { useSetAtom } from "jotai";
import useLocalStorage from "@/lib/hooks/use-local-storage";

export const useSync = () => {
  const setUser = useSetAtom(userAtom);
  const setExpenses = useSetAtom(storeAtom);
  const [savedUserPref, setUserPref] = useLocalStorage<UserType>("userPref", {
    name: "",
    currency: "",
    symbol: "",
  });
  const [savedExpenses, setExpensesPref] = useLocalStorage<Expenses[]>(
    "expenses",
    []
  );

  const saveToLocalStorage = () => {
    setUserPref(savedUserPref);
    setExpensesPref(savedExpenses);
  };

  const loadFromLocalStorage = () => {
    if (savedUserPref) {
      setUser(savedUserPref);
    }
    if (savedExpenses) {
      setExpenses(savedExpenses);
    }
  };

  return { saveToLocalStorage, loadFromLocalStorage };
};
