"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/jotai-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSync } from "@/lib/hooks/use-sync";
import { Card } from "@/components/ui/card";
import { MobileMenu } from "@/components/mobile-menu";
import Canvas from "@/components/canvas";
import useDisableScrollBounce from "@/lib/hooks/use-disable-bounce";

const MainGarden: React.FC = () => {
  const [userPref, setUserPref] = useAtom(userAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  useDisableScrollBounce();
  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-full lg:p-10 p-6">
      <div className="flex justify-between mb-2 lg:mb-10 items-center">
        <h1 className="lg:text-3xl text-lg text-main">Garden</h1>
        <MobileMenu />
      </div>
      <Card className="flex-grow gap-4">
        <h1>Hi, {userPref.name}</h1>
        <div
          ref={containerRef}
          className="border-2 border-main relative justify-center items-center h-full flex overflow-hidden"
        >
          <Canvas width={containerSize.width} height={containerSize.height}>
            Hello
          </Canvas>
        </div>
      </Card>
    </div>
  );
};

export default MainGarden;

// "use client";
// import React, { useState } from "react";
// import { useAtom } from "jotai";
// import { storeAtom } from "@/lib/jotai-context";
// import { useSync } from "@/lib/hooks/use-sync";

// type NewExpense = {
//   description: string;
//   amount: number;
//   date: string;
//   category: string;
// };

// const ExpensesComp: React.FC = () => {
//   const [expenses, setExpenses] = useAtom(storeAtom);
//   const [newExpense, setNewExpense] = useState<NewExpense>({
//     description: "",
//     amount: 0,
//     date: "",
//     category: "",
//   });
//   // const { saveToLocalStorage } = useSync();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setExpenses([...expenses, { ...newExpense, id: crypto.randomUUID() }]);
//     // saveToLocalStorage();
//     setNewExpense({ description: "", amount: 0, date: "", category: "" });
//   };

//   return (
//     <div className="p-5">
//       <form onSubmit={handleSubmit} className="mb-5 flex flex-col space-y-4">
//         <input
//           type="text"
//           name="description"
//           value={newExpense.description}
//           onChange={handleChange}
//           placeholder="Description"
//           className="border-2 border-gray-300 rounded-md p-2"
//         />
//         <input
//           type="number"
//           name="amount"
//           value={newExpense.amount}
//           onChange={handleChange}
//           placeholder="Amount"
//           className="border-2 border-gray-300 rounded-md p-2"
//         />
//         <input
//           type="date"
//           name="date"
//           value={newExpense.date}
//           onChange={handleChange}
//           className="border-2 border-gray-300 rounded-md p-2"
//         />
//         <input
//           type="text"
//           name="category"
//           value={newExpense.category}
//           onChange={handleChange}
//           placeholder="Category"
//           className="border-2 border-gray-300 rounded-md p-2"
//         />
//         <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
//           Add Expense
//         </button>
//       </form>
//       <ul className="space-y-2">
//         {expenses.map((expense) => (
//           <li
//             key={expense.id}
//             className="border-2 border-gray-300 rounded-md p-2"
//           >
//             {expense.description} - {expense.amount} - {expense.date} -{" "}
//             {expense.category}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ExpensesComp;
