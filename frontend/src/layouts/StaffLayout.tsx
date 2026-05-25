// layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { CreatePostModal } from "../components/post/CreatePostModal";

export default function StaffLayout() {
  return (
    <div className="container-fluid d-flex flex-column vh-100 p-0">
      {/* Renders */}
      <Header />
      <main className="container flex-grow-1 overflow-auto fg-neutral p-4 border-start border-end">
        <Outlet />
      </main>
      <Footer />
      {/* Modals */}
      <CreatePostModal />
    </div>
  );
}
