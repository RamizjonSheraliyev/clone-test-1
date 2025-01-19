'use client';
import {postComment} from "@/actions";
import Avatar from "@/components/Avatar";
import {Button, TextArea} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import {useRef} from "react";

export default function CommentForm({avatar,postId}:{avatar:string;postId:string}) {
  const router = useRouter();
  const areaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <form action={async data => {
      if (areaRef.current) {
        areaRef.current.value = '';
      }
      await postComment(data);
      router.refresh();
    }}>
      <input type="hidden" name="postId" value={postId} />
      <div className="flex gap-2">
        <div>
          <Avatar src={avatar}/>
        </div>
        <div className="w-full flex flex-col gap-2">
          <TextArea
            ref={areaRef}
            name="text"
            placeholder="Tell the world what you think..."/>
          <div>
            <Button>Post comment</Button>
          </div>
        </div>
      </div>

    </form>
  );
}