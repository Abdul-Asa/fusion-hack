"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/jotai-context";
import { Card } from "@/components/ui/card";
import { MobileMenu } from "@/components/mobile-menu";
import Canvas from "@/components/canvas";
import useDisableScrollBounce from "@/lib/hooks/use-disable-bounce";
import { ClientOnly } from "@/lib/hooks/use-client-only";
import { CanvasLoader } from "@/components/canvas-loader";

const MainGarden: React.FC = () => {
  const userPref = useAtomValue(userAtom);
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
    <div className="flex flex-col h-full p-6 lg:p-10">
      <div className="flex items-center justify-between mb-2 lg:mb-10">
        <h1 className="text-lg lg:text-3xl text-main">Garden</h1>
        <MobileMenu />
      </div>
      <Card className="flex-grow gap-4">
        <h1>Hi, {userPref.name}</h1>
        <div
          ref={containerRef}
          className="relative flex items-center justify-center h-full overflow-hidden border-2 border-main"
        >
          <ClientOnly fallback={<CanvasLoader />}>
            <Canvas width={containerSize.width} height={containerSize.height} />
          </ClientOnly>
        </div>
      </Card>
      <p className="lg:block hidden text-xs text-center pt-10 text-main">
        A dollar might turn to a million and we all rich
      </p>
    </div>
  );
};

export default MainGarden;
