import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProductsPage } from "./pages/ProductPage";
import { CategoriesPage } from "./pages/Categories";
import { OrdersPage } from "./pages/OrdersPage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
};
