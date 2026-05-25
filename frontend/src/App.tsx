// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import StaffLayout from "./layouts/StaffLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/default/NotFoundPage";
import AdminUsersPage from "./pages/admin/StaffUserPage";
import { useAuthStore } from "./stores/auth.store";
import { useEffect } from "react";
import { PostPage } from "./pages/PostPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { StaffPage } from "./pages/admin/StaffPage";

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
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Route>
        {/* Mod - Admin */}
        <Route
          element={
            <ProtectedRoute>
              <StaffLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
        {/* Defaults */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
