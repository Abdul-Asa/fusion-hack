import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  HandIcon,
  HandshakeIcon,
  PlusIcon,
  DollarSignIcon,
  FileTextIcon,
  TagIcon,
} from "lucide-react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [select, setSelect] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [chosenId, setChosenId] = useState("");
  const [chosenId2, setChosenId2] = useState("");

  const [keyIsDown, setKeyIsDown] = useState(false);
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
  useEffect(() => {
    const handleKeyDown = () => setKeyIsDown(true);
    const handleKeyUp = () => setKeyIsDown(false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  const imgSrcs = [
    "/tang-big.png",
    "/white-big.png",
    "/palm-big.png",
    "/spooky-big.png",
    "/last.png",
    "/bush.png",
    "/aut-big.png",
  ];
  const categoryImagePairs = categories.map((category, index) => ({
    category: category.name,
    imgSrc: imgSrcs[index],
    color: category.color,
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
    setChosenId("");
    setChosenId2("");
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
    if (chosenId === "" || chosenId2 === "") return;

    const item1 = store.find((item) => item.id === chosenId);
    const item2 = store.find((item) => item.id === chosenId2);

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
      const newSize = item1.size + 100;

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

    setChosenId("");
    setChosenId2("");
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
                chosenId === expense.id || chosenId2 === expense.id
                  ? "border-2 border-main "
                  : ""
              }`}
              drag
              onClick={(e) => {
                e.preventDefault();
                if (keyIsDown) {
                  if (chosenId === "") {
                    setChosenId(expense.id);
                  } else if (chosenId2 === "") {
                    setChosenId2(expense.id);
                  }
                }
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
                <Select value={select} onValueChange={(val) => setSelect(val)}>
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
                      {date ? format(date, "PPP") : <span>Select a date</span>}
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
      </div>
    </>
  );
}
