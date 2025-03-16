import { signinSchema } from "@/constants";
import { prisma } from "@/lib";
import bcrypt from "bcryptjs";
import { CredentialsSignin, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github";



class CredentialError extends CredentialsSignin {
  code = "Invalid identifier or password"

}



export const authConfig: NextAuthConfig = {
  providers: [
    GitHub,
    Credentials({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credential) {
        const isValid = signinSchema.safeParse(credential);
        if(!isValid.success){
          throw new CredentialError("Failed To Login",{
            message:isValid.error.flatten().fieldErrors
            ,
          })
        }

        const {password, email} = isValid.data

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser === null) {
          throw new CredentialError("Email Not exists");
        }

        if (!existingUser.password) {
          throw new CredentialError(
            "Invalid Login, The Account Created Via OAuth"
          );
        }

        const hasTheSamePassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!hasTheSamePassword) {
          throw new CredentialError("Invalid Password");
        }
        
        const {id, name,role} = existingUser;
        
        return {
          userId:id,
          name,
          role
        }
      },
    })
  ],
};
