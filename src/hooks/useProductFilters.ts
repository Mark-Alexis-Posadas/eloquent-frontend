import { useSearchParams } from "react-router-dom";

export interface ProductFilters {
  page: number;
  search: string;
  category_id?: number;
  max_price?: number;
}

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: ProductFilters = {
    page: Number(searchParams.get("page")) || 1,
    search: searchParams.get("search") || "",
    category_id: searchParams.get("category_id")
      ? Number(searchParams.get("category_id"))
      : undefined,
    max_price: searchParams.get("max_price")
      ? Number(searchParams.get("max_price"))
      : undefined,
  };

  const applyFilters = (updates: Partial<Omit<ProductFilters, "page">>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    params.set("page", "1");

    setSearchParams(params);
  };

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", page.toString());

    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({
      page: "1",
    });
  };

  return {
    filters,
    applyFilters,
    setPage,
    clearFilters,
  };
};
