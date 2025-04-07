"use client";

import {
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
import {
  addFeedBackSchmea,
  addFeedBackType,
  API_END_POINT,
  MessageType,
} from "@/constants";
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
import LoadingButton from "../../../../../../components/share/LoadingButton";
import { axios, useMutation } from "@/lib";
import { useParams } from "next/navigation";

interface FeedFormProps {
  onSuccess?: () => void;
}

export default function FeedForm({ onSuccess }: FeedFormProps) {
  const { productId } = useParams<{ productId: string }>();
  const form = useForm<addFeedBackType>({
    resolver: zodResolver(addFeedBackSchmea),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await axios.post<void, MessageType>(
        API_END_POINT.USER.ORDERS.ADD_FACD_BACK(productId),
        form.getValues()
      );
    },
    onSuccess(data) {
      toast.success(data.message);
      if (onSuccess) onSuccess();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async () => {
    if (isPending) return;
    mutate();
  };
  return (
    <>
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
    </>
  );
}
