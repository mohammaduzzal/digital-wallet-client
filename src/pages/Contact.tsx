/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContactMutation } from "@/redux/features/contact/contact.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;

}

const contactSchema = z.object({
  firstName : z.string(),
  lastName : z.string(),
  email : z.email(),
  subject : z.string(),
  message : z.string()
})

export default function Contact({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "(123) 34567890",
  email = "email@example.com",

}: Contact2Props){

  const [createContact] = useContactMutation()

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver : zodResolver(contactSchema),
    defaultValues: {
      firstName : "",
      lastName : "",
      email : "",
      subject : "",
      message : "",
    },
  })


 const onSubmit  = async(data : z.infer<typeof contactSchema>) => {
  
    const toastId = toast.loading("posting....")
    try {
      const result = await createContact(data).unwrap()

      if(result.success){
        toast.success("posted  successfully!!!", {id : toastId})
        form.reset()
        console.log(result)
      }
      
      
    } catch (error :any) {
      console.error(error)
      

      
    }
  }




  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* form */}
          <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your firstName.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
              <div className="grid w-full items-center gap-1.5">
                 <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your lastName.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
               <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your subject.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="grid w-full gap-1.5">
               <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} className="h-[105px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <Button type="submit" className="w-full">Send Message</Button>
            </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};


