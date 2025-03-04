"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ComponentProps, useEffect, useState } from "react";

export const SearchInput = (props: ComponentProps<"input">) => {
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    const time = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchTerm) {
        params.set("query", searchTerm);
      } else {
        params.delete("query");
      }

      router.replace(`${path}?${params.toString()}`);
      console.log("filter here", searchTerm);
    }, 500);
    return () => clearTimeout(time);
  }, [searchTerm]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        {...props}
        placeholder="Search meals..."
        className="pl-8 w-full"
      />
    </div>
  );
};

export default SearchInput;
