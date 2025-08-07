"use client";
import {
  Flower2,
  BarChart,
  ImportIcon,
  Settings,
  ReceiptIcon,
  InfoIcon,
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="h-screen pl-16 py-10 w-72 font-chivo text-main ">
      <div className="flex flex-col">
        <Link
          className="mb-10 text-2xl font-francues flex items-center"
          href="/"
        >
          <ReceiptIcon size={30} className="mr-2" />
          Money Trees
        </Link>
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
            href="/garden/about"
          >
            <InfoIcon size={20} className="mr-2" />
            About
          </Link>
        </ul>
      </div>
    </nav>
  );
}
