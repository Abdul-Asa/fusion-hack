"use client";
import React, { useCallback } from "react";
import { toast } from "sonner";
import { Expenses, storeAtom } from "@/lib/jotai-context";
import { Card } from "@/components/ui/card";
import { ImportIcon, PackageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/mobile-menu";

const Import: React.FC = () => {
  const [expenseList, setExpensesList] = useAtom(storeAtom);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      if (file.type !== "text/csv") {
        console.error("Invalid file type");
        toast.error("Invalid file type");
        return;
      }

      const loadingId = toast.loading("Loading data");
      const reader = new FileReader();

      reader.onerror = () => {
        toast.error("Error reading file");
        console.error(reader.error);
      };
      reader.onabort = () => {
        toast.error("File reading aborted");
        console.error("File reading aborted");
      };
      reader.onload = () => {
        const result = reader.result;
        if (result) {
          parse(
            result as string,
            {
              columns: true,
              skip_empty_lines: true,
            },
            (err, data) => {
              if (err) {
                console.error(err);
                toast.error("Error parsing CSV");
                return;
              }

              // Check if necessary headers are present
              const requiredHeaders = [
                "description",
                "amount",
                "date",
                "category",
              ];
              const headers = Object.keys(data[0]);
              const missingHeaders = requiredHeaders.filter(
                (h) => !headers.includes(h)
              );
              if (missingHeaders.length > 0) {
                toast.error(
                  `Invalid CSV. Missing headers: ${missingHeaders.join(", ")}`
                );
                console.error(`Missing headers: ${missingHeaders.join(", ")}`);
                return;
              }

              // Convert data to Expense objects
              const expenses: Expenses[] = data.map((row: any) => ({
                description: row.description,
                amount: Number(row.amount),
                date: row.date,
                id: crypto.randomUUID(),
                category: row.category,
              }));

              setExpensesList([...expenseList, ...expenses]);
              toast.success("CSV file imported successfully", {
                action: {
                  label: "Go to garden",
                  onClick: () => {
                    router.push("/garden");
                  },
                },
              });
            }
          );
        }
        toast.dismiss(loadingId);
      };

      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  const handleExport = () => {
    stringify(expenseList, { header: true }, (err, output) => {
      if (err) {
        console.error(err);
        toast.error("Error generating CSV");
        return;
      }

      const blob = new Blob([output], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute("download", "export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
  return (
    <div className="flex flex-col h-full lg:p-10 p-6 ">
      <div className="flex justify-between mb-2 lg:mb-10 items-center">
        <h1 className="lg:text-3xl text-lg text-main">Import CSV</h1>
        <MobileMenu />
      </div>
      <div className="flex gap-6 h-full flex-col">
        <Card {...getRootProps()} className=" flex-grow">
          <input {...getInputProps()} />
          <div className="justify-center flex flex-col gap-4 items-center h-full ">
            <ImportIcon className="opacity-50 text-main" size={100} />
            <p className="text-main lg:text-2xl text-center text-lg ml-4 cursor-pointer">
              Import your CSV file
            </p>
            <p className="text-gray-500 lg:text-sm text-xs max-w-lg text-center ml-4">
              Your csv should contain at least the following columns: &nbsp;
              <span className="text-main underline">date</span>, &nbsp;
              <span className="text-main underline">description</span>, &nbsp;
              <span className="text-main underline">amount</span>, &nbsp;and
              &nbsp;
              <span className="text-main underline">category</span>
            </p>
          </div>
        </Card>
        <Card className=" flex-grow">
          <div
            className="justify-center flex flex-col gap-4 items-center h-full "
            onClick={handleExport}
          >
            <PackageIcon className="opacity-50 text-main" size={100} />
            <p className="text-main lg:text-2xl text-center text-lg ml-4 cursor-pointer">
              Export your data as a CSV file
            </p>
          </div>
        </Card>
      </div>
      <p className="lg:block hidden text-xs text-center pt-10 text-main">
        Made with 💜 by Shehu
      </p>
    </div>
  );
};
export default Import;
