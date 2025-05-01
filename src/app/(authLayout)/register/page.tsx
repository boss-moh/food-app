"use client";

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
import GoogleButton from "../GoogleButton";

import { signupSchema, signupType, URL_PATHS } from "@/constants";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signUpAction } from "@/actions/auth";
import { useRouter } from "next/navigation";
import ActionErrorUI, {
  ActionError,
} from "../../../components/share/ActionErrorUI";
import { PhoneInput } from "@/components/ui/phone-input";
import { useAction } from "next-safe-action/hooks";
import { InputWithLabel, LoadingButton } from "@/components/share";

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
            <InputWithLabel<signupType>
              fieldTitle="name"
              nameInSchema={"name"}
              placeholder="john@example.com"
            />

            <InputWithLabel<signupType>
              fieldTitle="email"
              nameInSchema={"email"}
              placeholder="john@example.com"
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

            <InputWithLabel<signupType>
              fieldTitle="password"
              nameInSchema={"password"}
              placeholder="Enter Your Password"
              type="password"
            />
            <InputWithLabel<signupType>
              fieldTitle="Confirm Password"
              nameInSchema={"confirmPassword"}
              placeholder="Enter Your Password"
              type="password"
            />

            <LoadingButton
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Sign Up
            </LoadingButton>
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
