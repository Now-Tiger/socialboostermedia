"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Hero() {
  const [, setStatus] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    const apiEndPoint = "http://52.91.1.148:8000/";
    try {
      const response = await fetch(apiEndPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setStatus(data.success);
      if (data.success) {
        router.push("/analytics");
      }
    } catch (error) {
      console.error(`Failed to fetch data`, error);
      setStatus(false);
      router.push("/#analytics");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-[350px] shadow-lg shadow-gray-200 py-20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Home Page</CardTitle>
          <CardDescription>
            Choose an action below to manage analytics data.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-3">
          <Button
            onClick={fetchData}
            className="bg-gray-700 w-full hover:bg-gray-900"
          >
            Fetch Data
          </Button>
          <Link href="/app">
            <Button className="bg-gray-700 w-full hover:bg-gray-900">
              Add Data
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
