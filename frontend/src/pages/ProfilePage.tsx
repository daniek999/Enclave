// pages/ProfilePage.tsx
import { useEffect, useState } from "react";
import { userApi } from "../apis/user.api";
import type { UserItem } from "../types/user.type";
import { Loading } from "../components/common/Loading";
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */

export default function ProfilePage() {
  // Hooks
  const { findSelfById } = userApi();

  // States - Inicializar como null o undefined está bien, pero siempre usa la validación '?'
  const [user, setUser] = useState<UserItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Handlers
  async function fetchSelfUser() {
    try {
      setLoading(true);
      const res = await findSelfById();
      console.log(res);
      // Asegúrate de que la API te responda exactamente en esta estructura res.data.item
      setUser(res.data.item);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSelfUser();
  }, []);

  // Renders
  return (
    <section className="d-flex flex-column gap-4">
      {/* Title */}
      <div className="d-flex flex-column gap-0">
        <h3 className="fw-bold mb-0">
          {user?.username || "Cargando usuario..."}
        </h3>
        <p className="fg-partial mb-0">
          Datos relacionado en torno a tu cuenta de manera general.
        </p>
      </div>
      {/* Separator */}
      <hr className="my-0 hr-surface" />
      {/* Content */}
      {loading ? (
        <Loading />
      ) : (
        <div className="d-flex flex-column gap-4">
          {/* Usuario{} */}
          <div className="d-flex flex-column gap-2">
            <h5 className="mb-0 fw-semibold">Usuario</h5>
            <div className="d-flex flex-column">
              <div className="row fg-partial">
                <p className="col-md-1 mb-0 fg-primary">Usuario</p>
                <p className="col-md mb-0">{user?.username}</p>
              </div>
              <div className="row fg-partial">
                <p className="col-md-1 mb-0 fg-primary">Rol</p>
                <p className="col-md mb-0">{user?.role}</p>
              </div>
              <div className="row fg-partial">
                <p className="col-md-1 mb-0 fg-primary">Estado</p>
                <p className="col-md mb-0">{user?.status}</p>
              </div>
              <div className="row fg-partial">
                <p className="col-md-1 mb-0 fg-primary">Registrado</p>
                <p className="col-md mb-0">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
              <div className="row fg-partial">
                <p className="col-md-1 mb-0 fg-primary">Modificado</p>
                <p className="col-md mb-0">
                  {user?.updatedAt
                    ? new Date(user.updatedAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            </div>
          </div>
          {/* Posts[] */}
          <div className="d-flex flex-column gap-2">
            <h5 className="mb-0 fw-semibold">
              Publicaciones [{user?.posts?.length || 0}]
            </h5>
            {user?.posts && user.posts.length > 0 ? (
              <div className="d-flex flex-column gap-2">
                {user.posts.map((post) => (
                  <div key={post.id} className="row fg-partial">
                    <p className="col-md-1 mb-0 fg-primary">{post.id}</p>
                    <p className="col-md mb-0">{post.title}</p>
                    <p className="col-md-3 mb-0">
                      {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="fg-partial mb-0">No tienes publicaciones aún.</p>
            )}
          </div>
          {/* Comments[] */}
          <div className="d-flex flex-column gap-2">
            <h5 className="mb-0 fw-semibold">
              Comentarios [{user?.comments?.length || 0}]
            </h5>
            {user?.comments && user.comments.length > 0 ? (
              <div className="d-flex flex-column gap-2">
                {user.comments.map((comment) => (
                  <div key={comment.id} className="row fg-partial">
                    <p className="col-md-1 mb-0 fg-primary">{comment.id}</p>
                    <p className="col-md mb-0">{comment.content}</p>
                    <p className="col-md-3 mb-0">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="fg-partial mb-0">No tienes comentarios aún.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
