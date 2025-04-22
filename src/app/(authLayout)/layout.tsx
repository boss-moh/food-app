import { childrenProps } from "@/constants";
import Image from "next/image";
import { Metadata } from "next";

import authImage from "localImages/auth.jpeg";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in or create an account to access your Account",
  keywords: ["login", "signup", "authentication", "account"],
  openGraph: {
    title: "Authentication",
    description: "Sign in or create an account to access your Account",
    type: "website",
  },
};

const layout = ({ children }: childrenProps) => {
  return (
    <div className="container  min-h-screen  bg-secondary  items-center  grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full lg:flex">
        <Image src={authImage} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black opacity-30" />
      </div>
      <div className="lg:p-8 ">
        <div className="  mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
