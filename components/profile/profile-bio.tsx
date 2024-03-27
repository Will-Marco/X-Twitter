"use client";

import { IUser } from "@/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Button from "../ui/Button";
import { formatDistanceToNowStrict } from "date-fns";
import { IoLocationSharp } from "react-icons/io5";
import { BiCalendar } from "react-icons/bi";
import axios from "axios";
import EditModal from "../modals/edit-modal";
import useEditModal from "@/hooks/useEditModal";
import { Loader2 } from "lucide-react";
import FollowUser from "../shared/Follow-user";
import { cn } from "@/lib/utils";
import Modal from "../ui/modal";

interface PropsType {
  user: IUser;
  userId: string;
}

export default function ProfileBio({ user, userId }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [following, setFollowing] = useState<IUser[]>([]);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [state, setState] = useState<"following" | "followers">("following");

  const router = useRouter();
  const editModal = useEditModal();

  const onFollow = async () => {
    try {
      setIsLoading(true);
      await axios.put("/api/follows", {
        userId: user._id,
        currentUserId: userId,
      });

      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onUnfollow = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/follows", {
        data: { userId: user._id, currentUserId: userId },
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFollowUser = async (userId: string, type: string) => {
    try {
      setIsFetching(true);
      const { data } = await axios.get(
        `/api/follows?state=${type}&userId=${userId}`
      );
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const openFollowModal = async () => {
    try {
      setOpen(true);
      const data = await getFollowUser(user._id, "following");
      setFollowing(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFollowing = async () => {
    setState("following");

    if (following.length === 0) {
      const data = await getFollowUser(user._id, "following");
      setFollowing(data);
    }
  };

  const onFollowers = async () => {
    setState("followers");

    if (followers.length === 0) {
      const data = await getFollowUser(user._id, "followers");
      setFollowers(data);
    }
  };

  return (
    <>
      <EditModal user={user} />
      <div className="pb-4 border-b-[1px] border-neutral-800">
        <div className=" p-2 flex justify-end">
          {userId === user._id ? (
            <Button
              label={"Edit profile"}
              secondary
              onClick={() => editModal.onOpen()}
            />
          ) : user.isFollowing ? (
            <Button
              label={"Unfollow"}
              outline
              onClick={onUnfollow}
              disabled={isLoading}
            />
          ) : (
            <Button label={"Follow"} onClick={onFollow} disabled={isLoading} />
          )}
        </div>

        <div className="mt-8 px-4">
          <div className="flex flex-col">
            <p className="text-2xl text-white font-semibold">{user.name}</p>
          </div>

          <p className="text-md text-neutral-500">
            {user.username ? `@${user.username}` : user.email}
          </p>

          <div className="mt-4 flex flex-col">
            <p className="text-white">{user.bio}</p>
            <div className="flex gap-4 items-center">
              {user.location && (
                <div className=" mt-4 flex flex-row items-center gap-2 text-sky-500">
                  <IoLocationSharp size={24} />
                  <p>{user.location}</p>
                </div>
              )}
              <div className="mt-4 flex flex-row items-center gap-2 text-neutral-500">
                <BiCalendar size={24} />
                <p>
                  Joined {formatDistanceToNowStrict(new Date(user.createdAt))}{" "}
                  ago
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-row items-center gap-6">
              <div
                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                onClick={openFollowModal}
              >
                <p className="text-white">{user.following}</p>
                <p className="text-neutral-500">Following</p>
              </div>

              <div
                className="flex flex-row items-center gap-1 hover:underline cursor-pointer"
                onClick={openFollowModal}
              >
                <p className="text-white">{user.followers}</p>
                <p className="text-neutral-500">Followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FOLLOWING AND FOLLOWERS MODAL */}
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        body={
          <>
            <div className="w-full py-3 px-4 flex flex-row">
              <div
                className={cn(
                  "w-[50%] h-full flex justify-center items-center font-semibold cursor-pointer ",
                  state === "following" &&
                    "border-b-[2px] border-sky-500 text-sky-500"
                )}
                onClick={onFollowing}
              >
                Following
              </div>
              <div
                className={cn(
                  "w-[50%] h-full flex justify-center items-center font-semibold cursor-pointer",
                  state === "followers" &&
                    "border-b-[2px] border-sky-500 text-sky-500"
                )}
                onClick={onFollowers}
              >
                Followers
              </div>
            </div>

            {isFetching ? (
              <div className="h-24 flex justify-center items-center">
                <Loader2 className="animate-spin text-sky-500" />
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {state === "following" ? (
                  following.length === 0 ? (
                    <div className="p-6 text-center text-xl text-neutral-600">
                      No following
                    </div>
                  ) : (
                    following.map((user) => (
                      <FollowUser
                        key={user._id}
                        user={user}
                        setFollowing={setFollowing}
                      />
                    ))
                  )
                ) : followers.length === 0 ? (
                  <div className="p-6 text-center text-xl text-neutral-600">
                    No followers
                  </div>
                ) : (
                  followers.map((user) => (
                    <FollowUser
                      key={user._id}
                      user={user}
                      setFollowing={setFollowing}
                    />
                  ))
                )}
              </div>
            )}
          </>
        }
      />
    </>
  );
}
