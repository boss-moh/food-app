import FeedItem from "@/components/share/FeedBacks/FeedItem";
import { feedBackType } from "@/constants";
import FeedForm from "./FeedForm";
import EmptyFeedBack from "./EmptyFeedBack";

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
        <div className=" space-y-8">
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {feeds.map((feed) => (
              <FeedItem key={feed.id} feed={feed} />
            ))}
          </div>
          <FeedForm />
        </div>
      )}
    </section>
  );
};

export default FeedBacks;
