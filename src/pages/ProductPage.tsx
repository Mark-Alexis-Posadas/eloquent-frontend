import React from "react";
// import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories"; // 1. Import hook mo
import { ProductTable } from "../components/ProductTable";
import { Pagination } from "../components/Pagination";
import { useProductFilters } from "../hooks/useProductFilters";
import {
  Loader2,
  ServerCrash,
  PackageSearch,
  Search,
  Filter,
} from "lucide-react";

export const ProductsPage: React.FC = () => {
  const { filters, applyFilters, setPage, clearFilters } = useProductFilters();

  const { data, isLoading, isFetching, isError } = useProducts(filters);

  const { categories, isLoading: isCategoriesLoading } = useCategories();

  const [searchInput, setSearchInput] = React.useState(filters.search);
  const [categoryInput, setCategoryInput] = React.useState<number | undefined>(
    filters.category_id,
  );
  const [maxPriceInput, setMaxPriceInput] = React.useState<number | undefined>(
    filters.max_price,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-razer-border pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white font-mono flex items-center gap-3">
            <PackageSearch className="w-7 h-7 text-razer-green" />
            PRODUCTS MANAGEMENT
          </h1>

          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Direct database sync & stock level management
          </p>
        </div>

        {isFetching && (
          <div className="flex items-center text-xs font-mono text-razer-green gap-2 bg-razer-darkGreen/40 px-3 py-1.5 rounded border border-razer-green/30">
            <Loader2 className="w-4 h-4 animate-spin" />
            FETCHING
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-razer-card border border-razer-border rounded-lg p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-razer-bg border border-razer-border rounded text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-razer-green"
            />
          </div>

          {/* Category Dropdown */}
          <div className="lg:col-span-3">
            <select
              className="w-full py-2 px-3 bg-razer-bg border border-razer-border rounded text-sm text-white focus:outline-none focus:border-razer-green disabled:opacity-50"
              value={categoryInput ?? ""}
              disabled={isCategoriesLoading}
              onChange={(e) =>
                setCategoryInput(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            >
              <option value="" className="bg-razer-card text-white">
                {isCategoriesLoading
                  ? "Loading categories..."
                  : "All Categories"}
              </option>

              {/* 3. Dynamic Render gamit ang categories galing sa hook */}
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="bg-razer-card text-white"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price */}
          <div className="relative lg:col-span-2">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />

            <input
              type="number"
              placeholder="Max Price"
              value={maxPriceInput ?? ""}
              onChange={(e) =>
                setMaxPriceInput(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              className="w-full pl-10 pr-4 py-2 bg-razer-bg border border-razer-border rounded text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-razer-green"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 lg:col-span-2">
            <button
              className="flex-1 flex items-center justify-center gap-2 rounded border border-razer-green bg-razer-green/10 px-4 py-2 text-sm font-medium text-razer-green transition hover:bg-razer-green hover:text-black"
              onClick={() =>
                applyFilters({
                  search: searchInput,
                  category_id: categoryInput,
                  max_price: maxPriceInput,
                })
              }
            >
              <Search className="w-4 h-4" />
              Search
            </button>

            <button
              onClick={() => {
                clearFilters();

                setSearchInput("");
                setCategoryInput(undefined);
                setMaxPriceInput(undefined);
              }}
              className="flex items-center justify-center rounded border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
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
            onPageChange={setPage}
          />
        </>
      ) : null}
    </div>
  );
};
