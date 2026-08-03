import { api } from "../api/axios";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  products_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryPayload {
  name: string;
  description?: string;
  is_active?: boolean;
}

export const categoryService = {
  getAll: async () => {
    const response = await api.get<{ success: boolean; data: Category[] }>(
      "/categories",
    );
    return response.data.data;
  },

  getById: async (id: number) => {
    const response = await api.get<{ success: boolean; data: Category }>(
      `/categories/${id}`,
    );
    return response.data.data;
  },

  create: async (payload: CategoryPayload) => {
    const response = await api.post("/categories", payload);
    return response.data;
  },

  update: async (id: number, payload: CategoryPayload) => {
    const response = await api.put(`/categories/${id}`, payload);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};
