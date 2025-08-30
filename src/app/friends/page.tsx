"use client";

import { useEffect } from "react";
import { useAuthStore, USER_TYPE } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { FriendsTab } from "@/components/superAdmin/tabs/Friends-tab";

export default function FriendsPage() {
  const { user, isAuthenticated, loading, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && hydrated) {
      if (!isAuthenticated || !user) router.replace("/login");
      else if (user.user_type !== USER_TYPE.PLAYER && user.user_type !== USER_TYPE.SUPER_ADMIN) router.replace("/");
    }
  }, [loading, hydrated, isAuthenticated, user, router]);

  if (loading || !hydrated || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <FriendsTab />
      </main>
      <Footer />
    </div>
  );
}
