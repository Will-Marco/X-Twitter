import { IPost, IUser } from "@/types";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { sliceText } from "@/lib/utils";
import { AiFillDelete, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { FaCommentAlt, FaHeart, FaTrash, FaTrashAlt } from "react-icons/fa";
import { toast } from "../ui/use-toast";
import axios from "axios";

interface PropsType {
  user: IUser;
  post: IPost;
  setPosts: Dispatch<SetStateAction<IPost[]>>;
}

export default function PostItem({ user, post, setPosts }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasLiked, setHasLiked] = useState<boolean>(post.hasLiked as boolean);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete("/api/posts", {
        data: { postId: post._id },
      });
      setPosts((prev) => prev.filter((p) => p._id !== post._id));
    } catch (error) {
      return toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onLike = async () => {
    try {
      setIsLoading(true);
      if (hasLiked) {
        await axios.delete("/api/likes", {
          data: {
            postId: post._id,
            userId: user._id,
          },
        });

        const updatedPosts = { ...post, hasLiked: true, likes: post.likes - 1 };

        setPosts((prev) =>
          prev.map((p) => (p._id === post._id ? updatedPosts : p))
        );
        setHasLiked((prev) => !prev);
      } else {
        await axios.put("/api/likes", {
          postId: post._id,
          userId: user._id,
        });

        const updatedPosts = { ...post, hasLiked: true, likes: post.likes + 1 };

        setPosts((prev) =>
          prev.map((p) => (p._id === post._id ? updatedPosts : p))
        );
        setHasLiked((prev) => !prev);
      }
    } catch (error) {
      return toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 relative border-b-[1px] border-neutral-800 cursor-pointer hover:bg-neutral-900 transition">
      {isLoading && (
        <div className="w-full h-full absolute inset-0 bg-black opacity-50">
          <div className="w-full flex justify-center items-center">
            <Loader2 className="animate-spin text-sky-500" />
          </div>
        </div>
      )}
      <div className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={post.user.profileImage} />
          <AvatarFallback>{post.user.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {post.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              {post.user.username
                ? `${sliceText(post.user.username, 16)}`
                : sliceText(post.user.email, 16)}
            </span>
            <span className="text-sm text-neutral-500">
              {formatDistanceToNowStrict(new Date(post.createdAt))} ago
            </span>
          </div>

          <div className="mt-1 text-white">{post.body}</div>

          <div className="mt-3 flex flex-row items-center gap-10">
            <div className="flex flex-row items-center gap-2 text-neutral-500 cursor-pointer hover:text-sky-500 transition">
              <FaCommentAlt size={20} />
              <p>{post.comments || 0}</p>
            </div>
            <div
              className="flex flex-row items-center gap-2 text-neutral-500 cursor-pointer hover:text-sky-500 transition"
              onClick={onLike}
            >
              <FaHeart size={20} color={hasLiked ? "red" : ""} />
              <p>{post.likes || 0}</p>
            </div>
            {post.user._id === user._id && (
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
