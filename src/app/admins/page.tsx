"use client";

import { useEffect } from "react";
import { useAuthStore, USER_TYPE } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

// Placeholder Admins page (API integration can be added later)
export default function AdminsPage() {
  const { user, isAuthenticated, loading, hydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && hydrated) {
      if (!isAuthenticated || !user) router.replace("/login");
      else if (user.user_type !== USER_TYPE.ORGANIZATION && user.user_type !== USER_TYPE.SUPER_ADMIN) router.replace("/");
    }
  }, [loading, hydrated, isAuthenticated, user, router]);

  if (loading || !hydrated || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <Card className="rounded-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>Admins</CardTitle>
                <CardDescription>Manage organization admins</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search admin..." className="pl-9" />
                </div>
                <Button className="cursor-pointer"><Plus className="h-4 w-4 mr-2" />Invite Admin</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="w-32 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">No admins yet</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
