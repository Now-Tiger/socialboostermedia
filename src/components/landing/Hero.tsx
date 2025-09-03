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

export default function Hero() {
  const router = useRouter();

  const handleFetchData = () => {
    // Navigate to the analytics page
    router.push("/analytics");
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
            onClick={handleFetchData}
            className="bg-gray-600 w-full hover:bg-gray-700"
          >
            Fetch Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
