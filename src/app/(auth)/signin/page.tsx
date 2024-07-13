"use client";

import Link from "next/link";
import { z, ZodError } from "zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpc } from "@/trpc/client";
import styles from "./signin.module.css";
import { formSchema } from "@/validators";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { AppleIcon, GoogleIcon, MailIcon, PasswordLock } from "@/utils/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signIn, isPending } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      console.log("Sign in successful");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push("/dashboard");
        return;
      }

      router.push("/");
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        console.log("Invalid email or password");
        return;
      }
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4 w-[95vw] sm:max-w-[500px] px-[40px] pt-[50px] pb-[20px] shadow-custom rounded-xl mx-auto"
      >
        <div className="flex items-center justify-center">
          <h2 className="m-0 text-2xl font-bold">Welcome Back!</h2>
        </div>
        <Link className={buttonVariants({ variant: "link" })} href={"/signup"}>
          Don&apos;t have an account? Sign Up <ArrowRight className="h-4 w-4" />
        </Link>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full h-fit relative flex flex-col gap-1 mb-2">
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
              <FormMessage className="absolute -bottom-5 text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full h-fit relative flex flex-col gap-1 mb-4">
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
              <FormMessage className="absolute -bottom-5 text-xs" />
            </FormItem>
          )}
        />
        <Button
          title="Sign In"
          type="submit"
          disabled={isPending}
          className="w-full border-0 rounded-lg outline-none cursor-pointer"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </Button>

        <div className="w-full flex items-center justify-center gap-8 text-[#8b8e98]">
          <hr className="block w-full h-[1px] border-0 bg-[#e8e8e8]" />
          <span>Or</span>
          <hr className="block w-full h-[1px] border-0 bg-[#e8e8e8]" />
        </div>
        <button className={styles.signin_ggl}>
          <GoogleIcon />
          <span>Sign In with Google</span>
        </button>
        <button className={styles.signin_apl}>
          <AppleIcon />
          <span>Sign In with Apple</span>
        </button>
        {isSeller ? (
          <Button
            variant={"link"}
            disabled={isPending}
            type="button"
            onClick={() => router.replace("/signin", undefined)}
          >
            Continue as customer <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant={"link"}
            type="button"
            disabled={isPending}
            onClick={() => router.push("?as=seller")}
          >
            Continue as seller <ArrowRight className="h-4 w-4" />
          </Button>
        )}
        <p className="text-muted-foreground underline text-sm">
          Terms of use &amp; Conditions
        </p>
      </form>
    </Form>
  );
};

export default SignUpPage;
