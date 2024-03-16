"use client";
import React, { useCallback } from "react";
import { toast } from "sonner";
import { Expenses, storeAtom } from "@/lib/jotai-context";
import { Card } from "@/components/ui/card";
import { ImportIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { parse } from "csv-parse";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex flex-col h-full lg:p-10 p-6 ">
      <h1 className="text-3xl  mb-10 text-main">Import CSV</h1>
      <div className="flex gap-6 h-full flex-col">
        <Card {...getRootProps()} className=" flex-grow">
          <input {...getInputProps()} />
          <div className="justify-center flex flex-col gap-4 items-center ">
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
        <Card className="flex-grow">
          <p className="text-main">
            <span className="font-bold">Note:</span> Only CSV files are
            supported
          </p>
        </Card>
      </div>
    </div>
  );
};
export default Import;
