import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";

export const useProducts = (page: number) => {
  return useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page),
    placeholderData: (previousData) => previousData, // Smooth pagination transitions
  });
};
