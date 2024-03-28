import { RiLogoutCircleLine } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IUser } from "@/types";
import { MoreHorizontal } from "lucide-react";
import { signOut } from "next-auth/react";

interface PropsType {
  user: IUser;
}

export default function SidebarAccount({ user }: PropsType) {
  return (
    <>
      {/* MOBIE SIDEBAR ACCOUNT */}
      <div className="block lg:hidden">
        <div
          className="w-14 h-14 p-4 mt-6 lg:hidden flex items-center justify-center relative bg-red-700 rounded-full cursor-pointer hover:bg-opacity-80 transition"
          onClick={() => signOut()}
        >
          <RiLogoutCircleLine size={24} color="white" />
        </div>
      </div>
      {/* DESKTOP SIDEBAR ACCOUNT */}

      <Popover>
        <PopoverTrigger className="w-full px-4 py-2 hidden lg:block rounded-full cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition">
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={user.profileImage} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-white">
                <p>{user.name}</p>
                {user.username ? (
                  <p className="opacity-40">@{user.username}</p>
                ) : (
                  <p className="opacity-40">Manage account</p>
                )}
              </div>
            </div>
            <MoreHorizontal size={24} color="white" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="mb-3 px-0 bg-black border-none rounded-2xl shadow shadow-white">
          <div
            className="p-4 font-bold text-white cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition"
            onClick={() => signOut()}
          >
            Log out {user.username ? `@${user.username}` : user.name}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
