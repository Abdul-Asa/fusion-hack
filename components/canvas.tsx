import { useState } from "react";
import { Button } from "./ui/button";
import {
  CalendarIcon,
  PlusIcon,
  DollarSignIcon,
  FileTextIcon,
  TagIcon,
} from "lucide-react";
import { useAtom, useAtomValue } from "jotai";
import {
  storeAtom,
  gardenAtom,
  type GardenNode,
  userAtom,
} from "@/lib/jotai-context";
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
import { format } from "date-fns";
import { categories, categoryImagePairs } from "@/lib/constants";

export default function Canvas({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  const userPref = useAtomValue(userAtom);
  const [expenses, setExpenses] = useAtom(storeAtom);
  const [gardenNodes, setGardenNodes] = useAtom(gardenAtom);
  const [camera, setCamera] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isDraggingTree, setIsDraggingTree] = useState(false);
  const [draggedTreeId, setDraggedTreeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [form, setForm] = useState<{
    description: string;
    amount: number;
    category: string;
    date: Date | undefined;
  }>({
    description: "",
    amount: 0,
    category: "",
    date: undefined,
  });

  const constrainCamera = (x: number, y: number) => {
    const maxX = 2000 / 2 - width / 2;
    const maxY = 2000 / 2 - height / 2;
    const minX = -(2000 / 2) + width / 2;
    const minY = -(2000 / 2) + height / 2;

    const newX = Math.min(Math.max(x, minX), maxX);
    const newY = Math.min(Math.max(y, minY), maxY);

    return { x: newX, y: newY };
  };

  const handleScroll = (event: React.WheelEvent) => {
    setCamera((prev) => {
      const newX = prev.x - event.deltaX;
      const newY = prev.y - event.deltaY;
      return constrainCamera(newX, newY);
    });
  };

  // Mouse pan handlers
  const handleMouseDown = (event: React.MouseEvent) => {
    if (!isDraggingTree) {
      setIsPanning(true);
      setLastPanPoint({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDraggingTree && draggedTreeId) {
      // Handle tree dragging
      const newX = event.clientX - dragOffset.x - camera.x;
      const newY = event.clientY - dragOffset.y - camera.y;

      setGardenNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === draggedTreeId
            ? {
                ...node,
                x: Math.max(0, Math.min(newX, 1800)),
                y: Math.max(0, Math.min(newY, 1800)),
              }
            : node
        )
      );
    } else if (isPanning) {
      // Handle canvas panning
      const deltaX = event.clientX - lastPanPoint.x;
      const deltaY = event.clientY - lastPanPoint.y;

      setCamera((prev) => {
        const newX = prev.x + deltaX;
        const newY = prev.y + deltaY;
        return constrainCamera(newX, newY);
      });

      setLastPanPoint({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setIsDraggingTree(false);
    setDraggedTreeId(null);
  };

  // Touch pan handlers
  const handleTouchStart = (event: React.TouchEvent) => {
    if (event.touches.length === 1 && !isDraggingTree) {
      const touch = event.touches[0];
      setIsPanning(true);
      setLastPanPoint({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (event.touches.length !== 1) return;

    const touch = event.touches[0];

    if (isDraggingTree && draggedTreeId) {
      // Handle tree dragging
      event.preventDefault(); // Prevent scrolling
      const newX = touch.clientX - dragOffset.x - camera.x;
      const newY = touch.clientY - dragOffset.y - camera.y;

      setGardenNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === draggedTreeId
            ? {
                ...node,
                x: Math.max(0, Math.min(newX, 1800)),
                y: Math.max(0, Math.min(newY, 1800)),
              }
            : node
        )
      );
    } else if (isPanning) {
      // Handle canvas panning
      event.preventDefault(); // Prevent scrolling
      const deltaX = touch.clientX - lastPanPoint.x;
      const deltaY = touch.clientY - lastPanPoint.y;

      setCamera((prev) => {
        const newX = prev.x + deltaX;
        const newY = prev.y + deltaY;
        return constrainCamera(newX, newY);
      });

      setLastPanPoint({ x: touch.clientX, y: touch.clientY });
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    setIsDraggingTree(false);
    setDraggedTreeId(null);
  };

  // Tree dragging handlers
  const handleTreeMouseDown = (
    event: React.MouseEvent,
    nodeId: string,
    nodeX: number,
    nodeY: number
  ) => {
    event.stopPropagation(); // Prevent canvas panning
    setIsDraggingTree(true);
    setDraggedTreeId(nodeId);

    // Calculate offset from mouse position to tree position
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Store the offset from mouse to tree position (accounting for camera)
    const offsetX = mouseX - (nodeX + camera.x);
    const offsetY = mouseY - (nodeY + camera.y);

    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleTreeTouchStart = (
    event: React.TouchEvent,
    nodeId: string,
    nodeX: number,
    nodeY: number
  ) => {
    if (event.touches.length === 1) {
      event.stopPropagation(); // Prevent canvas panning
      const touch = event.touches[0];
      setIsDraggingTree(true);
      setDraggedTreeId(nodeId);

      // Calculate offset from touch position to tree position
      const touchX = touch.clientX;
      const touchY = touch.clientY;

      // Store the offset from touch to tree position (accounting for camera)
      const offsetX = touchX - (nodeX + camera.x);
      const offsetY = touchY - (nodeY + camera.y);

      setDragOffset({ x: offsetX, y: offsetY });
    }
  };

  const handleSubmit = () => {
    const newExpenseId = crypto.randomUUID();
    setExpenses((prev) => [
      ...prev,
      {
        id: newExpenseId,
        date: format(form.date!, "yyyy-MM-dd"),
        category: form.category,
        amount: form.amount,
        description: form.description,
      },
    ]);

    setGardenNodes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        category: form.category,
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        size: 200,
        expenseIds: [newExpenseId],
      },
    ]);

    setForm({
      description: "",
      amount: 0,
      category: "",
      date: undefined,
    });
  };

  const getTreeLabel = (node: GardenNode) => {
    const treeExpenses = expenses.filter((expense) =>
      node.expenseIds.includes(expense.id)
    );
    const total = treeExpenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    return `${userPref.symbol}${total} - ${treeExpenses
      .map((expense) => expense.description)
      .join(", ")}`;
  };

  return (
    <>
      <div
        onWheel={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          translate: `${camera.x}px ${camera.y}px`,
          position: "absolute",
          backgroundImage: "url('/grass.png')",
          backgroundSize: "repeat",
          border: "8px solid brown",
          height: "2000px",
          width: "2000px",
          cursor: isPanning ? "grabbing" : "grab",
          touchAction: "none", // Prevent default touch behaviors
        }}
      >
        {gardenNodes.map((node) => {
          const expenseImageSrc =
            categoryImagePairs.find(
              (pair) =>
                pair.category.toLowerCase() === node.category.toLowerCase()
            )?.imgSrc || "";

          return (
            <div
              key={node.id}
              className="relative flex flex-col items-center justify-end"
              onMouseDown={(e) =>
                handleTreeMouseDown(e, node.id, node.x, node.y)
              }
              onTouchStart={(e) =>
                handleTreeTouchStart(e, node.id, node.x, node.y)
              }
              style={{
                position: "absolute",
                width: node.size,
                height: node.size,
                left: node.x,
                top: node.y,
                color: "white",
                textAlign: "center",
                cursor:
                  isDraggingTree && draggedTreeId === node.id
                    ? "grabbing"
                    : "grab",
                userSelect: "none",
                zIndex: isDraggingTree && draggedTreeId === node.id ? 10 : 1,
                border:
                  isDraggingTree && draggedTreeId === node.id
                    ? "3px solid #3b82f6"
                    : "3px solid transparent",
                borderRadius: "12px",
                boxSizing: "border-box",
              }}
            >
              <Image
                alt={"tree:" + node.category}
                src={expenseImageSrc}
                draggable={false}
                fill
              />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                {getTreeLabel(node)}
              </div>
            </div>
          );
        })}
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
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
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
                    value={form.amount || ""}
                    onChange={(e) =>
                      setForm({ ...form, amount: Number(e.target.value) })
                    }
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
                  value={form.category}
                  onValueChange={(val) => setForm({ ...form, category: val })}
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
                        !form.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                      {form.date ? (
                        format(form.date, "PPP")
                      ) : (
                        <span>Select a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={form.date}
                      onSelect={(date) =>
                        setForm({ ...form, date: date || undefined })
                      }
                      autoFocus
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
                  disabled={
                    !form.date ||
                    !form.category ||
                    !form.amount ||
                    !form.description
                  }
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
