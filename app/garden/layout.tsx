import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bland">
      <div className="h-screen w-72 px-16 py-10 bg-main text-white">
        <h1 className="text-2xl mb-4">Money Trees</h1>
        <ul className="flex flex-col gap-4">
          <Link href="/garden">Garden</Link>
          <Link href="/garden/stats">Stats</Link>
          <Link href="/garden/import">Import</Link>
          <Link href="/garden/export">Export</Link>
          <Link href="/">Home</Link>
          <Link href={"/garden/setup"}>Setup</Link>
        </ul>
      </div>
      <div className="flex-grow p-5">{children}</div>
    </div>
  );
}
