import { useQuery } from "@tanstack/react-query";
import { orderService, type OrderParams } from "../services/orderService";

export const useOrders = (filters: OrderParams) =>
  useQuery({
    queryKey: ["orders", filters],
    queryFn: () => orderService.getOrders(filters),
    placeholderData: (previousData) => previousData,
  });