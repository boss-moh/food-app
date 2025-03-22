import UserTable from "./UserTable";
import { SearchInput } from "@/components/share";
import UserSelecter from "./UserSelecter";
import { searchParamsProps } from "@/constants";

export default async function UsersPage({
  searchParams,
}: searchParamsProps<"role"> & searchParamsProps<"query">) {
  const role = (await searchParams).role;
  const query = (await searchParams).query;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <div className="flex items-center gap-4">
          <SearchInput />
          <UserSelecter />
        </div>
      </div>

      <UserTable role={role} query={query} />
    </div>
  );
}
