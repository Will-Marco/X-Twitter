"use client";

import { IPost, IUser } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Button from "../ui/Button";
import { toast } from "../ui/use-toast";
import axios from "axios";

interface PropsType {
  placeholder: string;
  user: IUser;
  setPosts: Dispatch<SetStateAction<IPost[]>>;
}

export default function Form({ placeholder, user, setPosts }: PropsType) {
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/posts", {
        body,
        userId: user._id,
      });
      const newPost = { ...data, user, hasLikes: false, likes: 0, comment: 0 };
      setPosts((prev) => [newPost, ...prev]);
      setBody("");
      toast({
        title: "Success",
        description: "Post created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-5 py-2 border-b-[1px] border-neutral-800">
      <div className="flex flex-row gap-4">
        <Avatar>
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="w-full">
          <textarea
            className="w-full h-[50px] mt-3 peer resize-none ring-0 disabled:opacity-80 outline-none bg-black text-[20px] text-white placeholder-neutral-500"
            placeholder={placeholder}
            disabled={isLoading}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          ></textarea>
          <hr className="w-full h-[1px] opacity-0 peer-focus:opacity-100 border-neutral-800 transition" />
          <div className="mt-4 flex flex-row justify-end">
            <Button
              label="Post"
              classNames="mx-8"
              disabled={isLoading || !body}
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
