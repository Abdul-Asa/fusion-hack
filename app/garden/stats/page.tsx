"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { MobileMenu } from "@/components/mobile-menu";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "@/components/ui/table";
import { useAtom } from "jotai";
import { storeAtom, userAtom } from "@/lib/jotai-context";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Pie,
  PieChart,
} from "recharts";

const Import: React.FC = () => {
  const [expenses] = useAtom(storeAtom);
  const getBadgeColor = (category: string) => {
    switch (category) {
      case "food":
        return "#008000"; // Green
      case "transport":
        return "#0000FF"; // Blue
      case "bills":
      case "health":
        return "#FF0000"; // Red
      case "entertainment":
        return "#800080"; // Purple
      case "shopping":
      case "fashion":
        return "#FFD700"; // Gold
      default:
        return "#808080"; // Gray
    }
  };
  const formatCategory = (category: string) => {
    if (category === "health") {
      return "Bill";
    }

    if (
      [
        "food",
        "transport",
        "bills",
        "entertainment",
        "shopping",
        "fashion",
      ].includes(category)
    ) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }

    return "Misc";
  };
  const [userPref] = useAtom(userAtom);

  type categorty =
    | "food"
    | "transport"
    | "bills"
    | "entertainment"
    | "shopping"
    | "fashion";

  const categorySums = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const data1 = Object.entries(categorySums).map(([name, value]) => ({
    name: formatCategory(name),
    value,
  }));
  console.log(data1);

  return (
    <div className="flex flex-col h-screen lg:p-10 p-6 w-full ">
      <div className="flex justify-between mb-2 lg:mb-10 items-center">
        <h1 className="lg:text-3xl text-lg text-main">Finance</h1>
        <MobileMenu />
      </div>

      <Card className="flex h-full w-full flex-col gap-2 overflow-scroll">
        <div className="flex lg:flex-row flex-col gap-8 p-2 ">
          <div className="rounded-lg w-full flex border border-main ">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data1}
                cx={200}
                cy={200}
                outerRadius={80}
                fill="#2741a8"
                label={(entry) => `${userPref.symbol}${entry.value.toFixed(2)}`}
              />
              <Tooltip formatter={(value) => `${userPref.symbol}${value}`} />
            </PieChart>
          </div>
          <div className="flex w-full border  justify-center items-center border-main rounded-lg">
            <BarChart
              width={400}
              height={400}
              data={data1}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis
                tickFormatter={(value) =>
                  `${userPref.symbol}${value.toFixed(2)}`
                }
              />
              <Tooltip formatter={(value) => `${userPref.symbol}${value}`} />
              <Legend />
              <Bar dataKey="value" fill="#2741a8" />
            </BarChart>
          </div>
        </div>
        <div className="flex rounded-lg ">
          <Table className=" shadow-md overflow-hidden">
            <TableHeader>
              <TableRow>
                <TableHead className="text-main font-bold">Date</TableHead>
                <TableHead className="text-main font-bold">
                  Description
                </TableHead>
                <TableHead className="text-main font-bold">Category</TableHead>
                <TableHead className="text-main font-bold text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.description}</TableCell>{" "}
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor: getBadgeColor(
                          expense.category as categorty
                        ),
                      }}
                    >
                      {formatCategory(expense.category)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">
                  {userPref.symbol}
                  {expenses
                    .reduce((acc, expense) => acc + expense.amount, 0)
                    .toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Card>
      <p className="lg:block hidden text-xs text-center pt-10 text-main">
        A penny saved is a penny earned.
      </p>
    </div>
  );
};
export default Import;
