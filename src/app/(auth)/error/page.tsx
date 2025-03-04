"use client";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "CredentialsSignin":
        return "Invalid email or password";
      case "OAuthSignin":
        return "Error signing in with provider";
      case "SessionRequired":
        return "Please sign in to access this page";
      default:
        return "An unexpected error occurred";
    }
  };

  return (
    <div className="error-container">
      <h2>Login Error</h2>
      <p>{getErrorMessage(error)}</p>
      <a href="/auth/login">Return to login</a>
    </div>
  );
}
