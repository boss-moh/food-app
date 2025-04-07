import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { feedBackType } from "@/constants";
import Rating from "../rating";
import { formatDate } from "@/utils";

interface FeedItemProps {
  feed: feedBackType;
}

export const FeedItem = ({ feed }: FeedItemProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between gap-4 pt-2 pb-2">
        <div className="flex flex-col">
          <p className="font-medium">{feed.customer.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDate(feed.date)}
          </p>
        </div>
        <Rating rating={feed.rating} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{feed.content}</p>
      </CardContent>
    </Card>
  );
};

export default FeedItem;
