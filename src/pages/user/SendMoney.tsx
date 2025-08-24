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
import { useGetAllUserQuery, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useSendMoneyMutation } from "@/redux/features/transaction/transaction.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";


const formSchema = z.object({
  types: z.enum(["DEPOSIT", "WITHDRAW", "SEND", "RECEIVE", "CASH_IN", "CASH_OUT"]),
  amount: z.string().min(1, "Amount is required"),
  receiverWallet: z.string().min(1, "sender is required"),
})



export default function SendMoney() {
  const { data: userData } = useUserInfoQuery(undefined)
  const { data: allUserData, isLoading: allUserLoading } = useGetAllUserQuery({ role: "USER" })


  const [sendMoney] = useSendMoneyMutation()

  const allUsersOptions = allUserData?.data?.map(
    (item: { wallet: string; email: string }) => ({
      value: item.wallet,
      label: item.email,
    })
  );


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      types: "SEND",
      amount: "",
      receiverWallet: "",
    },
  });






  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("money sending....");


    const sendData = {
      ...data,
      amount: Number(data.amount),
      senderWallet: userData?.data?.wallet,
      initiateBy: userData?.data?._id

    };


    try {
      const res = await sendMoney(sendData).unwrap();

      if (res.success) {
        toast.success("money send successful", { id: toastId });
        form.reset();
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (err: unknown) {
     
      const errorMessage =
        (err as any)?.data?.message || (err as any)?.error || "Failed to send money";

      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-5 mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
          <CardDescription>Send money to your friend wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              id="add-send-form"
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
                name="receiverWallet"
                render={({ field }) => (
                  <FormItem className="flex-1 ">
                    <FormLabel>Receiver</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={allUserLoading}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {allUsersOptions?.map(
                          (item: { label: string; value: string }) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />


            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" form="add-send-form">
            send Money
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}