import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Terminal,
  ChevronRight,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: "Overview", path: "/", icon: LayoutDashboard },
    { label: "Products", path: "/products", icon: Package },
    { label: "Categories", path: "/categories", icon: FolderTree },
    { label: "Orders", path: "/orders", icon: ShoppingCart },
  ];

  return (
    <aside className="w-64 bg-razer-card border-r border-razer-border flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-6">
        <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          System Modules
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded font-mono text-xs transition-all duration-150 ${
                    isActive
                      ? "bg-razer-darkGreen/40 text-razer-green border border-razer-green/40 shadow-razer-glow font-bold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* System Status Footprint */}
      <div className="p-4 border-t border-razer-border/50 m-4 bg-black/40 rounded border border-razer-border/30">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Terminal className="w-3.5 h-3.5 text-razer-green" />
          <span>API: Connected</span>
        </div>
        <div className="text-[10px] font-mono text-zinc-600 mt-1">
          v1.0.4-gaming-prod
        </div>
      </div>
    </aside>
  );
};
