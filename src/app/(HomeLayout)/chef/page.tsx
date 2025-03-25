import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ChefPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">Chef Dashboard</h1>

      <div className="grid justify-center md:justify-between gap-4 md:grid-cols-2"></div>

      {/* <Card>
           <CardHeader className="pb-2">
             <CardTitle></CardTitle>
             <CardDescription>Manage your kitchen orders and track your performance</CardDescription>
           </CardHeader>
          
           </Card> */}
    </div>
    // <div className="flex flex-col md:flex-row gap-6">
    //   {/* Chef Profile Section */}
    //   <div className="md:w-1/3">
    //     <Card>
    //       <CardHeader className="pb-2">
    //         <CardTitle>Chef Dashboard</CardTitle>
    //         <CardDescription>Manage your kitchen orders and track your performance</CardDescription>
    //       </CardHeader>  )
  );
};

export default ChefPage;
