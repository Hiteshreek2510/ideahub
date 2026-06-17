import { Home, Users, Bell, Settings } from "lucide-react";
import Link from "next/link";

import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#070710] flex text-[#e2e8f0]">
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-20 md:ml-64 relative min-h-screen">
        {children}
      </main>
    </div>
  );
}
