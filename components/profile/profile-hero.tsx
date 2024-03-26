"use client";

import { IUser } from "@/types";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";

export default function ProfileHero({ user }: { user: IUser }) {
  return (
    <div className="h-44 relative bg-neutral-800">
      {user.coverImage ? (
        <Image
          fill
          src={user.coverImage}
          alt={user.name}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <Image
          fill
          src={"/images/cover-placeholder.png"}
          alt={user.name}
          style={{ objectFit: "cover" }}
        />
      )}
      <div className="absolute -bottom-16 left-4">
        <Avatar className="w-32 h-32">
          <AvatarImage src={user.profileImage} />
          <AvatarFallback className="text-7xl">{user.name[0]}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
