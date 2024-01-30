"use client";

import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

interface PropsType {
  label: string;
  isBack?: boolean;
}

export default function Header({ label, isBack }: PropsType) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full p-5 border-b-[1px] border-neutral-800">
      <div className="flex flex-row items-center gap-2">
        {isBack && (
          <BiArrowBack
            onClick={handleBack}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-xl text-white font-semibold">{label}</h1>
      </div>
    </div>
  );
}
