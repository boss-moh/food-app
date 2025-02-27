import { GridTemplate, MenuItem } from "@/components/share";
import { fetchMenu } from "@/lib/data";

export default async function MenuPage() {
  const menuItems = await fetchMenu();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Menu</h1>
      <GridTemplate>
        {menuItems.map((item) => (
          <MenuItem product={item} key={item.id} />
        ))}
      </GridTemplate>
    </div>
  );
}
