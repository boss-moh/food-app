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
import { signinSchema, signinType, URL_PATHS } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GoogleButton } from "../GoogleButton";
import { signInAction } from "@/actions/auth";
import ActionErrorUI, { ActionError } from "../ActionErrorUI";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";

export default function SignInPage() {
  const router = useRouter();
  const { update } = useSession();

  const form = useForm<signinType>({
    resolver: zodResolver(signinSchema),
  });

  const {
    executeAsync,
    isExecuting: isLoading,
    hasErrored,
    result,
  } = useAction(signInAction, {
    onSuccess: async () => {
      form.reset(form.getValues());
      toast.success("Successfully logged in!");
      await update();
      router.refresh();
      router.push(URL_PATHS.HOME);
    },
  });

  async function onSubmit() {
    if (isLoading) {
      return;
    }

    await executeAsync(form.getValues());
  }

  return (
    <Card className="shadow-2xl border-0 border-t-px">
      <CardHeader>
        <CardTitle className="text-primary ">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "loading ..." : "Sign In"}
            </Button>
            <GoogleButton>Sign in with Google</GoogleButton>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href={URL_PATHS.AUTH.SIGN_UP}
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Sign up
          </Link>
        </div>
        <ActionErrorUI hasErrored={hasErrored} result={result as ActionError} />
      </CardFooter>
    </Card>
  );
}
