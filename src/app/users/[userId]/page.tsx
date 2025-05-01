import { fetchUser } from "@/lib";
import { DynamicProps } from "@/constants";

import { PersonalInfo, FeedBackSection, FavoritesSection } from "./_components";

export type userType = NonNullable<Awaited<ReturnType<typeof fetchUser>>>;

export async function generateMetadata({ params }: DynamicProps<"userId">) {
  const { userId } = await params;
  const user = await fetchUser(userId);
  if (!user) return { title: "User not found" };
  const { name } = user;
  return {
    title: `User Profile - ${name}`,
    description: `User Profile - ${name}`,
  };
}

export default async function UserProfile({ params }: DynamicProps<"userId">) {
  // Get initials for avatar fallback
  const userId = (await params).userId;

  const user = await fetchUser(userId);

  if (!user) throw "Faild to fetch user's info";

  return (
    <div className="container mx-auto py-10 flex flex-col gap-8">
      {/* Profile Header */}

      {/* Personal Info Tab */}
      <PersonalInfo user={user} />

      {/* Feedback Section */}
      <FeedBackSection user={user} />

      {/* Favorites Tab */}
      <FavoritesSection user={user} />
    </div>
  );
}
