"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import FeedForm from "./FeedForm";

const EmptyFeedBack = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="w-full max-w-md mx-auto mt-12">
      {isOpen ? (
        <CardContent className="flex flex-col items-center justify-center py-10 px-6 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>

          <h3 className="text-lg font-medium mb-2">No reviews yet</h3>

          <p className="text-sm text-muted-foreground mb-6">
            Be the first to share your experience.
          </p>

          <Button onClick={() => setIsOpen(false)}>Write a Review</Button>
        </CardContent>
      ) : (
        <>
          <FeedForm onSuccess={() => setIsOpen(true)} />
        </>
      )}
    </Card>
  );
};

export default EmptyFeedBack;
