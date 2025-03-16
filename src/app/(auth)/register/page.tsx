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
  signupSchema,
  signupType,
  URL_PATHS,
} from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { axios, useMutation } from "@/lib";
import { toast } from "@/hooks/use-toast";
import HelperText from "@/components/share/helperText";

type errors = ErrorResponse<signupType>;

export default function SignUpPage() {
  const form = useForm<signupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutate,
    isPending: isLoading,
    error,
    isError,
  } = useMutation<void, { errors: errors }>({
    mutationFn: async () => {
      await axios.post(API_END_POINT.USER.CREATE, form.getValues());
    },
    onError(error) {
      console.log("error", error);
    },
    onSuccess() {
      form.reset();
      toast({
        title: "New Account has been created.",
      });
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
