"use client";

import { useForm, type SubmitHandler, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const apiEndPoint = process.env.awsUserAnalyticsRoute ?? 'https://nowtiger.dpdns.org/user-analytics/';
const zodSchemaMsg = "Should be a postive number.";

const FormSchema = z.object({
  desktopUsers: z.coerce.number().min(0, {
    message: zodSchemaMsg,
  }),
  mobileUsers: z.coerce.number().min(0, {
    message: zodSchemaMsg,
  }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be YYYY-MM-DD" }),
});

type FormValues = z.infer<typeof FormSchema>

export function GetCustomCrudForm() {
  // Cast the resolver so TypeScript sees a Resolver<FormValues>.
  // This prevents the zod input/output mismatch from producing Resolver generic errors.
  const resolver = zodResolver(FormSchema) as unknown as Resolver<FormValues, undefined>;

  const form = useForm<FormValues>({
    resolver,
    // keep defaults sensible; number fields start empty (undefined) so inputs render blank
    defaultValues: {
      desktopUsers: undefined,
      mobileUsers: undefined,
      date: "",
    } as Partial<FormValues>,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // The onSubmit handler is now an async function to handle the API call.
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    // Construct the payload with the correct key names
    const payload = {
      date: values.date,
      desktop: values.desktopUsers,
      mobile: values.mobileUsers,
    };

    console.log("Sending payload:", payload);

    try {
      const response = await fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast("Success!", {
          description: "Data added successfully.",
        });
        form.reset(); // Optionally reset the form on success
      } else {
        // Handle server-side errors
        const errorData = await response.json();
        const errorMessage = errorData.message || "An unknown error occurred.";
        toast("Error!", {
          description: `Failed to add data: ${errorMessage}`,
        });
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Fetch error:", error);
      toast("Error!", {
        description: "Failed to connect to the server. Please check your network.",
      });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900 sm:flex-row">
      <Card className="w-[400px] shadow-lg py-10 px-6">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-4xl">🧃 JuiceForm</CardTitle>
          <CardDescription>
            Add data to see changes on dashboard
          </CardDescription>
        </div>
      </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Desktop Users */}
            <FormField
              control={form.control}
              name="desktopUsers"
              render={({ field }) => {
                const numericValue =
                  field.value === undefined || field.value === null ? "" : String(field.value);
                return (
                  <FormItem>
                    <FormLabel>Desktop Users</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="100"
                        value={numericValue}
                        onChange={(e) => {
                          const raw = e.target.value;
                          // empty string -> undefined, else number
                          field.onChange(raw === "" ? undefined : Number(raw));
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Mobile Users */}
            <FormField
              control={form.control}
              name="mobileUsers"
              render={({ field }) => {
                const numericValue =
                  field.value === undefined || field.value === null ? "" : String(field.value);
                return (
                  <FormItem>
                    <FormLabel>Mobile Users</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="200"
                        value={numericValue}
                        onChange={(e) => {
                          const raw = e.target.value;
                          field.onChange(raw === "" ? undefined : Number(raw));
                        }}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
