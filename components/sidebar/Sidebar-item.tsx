import { LucideIcon } from "lucide-react";

interface PropsType {
  label: string;
  icon: LucideIcon;
}

export default function SidebarItem({ icon: Icon, label }: PropsType) {
  return (
    <div className="flex flex-row items-center">
      {/* MOBILE SIDEBAR ITEM */}
      <div className="w-14 h-14 p-4 lg:hidden flex items-center justify-center relative rounded-full hover:bg-slate-300 hover:bg-opacity-10">
        <Icon size={28} color="white" />
      </div>
      {/* DESKTOP SIDEBAR ITEM */}
      <div className="w-full p-4 relative hidden lg:flex items-center gap-4 rounded-full cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-xl text-white">{label}</p>
      </div>
    </div>
  );
}
