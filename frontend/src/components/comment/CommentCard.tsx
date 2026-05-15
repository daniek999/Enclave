import type { CommentItem } from "../../types/comment.type";

interface Props {
  comment: CommentItem;
}

export function CommentCard({ comment }: Props) {
  return (
    <article className="border-secondary rounded-0">
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0">@{comment.user.username}</p>
          <p className="mb-0 small fg-partial">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
        <p className="mb-0 fg-partial">{comment.content}</p>
      </div>
    </article>
  );
}
