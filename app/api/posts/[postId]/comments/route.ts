import Comment from "@/database/comment.model";
import Post from "@/database/post.model";
import User from "@/database/user.model";
import { authOptions } from "@/lib/authOptions";
import { connectToDatabase } from "@/lib/mogoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, route: { params: { postId: string } }) {
  try {
    await connectToDatabase();
    const { postId } = route.params;
    const { currentUser }: any = await getServerSession(authOptions);

    const post = await Post.findById(postId).populate({
      path: "comments",
      model: Comment,
      populate: {
        path: "user",
        model: User,
        select: "name email profileImage _id username",
      },
      options: { sort: { likes: -1 } },
    });

    const filteredComments = post.comments.map((item: any) => ({
      _id: item._id,
      body: item.body,
      createdAt: item.createdAt,
      user: {
        _id: item.user._id,
        name: item.user.name,
        username: item.user.username,
        profileImage: item.user.profileImage,
        email: item.user.email,
      },
      likes: item.likes.length,
      hasLiked: item.likes.includes(currentUser._id),
    }));

    return NextResponse.json(filteredComments);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
