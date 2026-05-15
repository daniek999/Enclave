// pages/PostDetailPage.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../components/common/Loading";
import { postApi } from "../apis/post.api";
import type { PostItem } from "../types/post.type";
import { useAuthStore } from "../stores/auth.store";
import { commentApi } from "../apis/comment.api";
import type { CommentItem } from "../types/comment.type";
import { CommentCard } from "../components/comment/CommentCard";
import { CommentForm } from "../components/comment/CommentForm";

export function PostDetailPage() {
  // Hooks
  const { id } = useParams();
  const { findPostById } = postApi();
  const { listComments } = commentApi();

  // States
  const user = useAuthStore((state) => state.user);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [post, setPost] = useState<PostItem | null>(null);
  const [loading, setLoading] = useState(true);

  // Handlers
  async function fetchPost() {
    try {
      setLoading(true);
      const response = await findPostById(Number(id));
      setPost(response.data.item);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function fetchComments() {
    try {
      const response = await listComments(Number(id));

      setComments(response.data.items);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPost();
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Renders
  if (loading) {
    return <Loading />;
  }
  if (!post) {
    return (
      <div className="container py-5">
        <p>Post inexistente.</p>
      </div>
    );
  }
  return (
    <section className="container d-flex flex-column gap-4 p-4">
      <Link to={"/"} className="small lk-primary">
        Regresar
      </Link>
      <hr className="my-0" />
      <div className="d-flex flex-column gap-4 align-items-start">
        <div className="d-flex flex-column gap-1">
          <h3 className="fw-bold mb-0">{post.title}</h3>
          <p className="fg-partial mb-0 small">
            @{post.user.username}
            <span className="mx-2">|</span>
            {new Date(post.createdAt).toLocaleString()}
            <span className="mx-2">|</span>
            {post.tag.name}
          </p>
        </div>
        <p className="mb-0">{post.content}</p>
      </div>
      <hr className="my-0" />
      <div className="d-flex flex-column gap-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Comentarios</h5>
          <span className="fg-partial">{comments.length}</span>
        </div>
        {user ? (
          <CommentForm postId={post.id} />
        ) : (
          <div className="bg-surface p-2 rounded-0 text-center">
            Debes iniciar sesión para comentar.
          </div>
        )}
        {comments.length === 0 ? (
          <div className="fg-partial">No existen comentarios.</div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
