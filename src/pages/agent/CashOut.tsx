

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
import {  useCashOutMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const formSchema = z.object({
  types: z.enum(["DEPOSIT", "WITHDRAW", "SEND", "RECEIVE", "CASH_IN", "CASH_OUT"]),
  amount: z.string().min(1, "Amount is required"),
  fee : z.string().min(1, "fee is required"),
  senderEmail: z.email(),
})



export default function CashOut() {
  const [cashOutMoney] = useCashOutMoneyMutation()

 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      types: "CASH_OUT",
      amount: "",
      fee : "",
      senderEmail: "",
    },
  });


  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("please wait....");


    const cashData = {
      ...data,
      amount: Number(data.amount),
      fee : Number(data.fee),
      senderEmail : data.senderEmail
    };


    try {
      const res = await cashOutMoney(cashData).unwrap();

      if (res.success) {
        toast.success("cash out successful", { id: toastId });
        form.reset();
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (err: unknown) {
     console.log(err)
      toast.error("Failed to cash in", { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-5 mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Cash Out</CardTitle>
          <CardDescription>Cash Out from any wallet</CardDescription>
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
                name="fee"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Fee</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


               <FormField
                control={form.control}
                name="senderEmail"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Sender  Email</FormLabel>
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
            Cash Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}