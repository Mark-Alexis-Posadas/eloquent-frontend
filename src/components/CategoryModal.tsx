import React, { useState } from "react";
import { useCategories } from "../hooks/useCategories";

const CategoryModal = () => {
  const { createCategory, isCreating } = useCategories();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createCategory({
        name,
        description,
        is_active: true,
      });

      // Clear form after success
      setName("");
      setDescription("");
      alert("Category created successfully!");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
      <div>
        <label className="text-zinc-400">CATEGORY NAME</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-razer-bg border border-razer-border p-2 rounded text-white focus:border-razer-green"
        />
      </div>

      <div>
        <label className="text-zinc-400">DESCRIPTION</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-razer-bg border border-razer-border p-2 rounded text-white focus:border-razer-green"
        />
      </div>

      <button
        type="submit"
        disabled={isCreating}
        className="w-full bg-razer-green text-black font-bold p-2 rounded hover:bg-razer-green/80 disabled:opacity-50"
      >
        {isCreating ? "SAVING..." : "CREATE CATEGORY"}
      </button>
    </form>
  );
};

export default CategoryModal;
