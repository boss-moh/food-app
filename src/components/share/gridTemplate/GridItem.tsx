import Link from "next/link";
import HoverCard from "../HoverCard";

type GridItemProps = {
  href: string;
  name: string;
  subText: string;
  imageUrl: string;
};

export const GridItem = ({ href, name, subText, imageUrl }: GridItemProps) => {
  return (
    <Link href={href}>
      <HoverCard imageUrl={imageUrl} alt={subText}>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm">{subText}</p>
      </HoverCard>
    </Link>
  );
};

export default GridItem;
