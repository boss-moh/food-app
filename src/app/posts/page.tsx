import { getPosts } from "@/lib/data";

const page = async () => {
  const posts = await getPosts();
  return (
    <div>
      <h2>Posts ({posts.length})</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
