import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductTable } from "../components/ProductTable";
import { Pagination } from "../components/Pagination";
import { Loader2, ServerCrash, PackageSearch } from "lucide-react";

export const Dashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useProducts(page);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-razer-border pb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white font-mono flex items-center gap-3">
            <PackageSearch className="w-8 h-8 text-razer-green" /> INVENTORY
            MANAGEMENT
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time product catalog & stock controls
          </p>
        </div>
        {isFetching && (
          <div className="flex items-center text-xs font-mono text-razer-green gap-2 bg-razer-darkGreen/40 px-3 py-1.5 rounded border border-razer-green/30">
            <Loader2 className="w-4 h-4 animate-spin" /> SYNCHRONIZING...
          </div>
        )}
      </div>

      {/* Content Rendering */}
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-3 bg-razer-card rounded-lg border border-razer-border">
          <Loader2 className="w-10 h-10 text-razer-green animate-spin" />
          <p className="font-mono text-xs text-gray-400">
            FETCHING PRODUCT DATA...
          </p>
        </div>
      ) : isError ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-3 bg-red-950/20 rounded-lg border border-red-800 text-red-400">
          <ServerCrash className="w-10 h-10" />
          <p className="font-mono text-sm">
            FAILED TO CONNECT TO API (127.0.0.1:8000)
          </p>
        </div>
      ) : data ? (
        <>
          <ProductTable products={data.data} />
          <Pagination
            currentPage={data.current_page}
            lastPage={data.last_page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      ) : null}
    </div>
  );
};
