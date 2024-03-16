"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { storeAtom } from "@/lib/jotai-context";
import { useSync } from "@/lib/hooks/use-sync";

type NewExpense = {
  description: string;
  amount: number;
  date: string;
  category: string;
};

const ExpensesComp: React.FC = () => {
  const [expenses, setExpenses] = useAtom(storeAtom);
  const [newExpense, setNewExpense] = useState<NewExpense>({
    description: "",
    amount: 0,
    date: "",
    category: "",
  });
  // const { saveToLocalStorage } = useSync();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExpenses([...expenses, { ...newExpense, id: crypto.randomUUID() }]);
    // saveToLocalStorage();
    setNewExpense({ description: "", amount: 0, date: "", category: "" });
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="mb-5 flex flex-col space-y-4">
        <input
          type="text"
          name="description"
          value={newExpense.description}
          onChange={handleChange}
          placeholder="Description"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <input
          type="date"
          name="date"
          value={newExpense.date}
          onChange={handleChange}
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          name="category"
          value={newExpense.category}
          onChange={handleChange}
          placeholder="Category"
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
          Add Expense
        </button>
      </form>
      <ul className="space-y-2">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="border-2 border-gray-300 rounded-md p-2"
          >
            {expense.description} - {expense.amount} - {expense.date} -{" "}
            {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesComp;
