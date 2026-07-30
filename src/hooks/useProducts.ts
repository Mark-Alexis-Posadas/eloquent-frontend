import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

interface UseProductsProps {
  page: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export const useProducts = ({
  page,
  search,
  category,
  minPrice,
  maxPrice,
  sort,
}: UseProductsProps) => {
  return useQuery({
    queryKey: ["products", page, search, category, minPrice, maxPrice, sort],
    queryFn: () =>
      fetchProducts({
        page,
        search,
        category,
        minPrice,
        maxPrice,
        sort,
      }),
    placeholderData: (previousData) => previousData,
  });
};
