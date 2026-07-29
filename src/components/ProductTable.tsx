import React from "react";
import type { Product } from "../types/product";
import { Package, Tag, CheckCircle, XCircle } from "lucide-react";

interface ProductTableProps {
  products: Product[];
}

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-razer-border bg-razer-card shadow-razer-glow">
      <table className="w-full text-left text-sm text-gray-300">
        <thead className="border-b border-razer-border bg-black/60 text-xs uppercase tracking-wider text-razer-green font-mono">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Title</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Stock</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-razer-border/50">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-razer-darkGreen/20 transition-colors duration-150 group"
            >
              <td className="px-6 py-4 font-mono text-razer-green font-bold">
                #{product.id}
              </td>
              <td className="px-6 py-4">
                <div className="font-semibold text-white group-hover:text-razer-green transition-colors">
                  {product.title}
                </div>
                <div className="text-xs text-gray-500 truncate max-w-xs">
                  {product.description}
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                  <Tag className="w-3 h-3 text-razer-green" />
                  {product.category.name}
                </span>
              </td>
              <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                ${parseFloat(product.price).toFixed(2)}
              </td>
              <td className="px-6 py-4 font-mono">
                <span className="inline-flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-zinc-500" />
                  {product.stock_quantity}
                </span>
              </td>
              <td className="px-6 py-4">
                {product.is_active === 1 ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-razer-green">
                    <CheckCircle className="w-3.5 h-3.5" /> ACTIVE
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500">
                    <XCircle className="w-3.5 h-3.5" /> INACTIVE
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
