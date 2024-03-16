import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { HandIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { storeAtom } from "@/lib/jotai-context";

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
    </>
  );
}
