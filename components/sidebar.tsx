"use client";
import { ArrowBigRight, ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Sidebar() {
  const [trigger, setTrigger] = useState(false);

  return (
    <nav className="h-screen w-72 px-16 font-chivo py-10 text-main ">
      <div className="flex flex-col">
        <h1 className="text-2xl mb-10 font-francues">Money Trees</h1>
        <ul className="flex flex-col gap-4">
          <Link href="/garden">Garden</Link>
          <Link href="/garden/stats">Stats</Link>
          <Link href="/garden/import">Import</Link>
          <Link href="/garden/export">Export</Link>
          <Link href="/">Home</Link>
          <Link href={"/garden/setup"}>Setup</Link>
        </ul>
      </div>
    </nav>
  );
}
