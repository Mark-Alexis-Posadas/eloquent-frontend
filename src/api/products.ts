import axios from "axios";
import type { PaginatedProductsResponse } from "../types/product";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const fetchProducts = async (
  page = 1,
): Promise<PaginatedProductsResponse> => {
  const response = await axios.get<PaginatedProductsResponse>(
    `${API_BASE_URL}/products?page=${page}`,
  );
  return response.data;
};
