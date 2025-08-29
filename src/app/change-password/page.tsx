"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";

export default function ChangePasswordPage() {
  const { user, isAuthenticated, loading, hydrated } = useAuthStore();
  const router = useRouter();
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && hydrated) {
      if (!isAuthenticated || !user) {
        router.replace("/login");
      }
    }
  }, [loading, hydrated, isAuthenticated, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current_password || !form.new_password || !form.confirm_password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (form.new_password !== form.confirm_password) {
      toast.error("New password and confirm password do not match");
      return;
    }
    if (form.new_password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.changePassword.change(form);
      if (res.status) {
        toast.success("Password changed successfully");
        setForm({ current_password: "", new_password: "", confirm_password: "" });
      } else {
        toast.error(res.message || "Failed to change password");
      }
    } catch (err) {
      console.error("Change password error", err);
      toast.error("Unexpected error");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !hydrated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 border border-border rounded-xl p-8 bg-card shadow-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Change Password</h1>
            <p className="text-sm text-muted-foreground">Update your account password</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input
                type="password"
                name="current_password"
                value={form.current_password}
                onChange={handleChange}
                placeholder="Enter current password"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Password</label>
              <Input
                type="password"
                name="new_password"
                value={form.new_password}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Confirm New Password</label>
              <Input
                type="password"
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
              />
            </div>
            <Button type="submit" disabled={submitting} className="w-full cursor-pointer">
              {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Changing...</> : "Change Password"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
