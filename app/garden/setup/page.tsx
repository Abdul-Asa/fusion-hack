"use client";
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/jotai-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSync } from "@/lib/hooks/use-sync";

const Setup: React.FC = () => {
  const [userPref, setUserPref] = useAtom(userAtom);
  const [name, setName] = useState(userPref.name || "");
  const [currency, setCurrency] = useState(userPref.currency || "");
  // const { saveToLocalStorage } = useSync();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setUserPref({ name, currency, symbol: "$" });
    // saveToLocalStorage();
    router.push("/garden/import");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4"
    >
      <label className="flex flex-col">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />
      </label>
      <label className="flex flex-col">
        Currency:
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />
      </label>
      <Button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Save
      </Button>
    </form>
  );
};

export default Setup;
