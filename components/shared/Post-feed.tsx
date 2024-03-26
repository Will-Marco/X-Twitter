"use client";

import { IPost, IUser } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import PostItem from "./Post-item";

interface PropsType {
  user: IUser;
  userId: string;
}

export default function PostFeed({ user, userId }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  const getPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/users/posts/${userId}`);
      setPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    getPosts();
  }, [userId, getPosts]);

  return isLoading ? (
    <div className="h-24 flex justify-center items-center">
      <Loader2 className="animate-spin text-sky-500" />
    </div>
  ) : (
    posts.map((post) => (
      <PostItem key={post._id} post={post} user={user} setPosts={setPosts} />
    ))
  );
}
