// components/common/Header.tsx
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import type { AuthUser } from "../../types/auth.type";

export default function Header() {
  // Hooks
  const { user, logout } = useAuthStore();

  // handlers
  const renderPrivateActions = (user: AuthUser) => {
    switch (user!.role) {
      case "admin":
        return (
          <div className="d-flex flex-row gap-2">
            <Link
              to="/staff"
              className="btn btn-outline-warning btn-sm rounded-0"
            >
              Admin Panel
            </Link>
            <Link
              to="/profile"
              className="btn btn-outline-success btn-sm rounded-0"
            >
              Perfil
            </Link>
          </div>
        );
      case "mod":
        return (
          <div className="d-flex flex-row gap-2">
            <Link
              to="/staff"
              className="btn btn-outline-warning btn-sm rounded-0"
            >
              Mod Panel
            </Link>
            <Link
              to="/profile"
              className="btn btn-outline-success btn-sm rounded-0"
            >
              Perfil
            </Link>
          </div>
        );
      case "user":
        return (
          <Link
            to="/profile"
            className="btn btn-outline-success btn-sm rounded-0"
          >
            Perfil
          </Link>
        );
    }
  };
  const renderPublicActions = (user: AuthUser | null) => {
    switch (user) {
      case null:
        return (
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-light btn-sm rounded-0"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Login
            </button>
            <button
              className="btn btn-light btn-sm rounded-0"
              data-bs-toggle="modal"
              data-bs-target="#registerModal"
            >
              Register
            </button>
          </div>
        );
      case user:
        return (
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-light btn-sm rounded-0"
              data-bs-toggle="modal"
              data-bs-target="#createPostModal"
            >
              Crear Post
            </button>
            <span className="small">@{user!.username}</span>
            <button
              className="btn btn-outline-danger btn-sm rounded-0"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        );
    }
  };

  // Renders
  return (
    <header className="border-bottom flex-shrink-0 border-bottom border-secondary">
      <nav className="container px-4 py-1 navbar navbar-expand-lg navbar-dark p-0">
        {/* Brand */}
        <Link to="/" className="navbar-brand fs-3 fw-bold m-0 text-light">
          Enclave
        </Link>
        {/* Toggler */}
        <button
          className="navbar-toggler rounded-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#component-navbar"
          aria-controls="component-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Actions */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="component-navbar"
        >
          <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">
            {user && renderPrivateActions(user)}
            {renderPublicActions(user)}
          </div>
        </div>
      </nav>
    </header>
  );
}
