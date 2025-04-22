"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { addFeedBackSchmea, addFeedBackType } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib";
import { useParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { feedAction } from "@/actions/products";
import { LoadingButton } from "@/components/share";

interface FeedFormProps {
  onSuccess?: () => void;
  className?: string;
}

export default function FeedForm({ onSuccess, className }: FeedFormProps) {
  const { productId } = useParams<{ productId: string }>();
  const form = useForm<addFeedBackType>({
    resolver: zodResolver(addFeedBackSchmea),
  });

  const { execute, isPending } = useAction(feedAction, {
    onSuccess(response) {
      toast.success(response.data?.message);
      form.reset(form.getValues());
      onSuccess?.();
    },
    onError(response) {
      toast.error(response.error.serverError);
    },
  });

  const onSubmit = async () => {
    if (isPending) return;
    execute({ ...form.getValues(), productId });
  };
  return (
    <Card className={cn("md:max-w-md mx-auto", className)}>
      <CardHeader>
        <CardTitle>Feedback Form</CardTitle>
        <CardDescription>
          Please provide your rate and description below.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rate (1-5)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter a rate from 1 to 5"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please rate your experience from 1 (poor) to 5 (excellent)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your experience..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please describe your experience in 10-50 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <LoadingButton type="submit" isLoading={isPending}>
              Submit
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
