import React from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { ProductTable } from "../components/ProductTable";
import { Pagination } from "../components/Pagination";
import { Loader2, ServerCrash, PackageSearch } from "lucide-react";

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current page from URL params (defaults to 1)
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError, isFetching } = useProducts(page);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-razer-border pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white font-mono flex items-center gap-3">
            <PackageSearch className="w-7 h-7 text-razer-green" /> PRODUCTS
            MANAGEMENT
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Direct database sync & stock level management
          </p>
        </div>
        {isFetching && (
          <div className="flex items-center text-xs font-mono text-razer-green gap-2 bg-razer-darkGreen/40 px-3 py-1.5 rounded border border-razer-green/30">
            <Loader2 className="w-4 h-4 animate-spin" /> FETCHING
          </div>
        )}
      </div>

      {/* Table Data States */}
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-3 bg-razer-card rounded border border-razer-border">
          <Loader2 className="w-8 h-8 text-razer-green animate-spin" />
          <p className="font-mono text-xs text-zinc-400">SYNCING PRODUCTS...</p>
        </div>
      ) : isError ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-3 bg-red-950/20 rounded border border-red-800 text-red-400">
          <ServerCrash className="w-8 h-8" />
          <p className="font-mono text-xs">FAILED TO RETRIEVE API RESPONSE</p>
        </div>
      ) : data ? (
        <>
          <ProductTable products={data.data} />
          <Pagination
            currentPage={data.current_page}
            lastPage={data.last_page}
            onPageChange={handlePageChange}
          />
        </>
      ) : null}
    </div>
  );
};
