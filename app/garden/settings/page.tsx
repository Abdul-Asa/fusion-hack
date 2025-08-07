"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/jotai-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MobileMenu } from "@/components/mobile-menu";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { currencies } from "@/lib/constants";

const Setup: React.FC = () => {
  const [userPref, setUserPref] = useAtom(userAtom);
  const [name, setName] = useState(userPref.name || "");
  const [currency, setCurrency] = useState(userPref.currency || "");
  const [symbol, setSymbol] = useState(userPref.symbol || "");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setUserPref({ name, currency, symbol });
    toast.success("Settings saved successfully!");
    router.push("/garden/");
  };

  const handleDeleteData = () => {
    setUserPref({ name: "User", currency: "USD", symbol: "$" });
    setName("User");
    setCurrency("USD");
    setSymbol("$");
    localStorage.removeItem("expenses");
    localStorage.removeItem("gardenNodes");
    toast.success("All data deleted successfully");
    // Reset form state
    setOpen(false);
  };

  return (
    <div className="flex flex-col h-full lg:p-10 p-6 space-y-6">
      <div className="flex justify-between mb-2 lg:mb-6 items-center">
        <h1 className="lg:text-3xl text-lg font-semibold text-main">
          Settings
        </h1>
        <MobileMenu />
      </div>

      {/* User Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-main">
            Personal Information
          </CardTitle>
          <CardDescription>
            Update your personal details and currency preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="max-w-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={currency}
                onValueChange={(value) => {
                  setCurrency(value);
                  const selectedCurrency = currencies.find(
                    (c) => c.name === value
                  );
                  if (selectedCurrency) {
                    setSymbol(selectedCurrency.symbol);
                  }
                }}
              >
                <SelectTrigger className="max-w-lg">
                  <SelectValue placeholder="Select your currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currencyOption) => (
                    <SelectItem
                      key={currencyOption.name}
                      value={currencyOption.name}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{currencyOption.symbol}</span>
                        <span>{currencyOption.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={!name || !currency || !symbol}
              className="w-full lg:w-auto"
            >
              Save Settings
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Delete Data Card */}
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-xl text-destructive flex items-center gap-2">
            <Trash2 size={20} />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Permanently delete all your data. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full lg:w-auto">
                <Trash2 size={16} className="mr-2" />
                Delete All Data
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete all
                  your expenses, user data, and settings from local storage.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive" onClick={handleDeleteData}>
                  Yes, delete everything
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <p className="lg:block hidden text-xs text-center pt-10 text-main">
        Made with 💜 by Shehu
      </p>
    </div>
  );
};

export default Setup;
