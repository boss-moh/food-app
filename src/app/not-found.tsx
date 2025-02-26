import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <ChefHat className="h-24 w-24 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! It seems we can&apos;t find the page you&apos;re looking for.
        </p>
        <p className="text-muted-foreground mb-8">
          The page might have been moved, deleted, or perhaps never existed.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
