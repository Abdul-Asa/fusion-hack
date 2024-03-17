"use client";
import {
  ArrowBigRight,
  ArrowBigLeft,
  Flower2,
  BarChart,
  Import,
  ImportIcon,
  Settings,
  LogOutIcon,
  HomeIcon,
  ReceiptIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Sidebar() {
  const [trigger, setTrigger] = useState(false);

  return (
    <nav className="h-screen pl-16 py-10 w-72 font-chivo text-main ">
      <div className="flex flex-col">
        <h1 className="mb-10 text-2xl font-francues flex items-center">
          <ReceiptIcon size={30} className="mr-2" />
          Money Trees
        </h1>
        <ul className="flex flex-col gap-8">
          <Link className="hover:underline flex items-center" href="/garden">
            <Flower2 size={20} className="mr-2" />
            Garden
          </Link>
          <Link
            className="hover:underline flex items-center"
            href="/garden/stats"
          >
            <BarChart size={20} className="mr-2" />
            Stats
          </Link>
          <Link
            className="hover:underline flex items-center"
            href="/garden/import"
          >
            <ImportIcon size={20} className="mr-2" />
            Import
          </Link>
          <Link
            className="hover:underline flex items-center"
            href={"/garden/settings"}
          >
            <Settings size={20} className="mr-2" />
            Settings
          </Link>
          <Link
            className="hover:underline flex items-center"
            href="/garden/visit"
          >
            <LogOutIcon size={20} className="mr-2" />
            Visit
          </Link>
          <Link className="hover:underline flex items-center" href="/">
            <HomeIcon size={20} className="mr-2" />
            Home
          </Link>
        </ul>
      </div>
    </nav>
  );
}
