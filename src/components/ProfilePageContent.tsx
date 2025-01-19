import Preloader from "@/components/Preloader";
import ProfileNav from "@/components/ProfileNav";
import ProfilePageInfo from "@/components/ProfilePageInfo";
import ProfilePosts from "@/components/ProfilePosts";
import {Follower, Profile} from "@prisma/client";
import {Suspense} from "react";

export default function ProfilePageContent({
  profile,
  isOurProfile=false,
  ourFollow=null,
}:{
  profile:Profile;
  isOurProfile?:boolean;
  ourFollow:Follower|null;
}) {
  return (
    <main>
      <ProfilePageInfo
        profile={profile}
        isOurProfile={isOurProfile}
        ourFollow={ourFollow} />
      <ProfileNav
        username={profile.username || ''}
        isOurProfile={isOurProfile} />
      <section className="mt-4">
        <Suspense fallback={<Preloader />}>
          <ProfilePosts email={profile.email}/>
        </Suspense>
      </section>
    </main>
  );
}