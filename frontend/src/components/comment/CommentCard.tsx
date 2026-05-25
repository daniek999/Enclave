import { useAuthStore } from "../../stores/auth.store";
import type { CommentItem } from "../../types/comment.type";

export function CommentCard({ comment }: { comment: CommentItem }) {
  const { user } = useAuthStore();

  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-column">
        <p className="mb-0 small fw-bold fg-primary">
          @{comment.user.username}
        </p>
        <div className="d-flex flex-row gap-2">
          <p className="mb-0 small fg-partial">
            Publicado el {new Date(comment.createdAt).toLocaleString()}
          </p>
          {(user?.id === comment.user.id ||
            user?.role === "admin" ||
            user?.role === "mod") && (
            <>
              <a href="#" className="lk-danger small">
                [Eliminar]
              </a>
              {user?.id === comment.user.id && (
                <a href="#" className="lk-warning  small">
                  [Editar]
                </a>
              )}
            </>
          )}
        </div>
      </div>
      <p className="mb-0">{comment.content}</p>
    </div>
  );
}
