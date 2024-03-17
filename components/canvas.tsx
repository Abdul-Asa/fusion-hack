import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { CalendarIcon, HandIcon, HandshakeIcon, PlusIcon } from "lucide-react";
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
import Image from "next/image";
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
import { format, set } from "date-fns";

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
  const [store, setStore] = useState<
    {
      id: string;
      category: string;
      x: number;
      y: number;
      size: number;
      merged: string[];
    }[]
  >(
    expenses.map((act) => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      id: act.id,
      category: act.category,
      size: 200,
      merged: [],
    }))
  );

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
  const [mergeMode, setMergeMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [select, setSelect] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [chosenId, setChosenId] = useState(["", ""]);
  const listCat = [
    "Food",
    "Transport",
    "Bills",
    "Entertainment",
    "Shopping",
    "Fashion",
    "Misc",
  ];
  const imgSrcs = [
    "/tang-big.png",
    "/white-big.png",
    "/palm-big.png",
    "/spooky-big.png",
    "/last.png",
    "/bush.png",
    "/aut-big.png",
  ];
  const categoryImagePairs = listCat.map((category, index) => ({
    category,
    imgSrc: imgSrcs[index],
  }));

  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.WheelEvent) => {
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
    setChosenId(["", ""]);
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
    setStore([
      ...store,
      {
        id: crypto.randomUUID(),
        category: select,
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        size: 200,
        merged: [],
      },
    ]);
  };
  const handleMerge = () => {
    if (chosenId[0] === "" || chosenId[1] === "") return;

    const item1 = store.find((item) => item.id === chosenId[0]);
    const item2 = store.find((item) => item.id === chosenId[1]);

    if (!item1 || !item2) return;
    if (
      item1.category !== item2.category ||
      item1.merged.length !== item2.merged.length
    )
      return;

    if (item1.merged.length > 1 && item2.merged.length > 1) {
      const merged = [...item1.merged, ...item2.merged];
      const mergedItem = {
        id: crypto.randomUUID(),
        category: item1.category,
        x: (item1.x + item2.x) / 2,
        y: (item1.y + item2.y) / 2,
        size: item1.size + item2.size,
        merged,
      };
      setStore((prev) => {
        const newStore = prev.filter(
          (item) => item.id !== item1.id && item.id !== item2.id
        );
        return [...newStore, mergedItem];
      });
    } else {
      const newId = crypto.randomUUID();
      const newSize = item1.size + 50;

      setStore((prev) => [
        ...prev.filter((item) => item.id !== item1.id && item.id !== item2.id),
        {
          id: newId,
          category: item1.category,
          x: Math.random() * 1000,
          y: Math.random() * 1000,
          size: newSize,
          merged: [item1.id, item2.id],
        },
      ]);
    }

    setChosenId(["", ""]);
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
          backgroundImage: "url('/grass.png')",
          backgroundSize: "repeat",
          border: "8px solid brown",
          height: "2000px",
          width: "2000px",
        }}
      >
        {store.map((expense, index) => {
          const expenseImageSrc =
            categoryImagePairs.find(
              (pair) =>
                pair.category.toLowerCase() === expense.category.toLowerCase()
            )?.imgSrc || "";

          return (
            <motion.div
              className={`flex flex-col items-center justify-between ${
                chosenId.includes(expense.id) ? "border border-main " : ""
              }`}
              drag
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setChosenId((prev) => {
                  if (prev[0] === "") return [expense.id, ""];
                  else return [prev[0], expense.id];
                });
              }}
              dragMomentum={false}
              dragConstraints={containerRef}
              style={{
                width: expense.size,
                height: expense.size,
                x: expense.x,
                y: expense.y,
                color: "white",
                textAlign: "center",
              }}
              key={index}
            >
              <Image
                alt={"tree:" + expense.category}
                src={expenseImageSrc}
                draggable={false}
                fill
              />
              {/* {expense.category} */}
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
        <Button
          disabled={chosenId[0] === "" || chosenId[1] === ""}
          size={"icon"}
          onClick={handleMerge}
        >
          <HandshakeIcon />
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
