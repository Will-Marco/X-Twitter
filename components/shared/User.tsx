import { IUser } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";

export default function User({ user }: { user: IUser }) {
  return (
    <div className="px-3 py-2 flex justify-between items-center gap-3 rounded-md cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition ">
      <div className="flex gap-2 cursor-pointer">
        <Avatar>
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-sm text-white font-semibold line-clamp-1">
            {user.name}
          </p>
          <p className="text-sm text-neutral-400 line-clamp-1">
            {user.username
              ? `${sliceText(user.username, 16)}`
              : sliceText(user.email, 16)}
          </p>
        </div>
      </div>
    </div>
  );
}
