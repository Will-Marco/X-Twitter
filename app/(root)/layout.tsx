import Auth from "@/components/auth";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";

interface PropsType {
  children: ReactNode;
}

export default async function Layout({ children }: PropsType) {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="h-screen max-w-7xl mx-auto container">
        <Auth />
      </div>
    );
  }

  return <div>{children}</div>;
}
