import { api } from "../api/axios";
import type { PaginatedProductsResponse, Product } from "../types/product";

export interface ProductParams {
  page?: number;
  search?: string;
  category_id?: number;
  min_price?: number;
  max_price?: number;
  sort?: string;
}

export interface CreateProductPayload {
  name: string;
  category_id: number;
  price: number;
  stock: number;
  description?: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: number;
}

export const productService = {
  getProducts: async (
    params: ProductParams,
  ): Promise<PaginatedProductsResponse> => {
    const response = await api.get<PaginatedProductsResponse>("/products", {
      params,
    });
    return response.data;
  },

  createProduct: async (payload: CreateProductPayload): Promise<Product> => {
    const response = await api.post<Product>("/products", payload);
    return response.data;
  },

  updateProduct: async ({
    id,
    ...payload
  }: UpdateProductPayload): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, payload);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
