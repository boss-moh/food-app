import { URL_PATHS } from "@/constants";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      aria-label="TastyGo logo"
      href={URL_PATHS.HOME}
      className={` text-2xl font-bold italic text-primary`}
    >
      TastyGo
    </Link>
  );
};

export default Logo;
