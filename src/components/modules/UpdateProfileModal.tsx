
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
import { useUpdateUserMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


const profileSchema = z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    role: z.string().optional(),
})


export function UpdateProfileModal() {
    const { data: userData } = useUserInfoQuery(undefined)
    const [updateUser] = useUpdateUserMutation()


    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: userData?.data?.name,
            phoneNumber: userData?.data?.phoneNumber,
            role: userData?.data?.role,
        }
    })

    const [open, setOpen] = useState(false)



    const onSubmit = async (data: z.infer<typeof profileSchema>) => {
        const toastId = toast.loading("updating profile....")
        const userId = userData?.data?._id
        if (!userId) {
            toast.error("User ID not found.", { id: toastId });
            return;
        }

        const payload: {
            name?: string,
            phoneNumber?: string,
            role?: string
        } = {};


        if (data.name !== userData?.data?.name) {
            payload.name = data.name
        }
        if (data.phoneNumber !== userData?.data?.phoneNumber) {
            payload.phoneNumber = data.phoneNumber
        }
        if (data.role !== userData?.data?.role) {
            payload.role = data.role
        }


        if (Object.keys(payload).length === 0) {
            toast.info("no changes to save", { id: toastId })
            setOpen(false)
            return
        }

        try {
         
                const res = await updateUser({ userId, payload }).unwrap()

                if (res.success) {
                    toast.success("profile updated successfully", { id: toastId })
                    setOpen(false)
                }
            

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button className="w-full text-foreground">Update Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Profile</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-5" id="division-id" onSubmit={form.handleSubmit(onSubmit)}>
                        {/* name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* phone */}
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* role */}
                        {userData?.data?.role === "ADMIN" && <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="flex-1 ">
                                    <FormLabel>Role</FormLabel>
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
                                            <SelectItem value="USER">user</SelectItem>
                                            <SelectItem value="ADMIN">admin</SelectItem>
                                            <SelectItem value="AGENT">agent</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />}

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
