import React, { useState, useEffect } from "react";
import type { Category, CategoryPayload } from "../services/categoryService";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: CategoryPayload) => Promise<void>;
  initialData?: Category | null;
  isSubmitting?: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Sync internal state when modal opens or initialData changes
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setIsActive(initialData.is_active ?? true);
    } else {
      // Reset form when adding a new category
      setName("");
      setDescription("");
      setIsActive(true);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      name,
      description,
      is_active: isActive,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-razer-card border border-razer-border p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-4 border-b border-razer-border pb-2">
          <h2 className="text-lg font-mono font-bold text-white">
            {initialData ? "// EDIT CATEGORY" : "// CREATE CATEGORY"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white font-mono text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-zinc-400 block mb-1">CATEGORY NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Gaming Mice"
              className="w-full bg-razer-bg border border-razer-border p-2 rounded text-white focus:outline-none focus:border-razer-green"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-1">DESCRIPTION</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Enter category description..."
              className="w-full bg-razer-bg border border-razer-border p-2 rounded text-white focus:outline-none focus:border-razer-green"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="accent-razer-green"
            />
            <label htmlFor="is_active" className="text-zinc-300 cursor-pointer">
              ACTIVE STATUS
            </label>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border border-razer-border bg-razer-bg text-zinc-400 font-bold p-2 rounded hover:text-white transition"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-1/2 bg-razer-green text-black font-bold p-2 rounded hover:bg-razer-green/80 disabled:opacity-50 transition"
            >
              {isSubmitting
                ? "SAVING..."
                : initialData
                  ? "UPDATE CATEGORY"
                  : "CREATE CATEGORY"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
