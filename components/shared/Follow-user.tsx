"use client";

import { IUser } from "@/types";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import axios from "axios";
import Button from "../ui/Button";

interface PropsType {
  user: IUser;
  setFollowing: Dispatch<SetStateAction<IUser[]>>;
}

export default function FollowUser({ user, setFollowing }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<IUser>(user);

  const router = useRouter();
  const { userId } = useParams();
  const { data: session }: any = useSession();

  const onFollow = async () => {
    try {
      setIsLoading(true);
      await axios.put("/api/follows", {
        userId: user._id,
        currentUserId: session?.currentUser?._id,
      });
      if (userId === session?.currentUser?._id) {
        setFollowing((prev) => [
          ...prev,
          {
            ...user,
            followers: [...user.followers, session?.currentUser?._id],
          },
        ]);
      }
      setProfile((prev) => ({
        ...prev,
        followers: [...prev.followers, session?.currentUser?._id],
      }));
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const onUnfollow = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/follows", {
        data: { userId: user._id, currentUserId: session?.currentUser?._id },
      });
      if (userId === session?.currentUser?._id) {
        setFollowing((prev) =>
          prev.filter((following) => following._id !== user._id)
        );
      }
      setProfile((prev) => ({
        ...prev,
        followers: prev.followers.filter(
          (follower) => follower !== session?.currentUser?._id
        ),
      }));
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const goToProfile = (evt: any) => {
    evt.stopPropagation();
    router.push(`/profile/${user._id}`);
  };

  return (
    <div className="py-2 px-3 flex items-center justify-between gap-3 rounded-md cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition">
      <div className="flex gap-2 cursor-pointer">
        <Avatar onClick={goToProfile}>
          <AvatarImage src={profile.profileImage} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col" onClick={goToProfile}>
          <p className="text-sm line-clamp-1 font-semibold text-white">
            {profile.name}
          </p>
          <p className="text-sm line-clamp-1 text-neutral-400">
            {profile.username
              ? `@${sliceText(user.username, 20)}`
              : sliceText(user.email, 20)}
          </p>
        </div>
      </div>

      {profile._id !== session?.currentUser?._id ? (
        profile.followers.includes(session?.currentUser?._id) ? (
          <Button
            label={"Unfollow"}
            outline
            classNames="w-fit h-[30px] p-0 px-3 text-sm"
            disabled={isLoading}
            onClick={onUnfollow}
          />
        ) : (
          <Button
            label={"Follow"}
            classNames="w-fit h-[30px] p-0 px-3 text-sm"
            disabled={isLoading}
            onClick={onFollow}
          />
        )
      ) : null}
    </div>
  );
}
