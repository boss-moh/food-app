"use client";
import { emailSigin } from "./action";

export default function SignIn() {
  // const router = useRouter();
  // const { error } = router;

  // const errorMessage = (() => {
  //   switch (error) {
  //     case "CredentialsSignin":
  //       return "Invalid email or password. Please try again.";
  //     // You can add more cases for different errors if needed
  //     default:
  //       return "";
  //   }
  // })();
  // console.log(errorMessage());
  return (
    <form action={emailSigin}>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  );
}
