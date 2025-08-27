
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCashInMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const formSchema = z.object({
  types: z.enum(["DEPOSIT", "WITHDRAW", "SEND", "RECEIVE", "CASH_IN", "CASH_OUT"]),
  amount: z.string().min(1, "Amount is required"),
  receiverEmail: z.email(),
})



export default function CashIn() {

  const [cashInMoney] = useCashInMoneyMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      types: "CASH_IN",
      amount: "",
      receiverEmail: "",
    },
  });






  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("please wait....");


    const cashData = {
      ...data,
      amount: Number(data.amount),
      receiverEmail : data.receiverEmail
    };


    try {
      const res = await cashInMoney(cashData).unwrap();

      if (res.success) {
        toast.success("cash in successful", { id: toastId });
        form.reset();
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (err: unknown) {
     
      const errorMessage =
        (err as any)?.data?.message || (err as any)?.error || "Failed to cash in";

      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-5 mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Cash In</CardTitle>
          <CardDescription>Cash In to any wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-cash-form"
              className="space-y-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="types"
                render={({ field }) => (
                  <FormItem className="flex-1 ">
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}

                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DEPOSIT">deposit</SelectItem>
                        <SelectItem value="WITHDRAW">withdraw</SelectItem>
                        <SelectItem value="SEND">send</SelectItem>
                        <SelectItem value="RECEIVE">receive</SelectItem>
                        <SelectItem value="CASH_IN">cash-in</SelectItem>
                        <SelectItem value="CASH_OUT">cash-out</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receiverEmail"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Receiver  Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" form="add-cash-form">
            Cash In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}