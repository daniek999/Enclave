// layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { CreatePostModal } from "../components/post/CreatePostModal";

export function AdminLayout() {
  return (
    <div className="container-fluid d-flex flex-column vh-100 fg-neutral">
      {/* Renders */}
      <Header />
      <main className="container flex-grow-1 overflow-auto py-4">
        <Outlet />
      </main>
      <Footer />
      {/* Modals */}
      <CreatePostModal />
    </div>
  );
}
