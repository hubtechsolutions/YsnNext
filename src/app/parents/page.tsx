"use client";

import { useEffect } from "react";
import { useAuthStore, USER_TYPE } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { ParentsTab } from "@/components/superAdmin/tabs/parents-tab";

// Standalone Parents page reusing existing ParentsTab UI (table & modals)
export default function ParentsPage() {
  const { user, isAuthenticated, loading, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && hydrated) {
      if (!isAuthenticated || !user) {
        router.replace("/login");
      } else if (user.user_type !== USER_TYPE.PLAYER && user.user_type !== USER_TYPE.SUPER_ADMIN) {
        // Restrict to players or super admins for now
        router.replace("/");
      }
    }
  }, [loading, hydrated, isAuthenticated, user, router]);

  if (loading || !hydrated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ParentsTab />
      </main>
      <Footer />
    </div>
  );
}
