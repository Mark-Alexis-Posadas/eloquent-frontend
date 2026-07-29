import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded border border-razer-border bg-razer-card light:bg-zinc-200 light:border-zinc-300 light:text-zinc-900 text-zinc-300 hover:border-razer-green hover:text-razer-green transition-all duration-150 font-mono text-xs shadow-razer-glow"
      title="Toggle Theme"
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-4 h-4 text-razer-green" />
          <span>LIGHT MODE</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-emerald-600" />
          <span>DARK MODE</span>
        </>
      )}
    </button>
  );
};
