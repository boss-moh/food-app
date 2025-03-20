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
import {
  API_END_POINT,
  ErrorResponse,
  signinSchema,
  signinType,
  URL_PATHS,
} from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { axios, useMutation } from "@/lib";
import Link from "next/link";
import { useForm } from "react-hook-form";
import HelperText from "@/components/share/helperText";
import { useRouter } from "next/navigation";
import { GoogleIcon } from "@/components/svg/googleIcon";
import loginViaGoogle from "../Action";

type errors = ErrorResponse<signinType>;

export default function SignInPage() {
  const router = useRouter();

  const form = useForm<signinType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate,
    isPending: isLoading,
    error,
    isError,
  } = useMutation<void, { errors: errors }>({
    mutationFn: async () => {
      await axios.post(API_END_POINT.AUTH.LOGIN, form.getValues());
    },
    onError(error) {
      console.log("error", error);
    },
    async onSuccess() {
      form.reset();
      router.push(URL_PATHS.HOME);
    },
  });

  async function onSubmit() {
    if (isLoading) {
      return;
    }

    mutate();
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
            <Button
              variant={"outline"}
              type="button"
              className="w-full"
              onClick={loginViaGoogle}
              disabled={isLoading}
            >
              <GoogleIcon />
              <span>Sign In Via Google</span>
            </Button>
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
        <div>
          {isError &&
            Object.values(error.errors).map((error, key) => (
              <HelperText key={key}>{error}</HelperText>
            ))}
        </div>
      </CardFooter>
    </Card>
  );
}
