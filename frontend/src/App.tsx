// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/default/NotFoundPage";
import { useAuthStore } from "./stores/auth.store";
import { useEffect } from "react";
import { PostDetailPage } from "./pages/PostDetailPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AdminLayout } from "./layouts/StaffLayout";
import { AdminDashboardPage } from "./pages/admin/DashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

export default function App() {
  const loadAuth = useAuthStore((i) => i.loadAuth);

  useEffect(() => {
    loadAuth();
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Route>
        {/* Mod - Admin */}
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/staff" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
        {/* Defaults */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
