// component/post/PostCard.tsx
import { Link } from "react-router-dom";
import type { PostItem } from "../../types/post.type";

export function PostCard({ post }: { post: PostItem }) {
  return (
    <div className="d-flex flex-column gap-1">
      <div className="d-flex flex-column">
        <p className="mb-0 text-truncate">{post.title}</p>
        <p className="card-text mb-0 small">
          <span className="fw-bold fg-partial">@{post.user.username}:</span>{" "}
          {post.content.slice(0, 310)}
        </p>
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <p className="mb-0 small fg-partial">
          N°{post.id}
          <span className="px-2">|</span>
          {new Date(post.createdAt).toLocaleDateString()}
          <span className="px-2">|</span>
          {post.tag.name}
        </p>
        <Link to={`/posts/${post.id}`} className="small lk-primary">
          Ver Post
        </Link>
      </div>
    </div>
  );
}
