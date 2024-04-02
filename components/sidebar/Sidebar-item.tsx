import { LucideIcon } from "lucide-react";
import { BsDot } from "react-icons/bs";

interface PropsType {
  label: string;
  icon: LucideIcon;
  notification?: boolean;
}

export default function SidebarItem({
  icon: Icon,
  label,
  notification,
}: PropsType) {
  return (
    <div className="flex flex-row items-center">
      {/* MOBILE SIDEBAR ITEM */}
      <div className="w-14 h-14 p-4 lg:hidden flex items-center justify-center relative rounded-full hover:bg-slate-300 hover:bg-opacity-10">
        <Icon size={28} color="white" />
        {notification ? (
          <BsDot className={"absolute -top-4 left-0 text-sky-500"} size={70} />
        ) : null}
      </div>
      {/* DESKTOP SIDEBAR ITEM */}
      <div className="w-full p-4 relative hidden lg:flex items-center gap-4 rounded-full cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-xl text-white">{label}</p>
        {notification ? (
          <BsDot className={"absolute -top-4 left-0 text-sky-500"} size={70} />
        ) : null}
      </div>
    </div>
  );
}
