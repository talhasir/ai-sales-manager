"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Phone, 
  Users, 
  Settings, 
  LogOut,
  Brain,
  Menu,
  X
} from "lucide-react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Analyze New", href: "/dashboard/analyze", icon: Brain },
  { name: "Call Library", href: "/dashboard/calls", icon: Phone },
  { name: "Team Insights", href: "/dashboard/insights", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-zinc-900 border-b border-zinc-800 px-4">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-success" />
          <span className="text-lg font-bold">AI Sales Manager</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop and Mobile */}
      <div
        className={cn(
          "flex h-screen flex-col bg-zinc-900 border-r border-zinc-800 transition-transform duration-300 ease-in-out",
          // Desktop
          "hidden lg:flex lg:w-64",
          // Mobile
          "fixed inset-y-0 left-0 z-40 w-64",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo - Desktop Only */}
        <div className="hidden lg:flex h-16 items-center gap-2 border-b border-zinc-800 px-6">
          <Brain className="h-8 w-8 text-success" />
          <span className="text-xl font-bold">AI Sales Manager</span>
        </div>

        {/* Mobile padding for fixed header */}
        <div className="lg:hidden h-16" />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-success/10 text-success"
                    : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-zinc-800 p-4">
          <div className="mb-3 rounded-lg bg-zinc-800 p-3">
            <p className="text-sm font-medium">Demo User</p>
            <p className="text-xs text-gray-400">demo@salesmanager.ai</p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </>
  );
}

