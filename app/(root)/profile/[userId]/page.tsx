import ProfileBio from "@/components/profile/profile-bio";
import ProfileHero from "@/components/profile/profile-hero";
import Header from "@/components/shared/Header";
import PostFeed from "@/components/shared/Post-feed";
import { getUserById } from "@/lib/actions/user.action";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Profile({
  params,
}: {
  params: { userId: string };
}) {
  const session: any = await getServerSession(authOptions);
  const user = await getUserById(params.userId);

  return (
    <>
      <Header label={user.name} />
      <ProfileHero user={JSON.parse(JSON.stringify(user))} />
      <ProfileBio
        user={JSON.parse(JSON.stringify(user))}
        userId={JSON.parse(JSON.stringify(session)).currentUser._id}
      />
      <PostFeed
        user={JSON.parse(JSON.stringify(session.currentUser))}
        userId={params.userId}
      />
    </>
  );
}
