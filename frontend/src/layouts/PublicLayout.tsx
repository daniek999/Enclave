// layouts/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import { LoginModal } from "../components/auth/LoginModal";
import { RegisterModal } from "../components/auth/RegisterModal";
import { CreatePostModal } from "../components/post/CreatePostModal";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function PublicLayout() {
  return (
    <div className="container-fluid d-flex flex-column vh-100 p-0">
      {/* Renders */}
      <Header />
      <main className="container flex-grow-1 overflow-auto fg-neutral p-4 border-start border-end">
        <Outlet />
      </main>
      <Footer />
      {/* Modals */}
      <LoginModal />
      <RegisterModal />
      <CreatePostModal />
    </div>
  );
}
