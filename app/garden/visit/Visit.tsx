"use client";
import { useEffect, useRef, useState } from "react";
import { useOthers, useSelf } from "@/liveblocks.config";
import { MobileMenu } from "@/components/mobile-menu";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { HandIcon } from "lucide-react";
import useDisableScrollBounce from "@/lib/hooks/use-disable-bounce";
import { toast } from "sonner";
import Image from "next/image";

export default function Visit() {
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
  const [{ height, width }, setContainerSize] = useState({
    width: 0,
    height: 0,
  });

  const canvasRef = useRef<HTMLDivElement>(null);
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

  useDisableScrollBounce();
  useEffect(() => {
    if (canvasRef.current) {
      setContainerSize({
        width: canvasRef.current.offsetWidth,
        height: canvasRef.current.offsetHeight,
      });
    }
  }, []);

  const me = useSelf();
  const others = useOthers();

  return (
    <div className="flex flex-col h-full p-6 lg:p-10">
      <div className="flex items-center justify-between mb-2 lg:mb-10">
        <h1 className="text-lg lg:text-3xl text-main">Visit</h1>
        <MobileMenu />
      </div>
      <Card className="flex-grow gap-4">
        <div
          ref={canvasRef}
          className="relative flex items-center justify-center h-full overflow-hidden border-2 border-main"
        >
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
              {me && (
                <motion.div
                  className={`flex flex-col items-center justify-between border border-main `}
                  drag
                  dragMomentum={false}
                  dragConstraints={containerRef}
                  style={{
                    width: 200,
                    height: 200,
                    x: me.presence.x,
                    y: me.presence.y,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  <Image
                    alt={"tree:" + me.presence.userName}
                    src="/bush.png"
                    draggable={false}
                    fill
                  />
                  <p>{me.presence.userName}</p>
                </motion.div>
              )}
              {others.map((other) => {
                return (
                  <motion.div
                    className={`flex flex-col items-center justify-between border border-main `}
                    drag
                    onClick={(e) => {
                      toast(
                        "You can't visit " + other.presence.userName + " yet"
                      );
                    }}
                    dragMomentum={false}
                    dragConstraints={containerRef}
                    style={{
                      width: 200,
                      height: 200,
                      x: other.presence.x,
                      y: other.presence.y,
                      color: "white",
                      textAlign: "center",
                    }}
                    key={other.connectionId}
                  >
                    <Image
                      alt={"tree:" + other.presence.userName}
                      src={"/tang-big.png"}
                      draggable={false}
                      fill
                    />
                    <p>{other.presence.userName}</p>
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
        </div>
      </Card>
    </div>
  );
}
