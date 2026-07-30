import axios from "axios";
import type { PaginatedProductsResponse } from "../types/product";

const API_BASE_URL = "http://127.0.0.1:8000/api";

interface ProductParams {
  page?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export const fetchProducts = async ({
  page = 1,
  search = "",
  category = "",
  minPrice,
  maxPrice,
  sort = "",
}: ProductParams): Promise<PaginatedProductsResponse> => {
  const response = await axios.get<PaginatedProductsResponse>(
    `${API_BASE_URL}/products`,
    {
      params: {
        page,
        search,
        category,
        minPrice,
        maxPrice,
        sort,
      },
    },
  );

  return response.data;
};
