import React from "react";
import { Sidebar } from "../components/Sidebar";
import { ThemeToggle } from "../components/ThemeToggle";
import { Terminal } from "lucide-react";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-razer-black text-razer-text font-sans antialiased flex flex-col transition-colors duration-200">
      {/* Top Header */}
      <header className="h-16 border-b border-razer-border bg-razer-card/90 sticky top-0 z-50 backdrop-blur">
        <div className="px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Terminal className="w-6 h-6 text-razer-green" />
            <span className="font-mono text-xl font-black tracking-wider uppercase">
              NEXUS<span className="text-razer-green">//</span>HQ
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-razer-green/10 border border-razer-green/30 text-razer-green font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-razer-green animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
