import { Link } from "lucide-react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="h-screen w-64 bg-gray-800 text-white p-5">
        <h1 className="text-2xl mb-4">Sidebar</h1>
        <ul>
          <Link href="/garden">Garden</Link>
          <Link href="/garden/stats">Stats</Link>
          <Link href="/garden/import">Import</Link>
          <Link href="/garden/export">Export</Link>
        </ul>
      </div>
      <div className="flex-grow p-5">{children}</div>
    </div>
  );
}
