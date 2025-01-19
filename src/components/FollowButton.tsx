'use client';
import {followProfile, unfollowProfile} from "@/actions";
import {Follower} from "@prisma/client";
import {Button} from "@radix-ui/themes";
import {UserMinus2Icon, UserMinusIcon, UserPlusIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function FollowButton({
  profileIdToFollow,
  ourFollow=null,
}:{
  profileIdToFollow:string;
  ourFollow:Follower|null;
}) {
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow);
  return (
    <form action={async () => {
      setIsFollowed(prev => !prev);
      if (isFollowed) {
        // unfollow
        await unfollowProfile(profileIdToFollow);
      } else {
        // follow
        await followProfile(profileIdToFollow)
      }
      router.refresh();
    }}>
      <button
        className={'flex items-center gap-2 px-4 py-2 text-white rounded-md text-lg '+(isFollowed ? 'bg-gradient-to-tr from-ig-orange to-ig-red from-50%' : "bg-gradient-to-tr from-ig-orange to-ig-red to-80%")}>
        {isFollowed ? <UserMinusIcon /> : <UserPlusIcon />}
        {isFollowed ? 'Unfollow':'Follow'}
      </button>
    </form>
  );
}