import { useForm } from "react-hook-form";
import { commentApi } from "../../apis/comment.api";

interface FormData {
  content: string;
}

export function CommentForm({ postId }: { postId: number }) {
  // Hooks
  const { createComment } = commentApi();
  const { register, handleSubmit, reset } = useForm<FormData>();

  // Handlers
  async function onSubmit(data: FormData) {
    try {
      await createComment({
        content: data.content,
        postId,
      });
      reset();
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Error al comentar.");
    }
  }

  return (
    <form
      className="d-flex flex-column gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <textarea
        rows={4}
        className="form-control rounded-0"
        placeholder="Escribe un comentario..."
        {...register("content")}
      />

      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn btn-outline-light btn-sm rounded-0"
        >
          Comentar
        </button>
      </div>
    </form>
  );
}
