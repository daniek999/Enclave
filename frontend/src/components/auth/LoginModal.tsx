// components/LoginModal.tsx
import { authApi } from "../../apis/auth.api";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../stores/auth.store";
import type { LoginBody } from "../../types/auth.type";

export function LoginModal() {
  // Hooks
  const { login } = authApi();
  const { register, handleSubmit, reset } = useForm<LoginBody>();
  const { setAuth } = useAuthStore();

  // Handlers
  const onSubmit = async (data: LoginBody) => {
    try {
      const response = await login(data);

      setAuth(response.data.token, response.data.item);

      reset();

      alert(response.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Error al iniciar sesión.");
    }
  };

  // Renders
  return (
    <div className="modal fade" id="loginModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-content bg-depth border border-secondary text-light rounded-0"
        >
          <div className="modal-header border-0">
            <h5 className="modal-title">Iniciar Sesión</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body d-flex flex-column gap-4">
            <input
              type="text"
              className="form-control form-control-sm rounded-0"
              placeholder="Username"
              {...register("username")}
            />

            <input
              type="password"
              className="form-control form-control-sm rounded-0"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm rounded-0"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="btn btn-light btn-sm rounded-0"
              data-bs-dismiss="modal"
            >
              Iniciar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
