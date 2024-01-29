"use client"

import { Loader2 } from "lucide-react";
import Button from "../ui/Button";
import User from "./User";
import useUsers from "@/hooks/useUsers";
import Link from "next/link";
import { IUser } from "@/types";

export default function FollowBar() {
  const { isLoading, users } = useUsers(5);

  return (
    <div className="py-4 hidden lg:block w-[266px]">
      <div className="p-4 bg-neutral-800 rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-white font-semibold">Who to follow</h2>
          <Button
            secondary
            label="See all"
            classNames="w-fit h-[30px] p-0 px-3 text-sm"
          />
        </div>

        {isLoading ? (
          <div className="h-24 flex justify-center items-center">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-6">
            {users.map((user: IUser) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <User user={user} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
