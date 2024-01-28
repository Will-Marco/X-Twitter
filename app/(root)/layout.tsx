import Auth from "@/components/auth";
import { Toaster } from "@/components/ui/toaster";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import NextTopLoader from "nextjs-toploader";
import Sidebar from "@/components/sidebar/Sidebar";
import FollowBar from "@/components/shared/Follow-bar";

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

  return (
    <div className="lg:max-w-7xl h-screen mx-auto lg:container">
      <div className="flex">
        <Sidebar user={JSON.parse(JSON.stringify(session.currentUser))} />
        <div className="lg:mx-4 ml-1 flex flex-1 border-x-[1px] border-neutral-800">
          <div className="w-full">
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            />
            {children}
            <Toaster />
          </div>
        </div>
        <FollowBar />
      </div>
    </div>
  );
}
