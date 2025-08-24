
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useResetPasswordMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"



const passwordSchema = z.object({
    oldPassword: z.string(),
    newPassword: z.string(),

})


export function ChangePasswordModal() {
    const [resetPassword] = useResetPasswordMutation()

    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        }
    })

    const [open, setOpen] = useState(false)



    const onSubmit = async (data: z.infer<typeof passwordSchema>) => {
        const toastId = toast.loading("changing password....")
        
        try {
             
                const res = await resetPassword(data).unwrap()

                if (res.success) {
                    toast.success("password changed successfully", { id: toastId })
                    setOpen(false)
                }

            
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button className="w-full text-foreground">Password Change</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Password Change</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-5" id="division-id" onSubmit={form.handleSubmit(onSubmit)}>
                        {/* oldPassword */}
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* new password */}
                        <FormField
                            // disabled={userData?.data?.password !== oldPassword}
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </form>

                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button form="division-id" type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
