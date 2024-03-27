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

interface PropsType {
  user: IUser;
  userId: string;
}

export default function ProfileBio({ user, userId }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
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
              <div className="flex flex-row items-center gap-1 hover:underline cursor-pointer">
                <p className="text-white">{user.following}</p>
                <p className="text-neutral-500">Following</p>
              </div>

              <div className="flex flex-row items-center gap-1 hover:underline cursor-pointer">
                <p className="text-white">{user.followers}</p>
                <p className="text-neutral-500">Followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
