"use client";

import { IPost, IUser } from "@/types";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import { FaHeart, FaTrash } from "react-icons/fa";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface PropsType {
  comment: IPost;
  user: IUser;
  setComments: React.Dispatch<React.SetStateAction<IPost[]>>;
  comments: IPost[];
}

export default function CommentItem({
  comment,
  user,
  setComments,
  comments,
}: PropsType) {
  const [isLoading, setIsLoading] = useState(false);

  const onLike = async (e: any) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      if (comment.hasLiked) {
        await axios.delete("/api/comments", {
          data: {
            commentId: comment._id,
          },
        });
        const updatedComments = comments.map((c) => {
          if (c._id === comment._id) {
            return {
              ...c,
              hasLiked: false,
              likes: c.likes - 1,
            };
          }
          return c;
        });
        setComments(updatedComments);
      } else {
        await axios.put("/api/comments", { commentId: comment._id });
        const updatedComments = comments.map((c) => {
          if (c._id === comment._id) {
            return {
              ...c,
              hasLiked: true,
              likes: c.likes + 1,
            };
          }
          return c;
        });
        setComments(updatedComments);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/comments/${comment._id}`);
      setComments((prev) => prev.filter((c) => c._id !== comment._id));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 relative border-b-[1px] border-neutral-800 hover:bg-neutral-900 transition">
      {isLoading && (
        <div className="w-full h-full absolute inset-0 bg-black opacity-50">
          <div className="w-full flex justify-center items-center">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        </div>
      )}
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={comment?.user.profileImage} />
          <AvatarFallback>{comment?.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {comment?.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              {comment && comment?.user.username
                ? `@${sliceText(comment.user.username, 16)}`
                : comment && sliceText(comment.user.email, 16)}
            </span>
            <span className="text-sm text-neutral-500">
              {comment &&
                comment.createdAt &&
                formatDistanceToNowStrict(new Date(comment.createdAt))}{" "}
              ago
            </span>
          </div>
          <div className="mt-1 text-white">{comment?.body}</div>
          <div className="mt-3 flex flex-row items-center gap-10">
            <div
              className="flex flex-row items-center gap-2 text-neutral-500 cursor-pointer hover:text-sky-500 transition"
              onClick={onLike}
            >
              <FaHeart size={20} color={comment.hasLiked ? "red" : ""} />
              <p>{comment.likes || 0}</p>
            </div>
            {comment.user._id === user._id && (
              <FaTrash
                size={18}
                className="text-neutral-500 cursor-pointer hover:text-red-800 transition"
                onClick={onDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
