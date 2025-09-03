import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GetAnalyticsPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Analytics Page</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          This is where the fetched data will be displayed.
        </p>
        <Link href="/">
          <button className="flex items-center gap-2 text-blue-500 hover:underline">
            <ArrowLeft size={16} /> Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
