import { Feather } from "lucide-react";
import Link from "next/link";

export default function SidebarPostButton() {
  return (
    <Link href={"/"}>
      {/* MOBILE POST */}
      <div className="w-14 h-14 p-4 mt-6 lg:hidden flex items-center justify-center relative bg-sky-500 rounded-full cursor-pointer hover:bg-opacity-80 transition">
        <Feather size={24} color="white" />
      </div>

      {/* DESKTOP POST */}
      <div className="w-full mt-6 px-4 py-2 hidden lg:block bg-sky-500 rounded-full cursor-pointer hover:bg-opacity-90 transition">
        <p className="hidden lg:block text-center text-[20px] text-white font-semibold">
          POST
        </p>
      </div>
    </Link>
  );
}
