import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { URL_PATHS } from "@/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-secondary">
      <Card className="mx-auto max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription>
            We couldn&apos;t find the page you were looking for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-sm">
            <p>
              The page you requested doesn&apos;t exist or may have been moved.
            </p>
          </div>

          <div className="flex flex-row space-y-2">
            <Button asChild variant="default" className="w-full">
              <Link href={URL_PATHS.HOME}>Go to Homepage</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
