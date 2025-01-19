import PostsGrid from "@/components/PostsGrid";
import {prisma} from "@/db";

export default async function ProfilePosts({email}:{email:string}) {
  const posts = await prisma.post.findMany({where:{author:email}});
  return (
    <PostsGrid posts={posts} />
  );
}