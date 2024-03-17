"use client";
import { ArrowBigRight, ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Sidebar() {
  const [trigger, setTrigger] = useState(false);

  return (
    <nav className="h-screen px-16 py-10 w-72 font-chivo text-main ">
      <div className="flex flex-col">
        <h1 className="mb-10 text-2xl font-francues">Money Trees</h1>
        <ul className="flex flex-col gap-4">
          <Link href="/garden">Garden</Link>
          <Link href="/garden/stats">Stats</Link>
          <Link href="/garden/import">Import</Link>
          <Link href={"/garden/settings"}>Settings</Link>
          <Link href="/">Home</Link>
        </ul>
      </div>
    </nav>
  );
}
