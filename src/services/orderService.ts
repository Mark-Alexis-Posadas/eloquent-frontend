import { api } from "../api/axios";
import type { PaginatedOrdersResponse } from "../types/order";

export interface OrderParams {
  page?: number;
  search?: string;
  status?: string;
}

export const orderService = {
  getOrders: async (params: OrderParams): Promise<PaginatedOrdersResponse> => {
    const response = await api.get<PaginatedOrdersResponse>("/orders", {
      params,
    });
    return response.data;
  },
};
