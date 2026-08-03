import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "../services/productService";

import type {
  ProductParams,
  CreateProductPayload,
  UpdateProductPayload,
} from "../services/productService";

export const useProducts = (filters: ProductParams) => {
  const queryClient = useQueryClient();

  // 1. FETCH PRODUCTS
  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: () => productService.getProducts(filters),
    placeholderData: (previousData) => previousData,
  });

  // 2. CREATE PRODUCT MUTATION
  const createMutation = useMutation({
    mutationFn: (payload: CreateProductPayload) =>
      productService.createProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // 3. UPDATE PRODUCT MUTATION
  const updateMutation = useMutation({
    mutationFn: (payload: UpdateProductPayload) =>
      productService.updateProduct(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // 4. DELETE PRODUCT MUTATION
  const deleteMutation = useMutation({
    mutationFn: (id: number) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    ...query,
    createProduct: createMutation.mutateAsync,
    updateProduct: updateMutation.mutateAsync,
    deleteProduct: deleteMutation.mutateAsync,
    isSubmitting:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
};
