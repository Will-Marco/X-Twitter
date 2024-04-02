"use client";

import { IUser } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "@/components/shared/Header";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sliceText } from "@/lib/utils";

export default function Explore() {
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`/api/users?limit=20`);
      setAllUsers(data);
      setUsers(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();

    if (text && text.length > 2) {
      setIsLoading(true);
      const { data } = await axios.get(`/api/users/search/${text}`);
      setUsers(data);
      setIsLoading(false);
    } else {
      setUsers(allUsers);
      setIsLoading(false);
    }
  };

  const debouncedSearch = debounce(handleSearch, 500);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Header label="Explore" />
      <div className="relative">
        <Input
          placeholder="Search for users"
          className="w-[98%] mx-auto mt-2 block border-none bg-neutral-900 text-white"
          onChange={debouncedSearch}
        />

        <div className=" h-14 w-14 p-4 absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-md hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
          <Search className="text-white" size={28} />
        </div>
      </div>

      {isLoading ? (
        <div className="h-24 flex justify-center items-center">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          {users.length === 0 && (
            <div className=" p-6 text-center text-xl text-neutral-600">
              No users found
            </div>
          )}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2">
            {users.map((user) => (
              <Link key={user._id} href={`/profile/${user._id}`}>
                <div className="mr-4 p-5 relative border-b-[1px] border-neutral-800 hover:bg-neutral-900 transition cursor-pointer ">
                  <div className="flex flex-row gap-4">
                    <Avatar>
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="capitalize font-semibold text-white cursor-pointer">
                        {user.name}
                      </p>

                      <span className="md:block text-neutral-500 cursor-pointer">
                        {user.username
                          ? `@${sliceText(user.username, 16)}`
                          : sliceText(user.email, 16)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
