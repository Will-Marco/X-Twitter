import Auth from "@/components/auth";

export default function Page() {
  const user = false;

  if (!user)
    return (
      <div className="h-screen max-w-7xl mx-auto container">
        <Auth />
      </div>
    );
  return <div>Page</div>;
}
