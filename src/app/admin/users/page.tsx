import UserTable from "./UserTable";
import { SearchInput } from "@/components/share";
import UserSelecter from "./UserSelecter";
import { RoleType, searchParamsProps } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function UsersPage({
  searchParams,
}: searchParamsProps<"role"> & searchParamsProps<"query">) {
  const { role, query } = await searchParams;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 justify-between  md:items-center mb-6">
        <h1 className="text-3xl font-bold">Users Management</h1>
        <div className="flex items-center gap-4">
          <SearchInput />
          <UserSelecter />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex gap-1 items-center">
            <span>Users</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UserTable role={role as RoleType} query={query} />
        </CardContent>
      </Card>
    </>
  );
}
