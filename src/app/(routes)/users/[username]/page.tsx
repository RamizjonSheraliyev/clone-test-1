import {getSessionEmail} from "@/actions";
import ProfilePageContent from "@/components/ProfilePageContent";
import {prisma} from "@/db";

export default async function UserProfilePage({
  params:{username},
}:{
  params:{username:string};
}) {
  const sessionEmail = await getSessionEmail() || '';
  const profile = await prisma.profile.findFirstOrThrow({
    where:{username:username}
  });
  const ourFollow = await prisma.follower.findFirst({
    where: {
      followingProfileEmail: sessionEmail,
      followedProfileId: profile.id,
    },
  });
  return (
    <ProfilePageContent
      isOurProfile={profile.email === sessionEmail}
      ourFollow={ourFollow}
      profile={profile} />
  );
}