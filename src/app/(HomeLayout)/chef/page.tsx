import { URL_PATHS } from "@/constants";
import { redirect } from "next/navigation";

export default function page() {
  return redirect(URL_PATHS.CHEF.ORDERS);
}
