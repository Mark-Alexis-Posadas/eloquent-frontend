export interface OrderUser {
  id: number;
  name: string;
  email: string;
}

export interface Order {
  id: number;
  order_number: string;
  total_amount: string;
  status: "pending" | "paid" | "shipped" | "cancelled" | string;
  products_count: number;
  user: OrderUser;
  created_at: string;
}

export interface PaginatedOrdersResponse {
  current_page: number;
  data: Order[];
  last_page: number;
  total: number;
}
