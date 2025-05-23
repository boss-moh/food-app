"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { signinSchema, signinType, URL_PATHS } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { GoogleButton } from "../GoogleButton";
import { signInAction } from "@/actions/auth";
import ActionErrorUI, {
  ActionError,
} from "../../../components/share/ActionErrorUI";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { InputWithLabel, LoadingButton } from "@/components/share";
import { Button } from "@/components/ui/button";

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

  const chefButton = () => {
    form.setValue("email", "test@chef.com");
    form.setValue("password", "test@chef.com");
  };
  const customerButton = () => {
    form.setValue("email", "test@customer.com");
    form.setValue("password", "test@customer.com");
  };
  const driverButton = () => {
    form.setValue("email", "test@driver.com");
    form.setValue("password", "test@driver.com");
  };
  const adminButton = () => {
    form.setValue("email", "admin@a2.com");
    form.setValue("password", "admin@a2.com");
  };

  return (
    <Card className="shadow-2xl border-0 border-t-px">
      <CardHeader>
        <CardTitle className="text-primary ">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputWithLabel<signinType>
              fieldTitle="email"
              nameInSchema={"email"}
              placeholder="john@example.com"
            />
            <InputWithLabel<signinType>
              fieldTitle="password"
              nameInSchema={"password"}
              placeholder="Enter Your Password"
              type="password"
            />

            <LoadingButton
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In{" "}
            </LoadingButton>

            <GoogleButton>Sign in with Google</GoogleButton>
            <div className="grid gap-2 grid-cols-2  justify-between">
              <Button
                type="button"
                variant={"secondary"}
                onClick={adminButton}
                className="border"
              >
                Admin Demo
              </Button>
              <Button
                type="button"
                variant={"secondary"}
                onClick={customerButton}
                className="border"
              >
                Coustmer Demo
              </Button>
              <Button
                type="button"
                variant={"secondary"}
                onClick={chefButton}
                className="border"
              >
                Chef Demo
              </Button>
              <Button
                type="button"
                variant={"secondary"}
                onClick={driverButton}
                className="border"
              >
                Driver Demo
              </Button>
            </div>
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
