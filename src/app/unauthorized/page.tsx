import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { URL_PATHS } from "@/constants";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 ">
      <Card className="mx-auto max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
            <ShieldAlert className="h-8 w-8 text-red-500 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl">Unauthorized Access</CardTitle>
          <CardDescription>
            You don&apos;t have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-sm">
            <p>
              Please sign in with an account that has the required permissions,
              or contact your administrator if you believe you should have
              access.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <Button asChild variant="outline" className="w-full">
              <Link href={URL_PATHS.HOME}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t px-6 py-4">
          <p className="text-center text-sm text-muted-foreground">
            Need help?{" "}
            <Link
              href="/contact"
              className="font-medium text-primary hover:underline"
            >
              Contact Support
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
