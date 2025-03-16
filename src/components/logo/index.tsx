import { URL_PATHS } from "@/constants";
import { secondFont } from "@/fonts";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      aria-label="Tastelife logo"
      href={URL_PATHS.HOME}
      className={`${secondFont.className} text-2xl font-bold italic text-primary`}
    >
      Tastelife
    </Link>
  );
};

export default Logo;
