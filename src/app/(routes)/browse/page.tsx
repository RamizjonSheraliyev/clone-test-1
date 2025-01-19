import PostsGrid from "@/components/PostsGrid";
import {prisma} from "@/db";

export default async function BrowsePage() {
  const posts = await prisma.post.findMany({
    orderBy: {createdAt: 'desc'},
    take: 100,
  });
  return (
    <div>
      {/*<div className="mb-4">*/}
      {/*  <h1 className="text-4xl font-bold text-slate-900">Browse</h1>*/}
      {/*  <p className="text-gray-500">Check trending posts and find some inspiration</p>*/}
      {/*</div>*/}
      <PostsGrid posts={posts}/>
    </div>
  );
}