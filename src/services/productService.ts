import { api } from "../api/axios";
import type { PaginatedProductsResponse } from "../types/product";

export interface ProductParams {
  page?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export const productService = {
  getProducts: async ({
    page = 1,
    search = "",
    category = "",
    minPrice,
    maxPrice,
    sort = "",
  }: ProductParams): Promise<PaginatedProductsResponse> => {
    const response = await api.get<PaginatedProductsResponse>("/products", {
      params: {
        page,
        search,
        category,
        minPrice,
        maxPrice,
        sort,
      },
    });

    return response.data;
  },
};
