"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./signup.module.css";
import { AppleIcon, GoogleIcon, MailIcon, PasswordLock } from "@/utils/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/validators";

const SignUpPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-8 w-[95vw] sm:max-w-[500px] px-[40px] pt-[50px] pb-[20px] shadow-custom rounded-xl mx-auto"
      >
        <div className="flex items-center justify-center">
          <h2 className="m-0 text-2xl font-bold">Welcome Back !</h2>
        </div>
        <br />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full h-fit relative flex flex-col gap-1">
              <FormLabel className="text-sm text-[#8b8e98] font-bold">
                Email
              </FormLabel>
              <MailIcon className="w-[20px] absolute z-10 left-3 bottom-2" />
              <FormControl>
                <Input
                  className={styles.input_field}
                  placeholder="you@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full h-fit relative flex flex-col gap-1">
              <FormLabel className="text-sm text-[#8b8e98] font-bold">
                Password
              </FormLabel>
              <PasswordLock className="w-[20px] absolute z-10 left-3 bottom-2" />
              <FormControl>
                <Input
                  className={styles.input_field}
                  placeholder="Enter you password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-6" />
            </FormItem>
          )}
        />
        <Button
          title="Sign In"
          type="submit"
          className="w-full border-0 rounded-lg outline-none cursor-pointer"
        >
          <span>Sign In</span>
        </Button>

        <div className="w-full flex items-center justify-center gap-8 text-[#8b8e98]">
          <hr className="block w-full h-[1px] border-0 bg-[#e8e8e8]" />
          <span>Or</span>
          <hr className="block w-full h-[1px] border-0 bg-[#e8e8e8]" />
        </div>
        <button title="Sign In" type="submit" className={styles.signin_ggl}>
          <GoogleIcon />
          <span>Sign In with Google</span>
        </button>
        <button title="Sign In" type="submit" className={styles.signin_apl}>
          <AppleIcon />
          <span>Sign In with Apple</span>
        </button>
        <p className="text-muted-foreground underline text-sm">
          Terms of use &amp; Conditions
        </p>
      </form>
    </Form>
  );
};

export default SignUpPage;
