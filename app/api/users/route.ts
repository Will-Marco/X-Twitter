import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mogoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");

    const users = await User.find({})
      .select("name username _id profileImage email")
      .limit(Number(limit));

    return NextResponse.json(users);
  } catch (error) {
    const result = error as Error;
    return NextResponse.json({ error: result.message }, { status: 400 });
  }
}
