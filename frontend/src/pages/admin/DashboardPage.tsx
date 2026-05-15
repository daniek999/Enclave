// pages/admin/AdminDashboardPage.tsx
import { Link } from "react-router-dom";

export function AdminDashboardPage() {
  return (
    <section className="d-flex flex-column gap-4">
      {/* Title */}
      <div>
        <h1 className="fw-bold">Panel Administrativo</h1>
        <p className="text-secondary mb-0">Gestión general del sistema.</p>
      </div>
      {/* Tables */}
      <div className="row g-3">
        <div className="col-md-3">
          <div className="card bg-dark border-secondary ">
            <div className="card-body">
              <h5>Usuarios</h5>
              <p className="text-secondary">Auditoría y moderación.</p>
              <Link
                to="/admin/users"
                className="btn btn-outline-warning btn-sm"
              >
                Usuarios
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-dark border-secondary ">
            <div className="card-body">
              <h5>Posts</h5>
              <p className="text-secondary mb-0">Gestión publicaciones.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-dark border-secondary ">
            <div className="card-body">
              <h5>Comentarios</h5>
              <p className="text-secondary mb-0">Gestión comentarios.</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-dark border-secondary ">
            <div className="card-body">
              <h5>Tags</h5>
              <p className="text-secondary mb-0">Gestión tags.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
