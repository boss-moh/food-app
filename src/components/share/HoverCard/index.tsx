import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { childrenProps } from "@/constants";

type HoverCardProps = childrenProps & {
  imageUrl: string;
  alt: string;
};

export const HoverCard = ({ children, imageUrl, alt }: HoverCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <CardContent className="p-0">
        <div className="aspect-square relative">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40   group-hover:opacity-100 transition-all opacity-0 flex flex-col items-center justify-center text-white">
            {children}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoverCard;
