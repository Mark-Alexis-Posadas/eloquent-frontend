import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryPayload } from "../services/categoryService";
import { categoryService } from "../services/categoryService";
export const useCategories = () => {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getAll,
  });

  const createCategoryMutation = useMutation({
    mutationFn: (newCategory: CategoryPayload) =>
      categoryService.create(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  return {
    categories: categoriesQuery.data ?? [],
    isLoading: categoriesQuery.isLoading,
    isError: categoriesQuery.isError,

    createCategory: createCategoryMutation.mutateAsync,
    isCreating: createCategoryMutation.isPending,
  };
};
