import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type GridItemProps = {
  href: string;
  name: string;
  subText: string;
  imageUrl: string | null;
};

export const GridItem = ({ href, name, subText, imageUrl }: GridItemProps) => {
  return (
    <Link href={href}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
        <CardContent className="p-0">
          <div className="aspect-square relative">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40   group-hover:opacity-100 transition-all opacity-0 flex flex-col items-center justify-center text-white">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-sm">{subText}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GridItem;
