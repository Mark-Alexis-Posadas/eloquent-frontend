import React from "react";
import { ShoppingCart } from "lucide-react";

export const OrdersPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-razer-border pb-4">
        <h1 className="text-2xl font-black tracking-tight text-white font-mono flex items-center gap-3">
          <ShoppingCart className="w-7 h-7 text-razer-green" /> ORDERS
        </h1>
      </div>
      <div className="p-8 bg-razer-card rounded border border-razer-border text-center font-mono text-xs text-zinc-500">
        // Ready for Orders Data Hook
      </div>
    </div>
  );
};
