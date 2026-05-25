import { useForm } from "react-hook-form";
import { userApi } from "../../apis/user.api";
import type { UserUpdate } from "../../types/user.type";
import { useParams } from "react-router-dom";

export default function UpdatePostModal() {
  // Hooks
  const { id } = useParams();
  const { updateUser } = userApi();
  const { register, handleSubmit, reset } = useForm<UserUpdate>();

  async function onSubmit(body: UserUpdate) {
    try {
      await updateUser(id, body);
      reset();
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Error al crear publicación.");
    }
  }

  // Renders
  return (
    <div className="modal fade" id="updateUserModal" tabIndex={-1}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-dark text-light"></div>
      </div>
    </div>
  );
}
