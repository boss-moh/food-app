"use client";

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
import GoogleButton from "../GoogleButton";

import { signupSchema, signupType, URL_PATHS } from "@/constants";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAction } from "@/lib";
import { signUpAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import ActionErrorUI, { ActionError } from "../ActionErrorUI";
import { PhoneInput } from "@/components/ui/phone-input";

export default function SignUpPage() {
  const router = useRouter();
  const form = useForm<signupType>({
    resolver: zodResolver(signupSchema),
  });

  const {
    execute,
    isExecuting: isLoading,
    hasErrored,
    result,
  } = useAction(signUpAction, {
    onSuccess(response) {
      if (response.data?.success) {
        form.reset();
        toast.success(response.data?.message);
        router.push(URL_PATHS.AUTH.SIGN_IN);
      }
    },
  });

  async function onSubmit() {
    if (isLoading) {
      return;
    }
    execute(form.getValues());
  }
  return (
    <Card className="shadow-2xl border-0 border-t-px">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder="Enter a phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "loading ..." : "Sign Up"}
            </Button>
            <GoogleButton>Sign Up with Google</GoogleButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={URL_PATHS.AUTH.SIGN_IN}
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign in
          </Link>
        </div>
        <ActionErrorUI hasErrored={hasErrored} result={result as ActionError} />
      </CardFooter>
    </Card>
  );
}
