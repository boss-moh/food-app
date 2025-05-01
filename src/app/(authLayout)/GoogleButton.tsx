"use client";

import { signInViaGoogleAction } from "@/actions/auth";
import { GoogleIcon } from "@/components/svg/googleIcon";
import { Button } from "@/components/ui/button";
import { childrenProps } from "@/constants";

type GoogleButtonProps = childrenProps;

export const GoogleButton = ({ children }: GoogleButtonProps) => {
  return (
    <Button
      variant={"outline"}
      type="button"
      className="w-full"
      onClick={() => signInViaGoogleAction()}
    >
      <GoogleIcon />
      <span>{children}</span>
    </Button>
  );
};

export default GoogleButton;
