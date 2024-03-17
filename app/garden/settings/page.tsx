"use client";
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/jotai-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSync } from "@/lib/hooks/use-sync";
import { Card } from "@/components/ui/card";
import { MobileMenu } from "@/components/mobile-menu";

const Setup: React.FC = () => {
  const [userPref, setUserPref] = useAtom(userAtom);
  const [name, setName] = useState(userPref.name || "");
  const [currency, setCurrency] = useState(userPref.currency || "");
  const [symbol, setSymbol] = useState(userPref.symbol || "");
  // const { saveToLocalStorage } = useSync();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setUserPref({ name, currency, symbol });
    // saveToLocalStorage();
    router.push("/garden/");
  };
  const currencies = [
    {
      name: "USD",
      symbol: "$",
    },
    {
      name: "EUR",
      symbol: "€",
    },
    {
      name: "GBP",
      symbol: "£",
    },
    {
      name: "JPY",
      symbol: "¥",
    },
    {
      name: "NGN",
      symbol: "₦",
    },
  ];

  return (
    <div className="flex flex-col h-full lg:p-10 p-6">
      <div className="flex justify-between mb-2 lg:mb-10 items-center">
        <h1 className="lg:text-3xl text-lg text-main">Setup</h1>
        <MobileMenu />
      </div>
      <Card>
        <form onSubmit={handleSubmit} className="lg:m-10   space-y-8">
          <label className="flex flex-col ">
            <p className="pb-2">Enter your name:</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-300 rounded-md max-w-lg p-2"
            />
          </label>
          <label className="flex flex-col lg:pb-10">
            <p className="pb-2">Choose your currency:</p>
            <div className="flex w-full flex-col lg:flex-row gap-2 justify-evenly ">
              {currencies.map((currencyOption) => (
                <div
                  key={currencyOption.name}
                  onClick={() => {
                    setSymbol(currencyOption.symbol);
                    setCurrency(currencyOption.name);
                  }}
                  className={`flex items-center box-border flex-col lg:p-8 p-2 rounded-md cursor-pointer hover:bg-gray-100 ${
                    currency === currencyOption.name
                      ? "border-main border-2"
                      : "border"
                  }`}
                >
                  <span className=" lg:text-2xl">{currencyOption.symbol}</span>
                  <span>{currencyOption.name}</span>
                </div>
              ))}
            </div>
          </label>
          <Button type="submit" disabled={!name || !currency || !symbol}>
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Setup;
