// component/post/PostCard.tsx
import { Link } from "react-router-dom";
import type { PostItem } from "../../types/post.type";

export function PostCard({ post }: { post: PostItem }) {
  return (
    <div className="card-body d-flex flex-column">
      <p className="mb-0">{post.title}</p>
      <p className="card-text mb-0 small">
        <span className="fg-primary">{post.user.username}:</span>{" "}
        {post.content.slice(0, 310)}
      </p>
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-0 small fg-partial">
          N°{post.id} | {new Date(post.createdAt).toLocaleDateString()} |{" "}
          {post.tag.name}
        </p>
        <Link to={`/posts/${post.id}`} className="small lk-primary">
          Ver Post
        </Link>
      </div>
    </div>
  );
}
