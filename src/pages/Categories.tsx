import React, { useState } from "react";
import {
  FolderTree,
  Search,
  Plus,
  Edit2,
  Trash2,
  Package,
  CheckCircle2,
  XCircle,
  Loader2,
  ServerCrash,
} from "lucide-react";
import { useCategories } from "../hooks/useCategories";
import type { Category, CategoryPayload } from "../services/categoryService";
import CategoryForm from "../components/CategoryModal";

export const CategoriesPage: React.FC = () => {
  const {
    categories,
    isLoading,
    isFetching,
    isError,
    createCategory,
    updateCategory,
    deleteCategory,
    isSubmitting,
  } = useCategories();

  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const handleOpenCreateModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmitCategory = async (payload: CategoryPayload) => {
    try {
      if (selectedCategory) {
        await updateCategory({ id: selectedCategory.id, payload });
      } else {
        await createCategory(payload);
      }
      setIsModalOpen(false);
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleDeleteCategory = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      try {
        await deleteCategory(id);
      } catch (error: any) {
        alert(error.response?.data?.message || "Failed to delete category.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-razer-border pb-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white font-mono flex items-center gap-3">
            <FolderTree className="w-7 h-7 text-razer-green" />
            CATEGORIES MANAGEMENT
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Organize product taxonomies & relations
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {isFetching && !isLoading && (
            <div className="flex items-center text-xs font-mono text-razer-green gap-2 bg-razer-darkGreen/40 px-3 py-1.5 rounded border border-razer-green/30">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              REFRESHING
            </div>
          )}

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded bg-razer-green px-4 py-2 text-sm font-bold text-black transition hover:bg-razer-green/80 font-mono shadow-[0_0_10px_rgba(0,255,0,0.2)]"
          >
            <Plus className="w-4 h-4" />
            ADD CATEGORY
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-razer-card border border-razer-border rounded-lg p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search categories or slugs..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-razer-bg border border-razer-border rounded text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-razer-green font-mono"
          />
        </div>
      </div>

      {/* Content State Handling */}
      {isLoading ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-3 bg-razer-card rounded border border-razer-border">
          <Loader2 className="w-8 h-8 text-razer-green animate-spin" />
          <p className="font-mono text-xs text-zinc-400">
            SYNCING CATEGORIES...
          </p>
        </div>
      ) : isError ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-3 bg-red-950/20 rounded border border-red-800 text-red-400">
          <ServerCrash className="w-8 h-8" />
          <p className="font-mono text-xs">FAILED TO RETRIEVE API RESPONSE</p>
        </div>
      ) : (
        /* Categories Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="group bg-razer-card border border-razer-border hover:border-razer-green/50 transition-all rounded-lg p-5 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Accent indicator line */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  category.is_active ? "bg-razer-green" : "bg-zinc-700"
                }`}
              />

              <div>
                {/* Status & Badge Header */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded border ${
                      category.is_active
                        ? "bg-razer-green/10 text-razer-green border-razer-green/30"
                        : "bg-zinc-800 text-zinc-500 border-zinc-700"
                    }`}
                  >
                    {category.is_active ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> ACTIVE
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> INACTIVE
                      </>
                    )}
                  </span>

                  {/* Product Count Badge */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-razer-bg px-2.5 py-1 rounded border border-razer-border">
                    <Package className="w-3.5 h-3.5 text-razer-green" />
                    {category.products_count ?? 0} Products
                  </span>
                </div>

                {/* Category Details */}
                <h3 className="text-lg font-bold text-white group-hover:text-razer-green transition-colors font-mono">
                  {category.name}
                </h3>
                <p className="text-xs font-mono text-razer-green/80 mt-0.5">
                  /{category.slug}
                </p>

                <p className="text-xs text-zinc-400 mt-3 line-clamp-2 min-h-[32px]">
                  {category.description || "// No description provided."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-razer-border/50">
                <button
                  onClick={() => handleOpenEditModal(category)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded border border-razer-border bg-razer-bg py-1.5 text-xs font-mono text-zinc-300 hover:border-razer-green hover:text-razer-green transition"
                >
                  <Edit2 className="w-3.5 h-3.5" /> EDIT
                </button>

                <button
                  onClick={() =>
                    handleDeleteCategory(category.id, category.name)
                  }
                  className="flex items-center justify-center rounded border border-red-500/30 bg-red-500/10 p-1.5 text-xs font-mono text-red-400 hover:bg-red-500 hover:text-white transition"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="col-span-full p-12 bg-razer-card rounded border border-razer-border text-center font-mono text-xs text-zinc-500">
              // NO CATEGORIES FOUND
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <CategoryForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitCategory}
          initialData={selectedCategory}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};
