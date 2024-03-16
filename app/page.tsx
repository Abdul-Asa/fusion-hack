import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">Welcome to money trees</h1>
      <p className="text-2xl text-center">A place to grow your money</p>
      <Link href="/dashboard">
        <Button>Get Started</Button>
      </Link>
    </main>
  );
}
