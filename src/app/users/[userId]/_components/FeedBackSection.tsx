import { FeedItem } from "@/components/share";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { feedBack } from "@prisma/client";

type FeedBackSectionProps = {
  user: {
    id: string;
    name: string;
    feedback: feedBack[];
  };
};

export const FeedBackSection = ({ user }: FeedBackSectionProps) => {
  const hasFeedback = user.feedback.length > 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Feedback</CardTitle>
        <CardDescription>Reviews you&apos;ve left on products</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasFeedback ? (
          <p className="text-muted-foreground text-center py-6">
            You haven&apos;t left any feedback yet.
          </p>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {user.feedback.map((feed) => (
              <FeedItem
                feed={{
                  ...feed,
                  customer: { name: user.name },
                }}
                key={feed.id}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedBackSection;
