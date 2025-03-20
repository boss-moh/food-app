import { Star } from "lucide-react";

export const Rating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center mt-2">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">({rating})</span>
    </div>
  );
};

export default Rating;
