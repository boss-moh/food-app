"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import CategorySelecter from "./CategorySelecter";
import { searchProps } from "@/constants";
import { FormEvent, useEffect, useReducer } from "react";
import SearchInput from "./SearchInput";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter } from "next/navigation";

const operations = {
  search: "search",
  category: "category",
  page: "page",
} as const;

type action = {
  type: keyof typeof operations;
  payload: string | number;
};

function reducer(
  state: Required<searchProps> & { page: number },
  action: action
) {
  switch (action.type) {
    case operations.search:
      return {
        ...state,
        query: String(action.payload),
        page: 1,
      };
    case operations.category:
      return {
        ...state,
        query: "",
        page: 1,
        categoryId: String(action.payload),
      };

    case operations.page: {
      return {
        ...state,
        page: Number(action.payload),
      };
    }
    default:
      return state;
  }
}

type FormControlSearch = { defaultValues: searchProps };

export const FormControlSearch = ({ defaultValues }: FormControlSearch) => {
  const [{ categoryId, query, page }, dispath] = useReducer(reducer, {
    query: defaultValues.query ?? "",
    categoryId: defaultValues.categoryId ?? "",
    page: 1,
  });

  const router = useRouter();
  const path = usePathname();

  const searchURL = new URLSearchParams({
    categoryId,
    query,
    page: String(page),
  }).toString();

  const onChangeText = (text: string) => {
    dispath({ payload: text, type: operations.search });
  };

  const onChangeCategory = (text: string) => {
    dispath({ payload: text, type: operations.category });
  };

  const onChangePage = (pageNumber: number) => {
    dispath({ payload: pageNumber, type: operations.page });
  };

  useEffect(() => {
    console.log(searchURL);
    handleSubmit();
  }, [searchURL]);

  const handleSubmit = () => router.push(`${path}?${searchURL}`);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={onSubmit} className="w-full flex items-center gap-2">
      <div className="relative flex-grow">
        <SearchInput onChange={onChangeText} defaultValue={query} key={query} />
      </div>

      <CategorySelecter onChange={onChangeCategory} defaultValue={categoryId} />
      <Button type="submit" size={"icon"}>
        <Search />
      </Button>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => onChangePage(page - 1)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => onChangePage(1)}>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => onChangePage(2)}>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </form>
  );
};

export default FormControlSearch;
