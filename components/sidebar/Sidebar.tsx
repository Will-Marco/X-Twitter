"use client";

import { Bell, Home, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./Sidebar-item";
import SidebarPostButton from "./Sidebar-post-button";
import SidebarAccount from "./Sidebar-account";
import { IUser } from "@/types";
import { MdOutlineExplore } from "react-icons/md";

export default function Sidebar({ user }: { user: IUser }) {
  const sidebarItems = [
    {
      label: "Home",
      path: "/",
      icon: Home,
    },
    {
      label: "Notifications",
      path: `/notifications/${user._id}`,
      icon: Bell,
      notification: user?.hasNewNotifications
    },
    {
      label: "Profile",
      path: `/profile/${user._id}`,
      icon: User,
    },
    {
      label: "Explore",
      path: "/explore",
      icon: MdOutlineExplore,
    },
  ];

  return (
    <section className="lg:w-[266px] w-fit h-screen py-4 pl-2 flex flex-col justify-between sticky left-0 top-0">
      <div className="flex flex-col space-y-2">
        <div className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition hover:bg-sky-300 hover:bg-opacity-10">
          <Image width={56} height={56} src={"/images/logo.svg"} alt="logo" />
        </div>

        {sidebarItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <SidebarItem {...item} />
          </Link>
        ))}

        <SidebarPostButton />
      </div>

      <SidebarAccount />
    </section>
  );
}
