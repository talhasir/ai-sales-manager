"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="container mx-auto p-4 sm:p-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}

