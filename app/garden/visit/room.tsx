"use client";

import { ReactNode } from "react";

import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";
import { useAtomValue } from "jotai";
import { userAtom } from "@/lib/jotai-context";

export default function Room({ children }: { children: ReactNode }) {
  const userRef = useAtomValue(userAtom);
  return (
    <RoomProvider
      id="fusion-lobby"
      initialPresence={{
        userName: userRef.name || "Anonymous",
        x: Math.random() * 1000,
        y: Math.random() * 1000,
      }}
    >
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
