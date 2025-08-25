/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Password from "@/components/ui/Password"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from "@/redux/features/auth/auth.api"
import { toast } from "sonner"


const registerSchema = z.object({
  name: z.string().min(3, {
    error: "name must be at least 3 characters.",
  }),
  email: z.email(),
  phoneNumber: z.string().regex(/^(?:\+8801\d{9})$/, {
    message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX"
  }),
  password: z.string().min(8, { error: "password is to short" }),
  confirmPassword: z.string().min(8, { error: "confirm password is too short" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password does not match",
  path: ["confirmPassword"]
})

export function RegisterForm({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {

  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
    }
    
    const toastId = toast.loading("user creating......")
    try {
      const result = await register(userInfo).unwrap()
      console.log(result)
      toast.success("user created successfully!!!", {id : toastId})
      navigate("/login")

    } catch (error : any) {
      console.error(error)

    }
  }






  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details to create an account
        </p>
      </div>
      <div className="grid gap-6">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* phoneNumber */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Eg +8801XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your phoneNumber.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your confirm password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full text-foreground">Submit</Button>
          </form>
        </Form>


      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  )
}
