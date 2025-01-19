import {getSinglePostData} from "@/actions";
import SinglePostContent from "@/components/SinglePostContent";

export default async function SinglePostPage({params}:{params:{id:string}}) {
  const {
    post, authorProfile, comments,
    commentsAuthors, myLike, myBookmark,
  } = await getSinglePostData(params.id);
  return (
    <SinglePostContent
      post={post}
      authorProfile={authorProfile}
      comments={comments}
      commentsAuthors={commentsAuthors}
      myLike={myLike}
      myBookmark={myBookmark}
    />
  );
}