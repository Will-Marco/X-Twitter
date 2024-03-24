"use client";

import CommentItem from "@/components/shared/Comment-item";
import Form from "@/components/shared/Form";
import Header from "@/components/shared/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sliceText } from "@/lib/utils";
import { IPost } from "@/types";
import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function PostPage({ params }: { params: { postId: string } }) {
  const { data: session, status }: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingComment, setIsFetchingComment] = useState(false);
  const [post, setPost] = useState<IPost | null>(null);
  const [comments, setComments] = useState<IPost[]>([]);

  const getPost = async () => {
    try {
      setIsFetchingComment(true);
      const { data } = await axios.get(`/api/posts/${params.postId}`);
      setPost(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingComment(false);
    }
  };

  const getComment = async () => {
    try {
      setIsFetchingComment(true);
      const { data } = await axios.get(`/api/posts/${params.postId}/comments`);
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingComment(false);
    }
  };

  useEffect(() => {
    getPost();
    getComment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header label="Posts" isBack />
      {isLoading || status === "loading" ? (
        <div className="h-24 flex justify-center items-center">
          <Loader2 className="animate-spin text-sky-500" />
        </div>
      ) : (
        <>
          <div className="p-5 relative border-b-[1px] border-neutral-800 bg-neutral-900 transition">
            <div className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarImage src={post?.user.profileImage} />
                <AvatarFallback>{post?.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex flex-row items-center gap-2">
                  <p className="text-white font-semibold cursor-pointer hover:underline">
                    {post?.user.name}
                  </p>
                  <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                    {post && post?.user.username
                      ? `@${sliceText(post.user.username, 16)}`
                      : post && sliceText(post.user.email, 16)}
                  </span>
                  <span className="text-sm text-neutral-500">
                    {post &&
                      post.createdAt &&
                      formatDistanceToNowStrict(new Date(post.createdAt))}{" "}
                    ago
                  </span>
                </div>
                <div className="mt-1 text-white">{post?.body}</div>
              </div>
            </div>
          </div>
          <Form
            placeholder="Post your reply?"
            user={JSON.parse(JSON.stringify(session.currentUser))}
            setPosts={setComments}
            postId={params.postId}
            isComment
          />
          {isFetchingComment ? (
            <div className="h-24 flex justify-center items-center">
              <Loader2 className="animate-spin text-sky-500" />
            </div>
          ) : (
            comments.map((comment) => (
              <CommentItem
                comment={comment}
                key={comment._id}
                user={JSON.parse(JSON.stringify(session.currentUser))}
                setComments={setComments}
                comments={comments}
              />
            ))
          )}
        </>
      )}
    </>
  );
}
