import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";
import CategorySelecter from "./CategorySelecter";
import { searchProps } from "@/constants";

type FormControlSearch = searchProps;

export const FormControlSearch = ({ categoryId, query }: FormControlSearch) => {
  return (
    <Form action={""} className="w-full flex items-center gap-2">
      <div className="relative flex-grow">
        <Input
          defaultValue={query}
          name={"query"}
          type="text"
          placeholder="Search meals..."
          className="pl-4 w-full"
        />
      </div>

      <CategorySelecter defaultValue={categoryId} />
      <Button type="submit" size={"icon"}>
        <Search />
      </Button>
    </Form>
  );
};

export default FormControlSearch;
