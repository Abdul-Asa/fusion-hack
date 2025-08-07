"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { MobileMenu } from "@/components/mobile-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  PlusIcon,
  DollarSignIcon,
  FileTextIcon,
  TagIcon,
  TrashIcon,
} from "lucide-react";

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
import { storeAtom, userAtom, Expenses, gardenAtom } from "@/lib/jotai-context";
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
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

const StatsPage: React.FC = () => {
  const [expenses, setExpenses] = useAtom(storeAtom);
  const [userPref] = useAtom(userAtom);
  const [gardenNodes, setGardenNodes] = useAtom(gardenAtom);

  // Form state for add expense dialog
  const [date, setDate] = useState<Date>();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [select, setSelect] = useState("");
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

  // Categories for the add expense form
  const categories = [
    {
      name: "Food",
      color: "#008000",
    },
    {
      name: "Transport",
      color: "#0000FF",
    },
    {
      name: "Bills",
      color: "#FF0000",
    },
    {
      name: "Entertainment",
      color: "#800080",
    },
    {
      name: "Shopping",
      color: "#FFD700",
    },
    {
      name: "Misc",
      color: "#808080",
    },
  ];

  // Handle form submission
  const handleSubmit = () => {
    if (!date || !select || !amount || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    const newExpense: Expenses = {
      id: Math.random().toString(36).substr(2, 9),
      description,
      amount,
      date: format(date, "yyyy-MM-dd"),
      category: select,
    };

    setExpenses([...expenses, newExpense]);
    toast.success("Expense added successfully!");

    // Reset form
    setDate(undefined);
    setAmount(0);
    setDescription("");
    setSelect("");
  };

  // Handle expense deletion
  const handleDeleteExpense = (expenseId: string) => {
    // Remove expense from expenses array
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));

    // Update garden nodes - remove the expense ID from any nodes that reference it
    setGardenNodes(
      (prevNodes) =>
        prevNodes
          .map((node) => ({
            ...node,
            expenseIds: node.expenseIds.filter((id) => id !== expenseId),
          }))
          .filter((node) => node.expenseIds.length > 0) // Remove nodes with no expenses
    );

    toast.success("Expense deleted successfully!");
  };

  type Category =
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
    fill: getBadgeColor(name),
  }));

  return (
    <div className="flex flex-col h-screen lg:p-10 p-6 w-full ">
      <div className="flex justify-between mb-2 lg:mb-10 items-center">
        <h1 className="lg:text-3xl text-lg text-main">Finance</h1>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-main hover:bg-main/90 text-white">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-main">
                  <DollarSignIcon className="h-6 w-6 text-white" />
                </div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Add New Expense
                </DialogTitle>
                <DialogDescription className="text-gray-500">
                  Track your spending and grow your financial garden
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Description Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <FileTextIcon className="h-4 w-4 text-gray-500" />
                    Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="What did you spend on?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Amount Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="amount"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <DollarSignIcon className="h-4 w-4 text-gray-500" />
                    Amount
                  </Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount || ""}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="pl-8"
                    />
                    <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Category Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <TagIcon className="h-4 w-4 text-gray-500" />
                    Category
                  </Label>
                  <Select
                    value={select}
                    onValueChange={(val) => setSelect(val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Expense Categories
                        </SelectLabel>
                        {categories.map((category, index) => (
                          <SelectItem
                            value={category.name.toLowerCase()}
                            key={index}
                            className="py-3"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                              ></div>
                              {category.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                  >
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full h-11 justify-start text-left font-normal border-gray-200 hover:border-gray-300",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Select a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <DialogFooter className="pt-6">
                <DialogClose asChild>
                  <Button variant="outline" className="flex-1 h-11">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    disabled={!date || !select || !amount || !description}
                    onClick={handleSubmit}
                    className="flex-1 h-11"
                  >
                    Add Expense
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <MobileMenu />
        </div>
      </div>

      <Card className="flex h-full w-full flex-col gap-2 overflow-scroll">
        <div className="flex lg:flex-row flex-col gap-8 p-2 ">
          <div className="rounded-lg w-full h-96 flex border border-main p-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data1}
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label={(entry) =>
                    `${userPref.symbol}${(entry.value || 0).toFixed(2)}`
                  }
                >
                  {data1.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `${userPref.symbol}${value}`,
                    "Amount",
                  ]}
                  labelStyle={{ color: "#333" }}
                  contentStyle={{
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex w-full h-96 border justify-center items-center border-main rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data1}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#666" }}
                  axisLine={{ stroke: "#ccc" }}
                />
                <YAxis
                  tickFormatter={(value) =>
                    `${userPref.symbol}${value.toFixed(2)}`
                  }
                  tick={{ fill: "#666" }}
                  axisLine={{ stroke: "#ccc" }}
                />
                <Tooltip
                  formatter={(value) => [
                    `${userPref.symbol}${value}`,
                    "Amount",
                  ]}
                  labelStyle={{ color: "#333" }}
                  contentStyle={{
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                  }}
                />
                <Bar dataKey="value">
                  {data1.map((entry, index) => (
                    <Cell key={`bar-cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
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
                <TableHead className="text-main font-bold text-center w-20">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <Badge
                      style={{
                        backgroundColor: getBadgeColor(
                          expense.category as Category
                        ),
                      }}
                    >
                      {formatCategory(expense.category)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
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
export default StatsPage;
