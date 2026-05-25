// components/post/CreatePostModal.tsx
import { postApi } from "../../apis/post.api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { TagItem } from "../../types/tag.type";
import { tagApi } from "../../apis/tag.api";
import type { PostCreate } from "../../types/post.type";

export function CreatePostModal() {
  // Hooks
  const { listTags } = tagApi();
  const { createPost } = postApi();
  const { register, handleSubmit, reset } = useForm<PostCreate>();
  const [tags, setTags] = useState<TagItem[]>([]);

  // Handlers
  async function fetchTags() {
    try {
      const response = await listTags(1, 10, "active");
      setTags(response.data.items);
    } catch (error) {
      console.log(error);
    }
  }
  async function onSubmitCreate(data: PostCreate) {
    try {
      await createPost(data);
      reset();
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Error al crear publicación.");
    }
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Renders
  return (
    <div className="modal fade" id="createPostModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <form
          onSubmit={handleSubmit(onSubmitCreate)}
          className="modal-content gap-4 bg-depth border border-secondary text-light rounded-0 p-4"
        >
          <div className="modal-header border-0 p-0">
            <h5 className="modal-title">Crear Publicación</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body d-flex flex-column gap-4 p-0">
            {/* @title */}
            <input
              type="text"
              className="form-control form-control-sm rounded-0"
              placeholder="Título"
              {...register("title")}
            />
            {/* @tagId */}
            <select
              className="form-control form-control-sm rounded-0"
              {...register("tagId")}
            >
              <option value="0">Selecciona un tag</option>
              {tags.map((tag) => {
                return (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                );
              })}
            </select>
            {/* @content */}
            <textarea
              rows={8}
              className="form-control form-control-sm rounded-0"
              placeholder="Contenido"
              {...register("content")}
            />
          </div>
          <div className="modal-footer border-0 p-0">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-0"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-light btn-sm rounded-0"
              data-bs-dismiss="modal"
            >
              Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
