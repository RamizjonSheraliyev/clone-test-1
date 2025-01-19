import {getSessionEmailOrThrow} from "@/actions";
import {prisma} from "@/db";
import {Follower, Profile} from "@prisma/client";
import {Avatar} from "@radix-ui/themes";
import {PlusIcon} from "lucide-react";

export default async function HomeTopRow({
  follows,
  profiles,
}:{
  follows:Follower[],
  profiles:Profile[],
}) {
  return (
    <div className="-mx-4 pl-4 md:pl-0">
    <div className="flex gap-3 sm:justify-center w-full overflow-x-auto">
      <div>
        <button
          className="size-[92px] bg-gradient-to-tr from-ig-orange to-ig-red text-white rounded-full flex items-center justify-center">
          <PlusIcon size="42" />
        </button>
        <p className="text-center text-gray-400 text-sm">New Story</p>
      </div>
      {profiles.map(profile => (
        <div className="w-24 flex flex-col justify-center items-center">
          <div>
            <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-ig-orange to-ig-red">
              <div className="inline-block p-0.5 bg-white dark:bg-black rounded-full">
                <Avatar
                  size="6"
                  radius="full"
                  fallback={'avatar'}
                  src={profile.avatar || ''}
                />
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">{profile.username}</p>
        </div>
      ))}
    </div>
    </div>
  );
}