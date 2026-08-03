import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { ProductTable } from "../components/ProductTable";
import { Pagination } from "../components/Pagination";
import { useProductFilters } from "../hooks/useProductFilters";
import {
  Loader2,
  ServerCrash,
  PackageSearch,
  Search,
  Filter,
  Plus,
  X,
} from "lucide-react";

interface ProductFormData {
  id?: number;
  title: string;
  category_id: number;
  price: number;
  stock: number;
  description?: string;
}

export const ProductsPage: React.FC = () => {
  const { filters, applyFilters, setPage, clearFilters } = useProductFilters();

  // Integrated CRUD hook
  const {
    data,
    isLoading,
    isFetching,
    isError,
    createProduct,
    updateProduct,
    deleteProduct,
    isSubmitting,
  } = useProducts(filters);

  const { categories, isLoading: isCategoriesLoading } = useCategories();

  // Local state for filter inputs
  const [searchInput, setSearchInput] = useState(filters.search ?? "");
  const [categoryInput, setCategoryInput] = useState<number | undefined>(
    filters.category_id,
  );
  const [maxPriceInput, setMaxPriceInput] = useState<number | undefined>(
    filters.max_price,
  );

  // Modal & Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(
    null,
  );
  const [formData, setFormData] = useState<ProductFormData>({
    title: "",
    category_id: 1,
    price: 0,
    stock: 0,
    description: "",
  });

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      category_id: categories[0]?.id || 1,
      price: 0,
      stock: 0,
      description: "",
    });
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (product: any) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      title: product.name,
      category_id: product.category_id,
      price: Number(product.price),
      stock: Number(product.stock),
      description: product.description || "",
    });
    setIsModalOpen(true);
  };

  // Submit Handler (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct && editingProduct.id) {
        await updateProduct({ id: editingProduct.id, ...formData });
      } else {
        await createProduct(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  // Delete Handler
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

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

        <div className="flex items-center gap-3">
          {isFetching && (
            <div className="flex items-center text-xs font-mono text-razer-green gap-2 bg-razer-darkGreen/40 px-3 py-1.5 rounded border border-razer-green/30">
              <Loader2 className="w-4 h-4 animate-spin" />
              FETCHING
            </div>
          )}

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 rounded bg-razer-green px-4 py-2 text-sm font-bold text-black transition hover:bg-emerald-400 font-mono"
          >
            <Plus className="w-4 h-4" />
            ADD PRODUCT
          </button>
        </div>
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
          <ProductTable
            products={data.data}
            onEdit={handleOpenEditModal}
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={data.current_page}
            lastPage={data.last_page}
            onPageChange={setPage}
          />
        </>
      ) : null}

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-razer-card border border-razer-border rounded-lg w-full max-w-md p-6 relative space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
              <PackageSearch className="w-5 h-5 text-razer-green" />
              {editingProduct ? "EDIT PRODUCT" : "CREATE PRODUCT"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-sm font-mono"
            >
              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-razer-bg border border-razer-border rounded text-white focus:outline-none focus:border-razer-green"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">
                  Category
                </label>
                <select
                  required
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category_id: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-razer-bg border border-razer-border rounded text-white focus:outline-none focus:border-razer-green"
                >
                  {categories.map((cat) => (
                    <option
                      key={cat.id}
                      value={cat.id}
                      className="bg-razer-card text-white"
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-razer-bg border border-razer-border rounded text-white focus:outline-none focus:border-razer-green"
                  />
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-razer-bg border border-razer-border rounded text-white focus:outline-none focus:border-razer-green"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded bg-razer-green font-bold text-black hover:bg-emerald-400 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingProduct ? "SAVE CHANGES" : "CREATE"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
