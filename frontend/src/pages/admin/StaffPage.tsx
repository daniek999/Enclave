// pages/admin/DashboardPage.tsx
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import type { AuthUser } from "../../types/auth.type";

export function StaffPage() {
  // Hooks
  const { user } = useAuthStore();

  // Handler
  const renderRoleManagement = (user: AuthUser) => {
    switch (user.role) {
      case "admin":
        return (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex flex-column border border-secondary p-4">
                <p className="mb-0">Usuarios</p>
                <p className="text-secondary mb-3">Auditoría y moderación.</p>
                <Link
                  to="/admin/users"
                  className="btn btn-outline-warning btn-sm rounded-0"
                >
                  Monitorear Tabla
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column border border-secondary p-4">
                <p className="mb-0">Posts</p>
                <p className="text-secondary mb-3">Gestión publicaciones.</p>
                <Link
                  to="/admin/posts"
                  className="btn btn-outline-warning btn-sm rounded-0"
                >
                  Monitorear Tabla
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column border border-secondary p-4">
                <p className="mb-0">Comentarios</p>
                <p className="text-secondary mb-3">Gestión comentarios.</p>
                <Link
                  to="/admin/comments"
                  className="btn btn-outline-warning btn-sm rounded-0"
                >
                  Monitorear Tabla
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column border border-secondary p-4">
                <p className="mb-0">Tags</p>
                <p className="text-secondary mb-3">Gestión tags.</p>
                <Link
                  to="/admin/tags"
                  className="btn btn-outline-warning btn-sm rounded-0"
                >
                  Monitorear Tabla
                </Link>
              </div>
            </div>
          </div>
        );
      case "mod":
        return (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="d-flex flex-column border border-secondary p-4">
                <p className="mb-0">Posts</p>
                <p className="text-secondary mb-3">Gestión publicaciones.</p>
                <Link
                  to="/admin/posts"
                  className="btn btn-outline-warning btn-sm rounded-0"
                >
                  Monitorear Tabla
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="d-flex flex-column border border-secondary p-4">
                <p className="mb-0">Comentarios</p>
                <p className="text-secondary mb-3">Gestión comentarios.</p>
                <Link
                  to="/admin/comments"
                  className="btn btn-outline-warning btn-sm rounded-0"
                >
                  Monitorear Tabla
                </Link>
              </div>
            </div>
          </div>
        );
    }
  };

  // Render
  return (
    <section className="d-flex flex-column gap-4">
      {/* Title */}
      <h5 className="fw-bold mb-0">Panel De Tablas</h5>
      {/* Separator */}
      <hr className="my-0 hr-surface" />
      {/* Tables */}
      {user && renderRoleManagement(user)}
    </section>
  );
}
