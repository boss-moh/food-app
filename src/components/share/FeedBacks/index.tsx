import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { feedBackType } from "@/constants";
import { formatDate } from "@/utils";
import Rating from "../rating";
import { MessageSquare } from "lucide-react";

interface FeedBacksProps {
  feedCount: number;
  feeds: feedBackType[];
}
export const FeedBacks = ({ feedCount, feeds }: FeedBacksProps) => {
  return (
    <section role="Feed backs ">
      <header>
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          FeedBacks
        </h3>
        <p className="text-sm text-muted-foreground">
          There Are About {feedCount} Feed Back
        </p>
      </header>
      {feedCount === 0 ? (
        <EmptyFeedBack />
      ) : (
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {feeds.map((feed) => (
            <Card key={feed.id} className="w-full max-w-md">
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
          ))}
        </div>
      )}
    </section>
  );
};

export default FeedBacks;

const EmptyFeedBack = () => {
  return (
    <Card className="w-full max-w-md mx-auto mt-12">
      <CardContent className="flex flex-col items-center justify-center py-10 px-6 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <MessageSquare className="h-8 w-8 text-muted-foreground" />
        </div>

        <h3 className="text-lg font-medium mb-2">No reviews yet</h3>

        <p className="text-sm text-muted-foreground mb-6">
          Be the first to share your experience.
        </p>

        {/* {canAddReview && <Button onClick={onAddReview}>Write a Review</Button>} */}
      </CardContent>
    </Card>
  );
};
