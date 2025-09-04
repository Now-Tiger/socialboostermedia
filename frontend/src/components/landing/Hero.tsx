"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export default function Hero() {
  const [status, setStatus] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/health-check",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      setStatus(data.success);
      if (data.success) {
        router.push("/analytics");
      }
    } catch (error) {
      console.error(`Failed to fetch data`, error);
      setStatus(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Data Dashboard</CardTitle>
          <CardDescription>
            Click the button below to view the analytics.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            onClick={fetchData}
            className="bg-gray-600 w-full hover:bg-gray-700"
          >
            Fetch Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
