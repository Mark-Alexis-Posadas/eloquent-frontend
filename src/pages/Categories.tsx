import React from "react";
import { FolderTree } from "lucide-react";

export const CategoriesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-razer-border pb-4">
        <h1 className="text-2xl font-black tracking-tight text-white font-mono flex items-center gap-3">
          <FolderTree className="w-7 h-7 text-razer-green" /> CATEGORIES
        </h1>
      </div>
      <div className="p-8 bg-razer-card rounded border border-razer-border text-center font-mono text-xs text-zinc-500">
        // Ready for Category List Integration
      </div>
    </div>
  );
};
