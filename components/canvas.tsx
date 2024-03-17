import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CalendarIcon, HandIcon, PlusIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { storeAtom } from "@/lib/jotai-context";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";

export default function Canvas({
  height,
  width,
  children,
}: {
  height: number;
  width: number;
  children?: React.ReactNode;
}) {
  const [expenses, setExpenses] = useAtom(storeAtom);
  const [date, setDate] = useState<Date>();

  const [camera, setCamera] = useState<{
    x: number;
    y: number;
    lastX?: number;
    lastY?: number;
  }>({
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
  });
  const [panMode, setPanMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [notePositions] = useState(
    expenses.map(() => ({ x: Math.random() * 2000, y: Math.random() * 2000 }))
  );
  const [select, setSelect] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");

  const listCat = [
    "Food",
    "Transport",
    "Bills",
    "Entertainment",
    "Shopping",
    "Fashion",
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.WheelEvent) => {
    event.preventDefault();
    console.log("scrolling");
    setCamera((prev) => {
      let newX = prev.x - event.deltaX;
      let newY = prev.y - event.deltaY;

      const maxX = 2000 / 2 - width / 2;
      const maxY = 2000 / 2 - height / 2;
      const minX = -(2000 / 2) + width / 2;
      const minY = -(2000 / 2) + height / 2;

      newX = Math.min(Math.max(newX, minX), maxX);
      newY = Math.min(Math.max(newY, minY), maxY);

      return { x: newX, y: newY };
    });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    console.log("onPointerDown");
    // setSelectedLayer(null);
    if (!panMode) return;
    setIsDragging(true);
    setCamera((prev) => ({
      ...prev,
      lastX: event.clientX,
      lastY: event.clientY,
    }));
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!panMode) return;
    if (!isDragging) return;
    setCamera((prev) => {
      if (!prev.lastX || !prev.lastY) return prev;
      let newX = prev.x + event.clientX - prev.lastX;
      let newY = prev.y + event.clientY - prev.lastY;

      const maxX = 2000 / 2 - width / 2;
      const maxY = 2000 / 2 - height / 2;
      const minX = -(2000 / 2) + width / 2;
      const minY = -(2000 / 2) + height / 2;

      newX = Math.min(Math.max(newX, minX), maxX);
      newY = Math.min(Math.max(newY, minY), maxY);

      return { x: newX, y: newY, lastX: event.clientX, lastY: event.clientY };
    });
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };
  const handleSubmit = () => {
    setExpenses([
      ...expenses,
      {
        id: crypto.randomUUID(),
        date: format(date!, "yyyy-MM-dd"),
        category: select,
        amount: amount,
        description: description,
      },
    ]);
    notePositions.push({ x: Math.random() * 2000, y: Math.random() * 2000 });
  };

  return (
    <>
      <motion.div
        onWheel={handleScroll}
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          translate: `${camera.x}px ${camera.y}px`,
          position: "absolute",
          backgroundColor: "#dadad2",
          backgroundImage:
            "radial-gradient(circle, #000000 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          border: "8px solid red",
          height: "2000px",
          width: "2000px",
        }}
      >
        {expenses.map((expense, index) => {
          return (
            <motion.div
              drag
              dragMomentum={false}
              dragConstraints={containerRef}
              style={{
                backgroundColor: "blue",
                width: "100px",
                height: "100px",
                x: notePositions[index].x,
                y: notePositions[index].y,
              }}
              key={index}
            >
              {expense.category}
            </motion.div>
          );
        })}
      </motion.div>
      <div className="absolute top-2 left-2">
        <Button
          variant={panMode ? "default" : "outline"}
          size={"icon"}
          onClick={() => setPanMode(!panMode)}
        >
          <HandIcon />
        </Button>
      </div>
      <div className="absolute top-2 right-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"icon"}>
              <PlusIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new expense</DialogTitle>
              <DialogDescription>Record your latest expense</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select value={select} onValueChange={(val) => setSelect(val)}>
                  <SelectTrigger className="w-full col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {listCat.map((expense, index) => (
                        <SelectItem value={expense.toLowerCase()} key={index}>
                          {expense}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={!date || !select || !amount || !description}
                  onClick={handleSubmit}
                >
                  Add Expense
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
