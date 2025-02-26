import { URL_PATHS } from "@/constants";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href={URL_PATHS.HOME} className="text-2xl font-bold italic">
      Tastelife
    </Link>
  );
};

export default Logo;
