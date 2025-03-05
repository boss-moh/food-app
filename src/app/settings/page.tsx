import { auth } from "@/auth";

const page = async () => {
  const data = await auth();
  return <div>settings {JSON.stringify(data)}</div>;
};

export default page;
