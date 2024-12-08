"use client";

import { Film, Users, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-2">
          <Film className="h-6 w-6" />
          <span className="text-xl font-bold">MovieMind</span>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Button variant="ghost" className="space-x-2">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
          </Link>
          <Link
            href="/social"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/social" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Button variant="ghost" className="space-x-2">
              <Users className="h-4 w-4" />
              <span>Social</span>
            </Button>
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}