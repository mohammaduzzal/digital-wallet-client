/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import Password from "@/components/ui/Password"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import z from "zod"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"

const loginSchema = z.object({
  email : z.email(),
  password : z.string()
})



export function LoginForm({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver : zodResolver(loginSchema),
    defaultValues:{
      email : "",
      password : ""
    }
  });

  const onSubmit  = async(data : z.infer<typeof loginSchema>) => {
    try {
      const result = await login(data).unwrap()

      if(result.success){
        navigate("/")
        toast.success("login  successful!!!")
      }
      
      
    } catch (error :any) {
      console.error(error)

      if(error.data.message === "incorrect password" || error.data.message === "user does not exist"){
        toast.error("invalid credentials")
      }
      

      
    }
  }






  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email and password blew to login
        </p>
      </div>
      <div className="grid gap-6">

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

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
          {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field}/>
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your password.
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
        Don't have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  )
}
