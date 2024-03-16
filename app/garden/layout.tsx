import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bland">
      <Sidebar />
      <div className="flex-grow font-chivo">{children}</div>
    </div>
  );
}
