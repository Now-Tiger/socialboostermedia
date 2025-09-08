import Navbar from "@/components/landing/Navbar";
import { GetCustomCrudForm } from "@/components/crud/CustomCrudForm";

export default function DisplayCrudApp() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <GetCustomCrudForm />
    </div>
  );
}
