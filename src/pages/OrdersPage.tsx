import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Loader2,
  Package,
  Search,
  ShoppingCart,
  Truck,
  XCircle,
} from "lucide-react";
import { Pagination } from "../components/Pagination";
import { useOrders } from "../hooks/useOrders";

const statuses = ["all", "pending", "paid", "shipped", "cancelled"];
const statusConfig = {
  pending: {
    label: "PENDING",
    icon: Clock3,
    className: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  },
  paid: {
    label: "PAID",
    icon: CheckCircle2,
    className: "text-sky-400 bg-sky-400/10 border-sky-400/30",
  },
  shipped: {
    label: "SHIPPED",
    icon: Truck,
    className: "text-razer-green bg-razer-green/10 border-razer-green/30",
  },
  cancelled: {
    label: "CANCELLED",
    icon: XCircle,
    className: "text-red-400 bg-red-400/10 border-red-400/30",
  },
};

export const OrdersPage: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({ page: 1, search: "", status: "" });
  const { data, isLoading, isFetching, isError } = useOrders(filters);
  const orders = data?.data ?? [];
  const statusCount = (status: string) =>
    orders.filter((order) => order.status === status).length;
  const applySearch = () =>
    setFilters((current) => ({
      ...current,
      page: 1,
      search: searchInput.trim(),
    }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-razer-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-black tracking-tight text-white font-mono">
            <ShoppingCart className="h-7 w-7 text-razer-green" /> ORDERS
          </h1>
          <p className="mt-1 text-xs text-zinc-400 font-mono">
            Track fulfillment, payment, and customer activity
          </p>
        </div>
        {isFetching && !isLoading && (
          <div className="flex items-center gap-2 rounded border border-razer-green/30 bg-razer-darkGreen/40 px-3 py-1.5 text-xs text-razer-green font-mono">
            <Loader2 className="h-4 w-4 animate-spin" /> SYNCING
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          ["TOTAL ORDERS", data?.total ?? 0, ShoppingCart, "text-razer-green"],
          ["PENDING", statusCount("pending"), Clock3, "text-amber-400"],
          ["PAID", statusCount("paid"), CheckCircle2, "text-sky-400"],
          ["SHIPPED", statusCount("shipped"), Truck, "text-razer-green"],
        ].map(([label, value, Icon, color]) => (
          <div
            key={label as string}
            className="border border-razer-border bg-razer-card p-4 rounded-lg"
          >
            <div
              className={`mb-3 flex items-center gap-2 text-xs font-mono ${color}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {value}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-razer-border bg-razer-card p-4 lg:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && applySearch()}
            placeholder="Search order number or customer..."
            className="w-full rounded border border-razer-border bg-razer-bg py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-razer-green focus:outline-none"
          />
        </div>
        <select
          value={filters.status || "all"}
          onChange={(event) =>
            setFilters((current) => ({
              ...current,
              page: 1,
              status: event.target.value === "all" ? "" : event.target.value,
            }))
          }
          className="rounded border border-razer-border bg-razer-bg px-3 py-2 text-sm text-white focus:border-razer-green focus:outline-none lg:w-48"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status === "all" ? "All statuses" : status.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          onClick={applySearch}
          className="rounded bg-razer-green px-5 py-2 text-sm font-bold text-black transition hover:bg-emerald-400 font-mono"
        >
          SEARCH
        </button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center rounded border border-razer-border bg-razer-card text-razer-green font-mono text-xs">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> LOADING ORDERS
        </div>
      ) : isError ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 rounded border border-red-800 bg-red-950/20 text-red-400 font-mono text-xs">
          <AlertTriangle className="h-8 w-8" /> ORDER SERVICE UNAVAILABLE
        </div>
      ) : orders.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 rounded border border-razer-border bg-razer-card text-zinc-500 font-mono text-xs">
          <Package className="h-8 w-8" /> NO ORDERS MATCH YOUR FILTERS
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-razer-border bg-razer-card shadow-razer-glow">
          <table className="w-full min-w-[760px] text-left text-sm text-gray-300">
            <thead className="border-b border-razer-border bg-black/60 text-xs uppercase tracking-wider text-razer-green font-mono">
              <tr>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Placed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-razer-border/50">
              {orders.map((order) => {
                const config =
                  statusConfig[order.status as keyof typeof statusConfig] ??
                  statusConfig.pending;
                const StatusIcon = config.icon;
                return (
                  <tr
                    key={order.id}
                    className="group transition-colors hover:bg-razer-darkGreen/20"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-razer-green">
                      {order.order_number}
                      <div className="text-xs font-normal text-zinc-500">
                        #{order.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white group-hover:text-razer-green">
                        {order.user?.name ?? "Unknown customer"}
                      </div>
                      <div className="text-xs text-zinc-500">
                        {order.user?.email ?? "No email"}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono">
                      <span className="inline-flex items-center gap-1.5">
                        <Package className="h-3.5 w-3.5 text-zinc-500" />
                        {order.products_count}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">
                      ${Number(order.total_amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-xs font-bold ${config.className}`}
                      >
                        <StatusIcon className="h-3.5 w-3.5" />
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-400 font-mono">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {data && data.last_page > 1 && (
        <Pagination
          currentPage={data.current_page}
          lastPage={data.last_page}
          onPageChange={(page) =>
            setFilters((current) => ({ ...current, page }))
          }
        />
      )}
    </div>
  );
};
