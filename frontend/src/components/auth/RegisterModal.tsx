// components/RegisterModal.tsx
import { authApi } from "../../apis/auth.api";
import { useForm } from "react-hook-form";
import type { RegisterBody } from "../../types/auth.type";

export function RegisterModal() {
  // Hooks
  const { register: registerAuth } = authApi();
  const { register, handleSubmit, reset } = useForm<RegisterBody>();

  // Handlers
  async function onSubmitRegister(data: RegisterBody) {
    try {
      const response = await registerAuth(data);
      reset();
      alert(response.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.response?.data?.message ?? "Error al registrarse.");
    }
  }

  // Renders
  return (
    <div className="modal fade" id="registerModal" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <form
          onSubmit={handleSubmit(onSubmitRegister)}
          className="modal-content gap-4 bg-depth border border-secondary text-light rounded-0 p-4"
        >
          <div className="modal-header border-0 p-0">
            <h5 className="modal-title">Registrarse</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body d-flex flex-column gap-4 p-0">
            {/* @username */}
            <input
              type="text"
              className="form-control form-control-sm rounded-0"
              placeholder="Usuario"
              {...register("username")}
            />
            {/* @password */}
            <input
              type="password"
              className="form-control form-control-sm rounded-0"
              placeholder="Clave"
              {...register("password")}
            />
            {/* </>note */}
            <p className="mb-0 small fg-partial border border-secondary p-2">
              <span className="fg-primary">NOTA: </span>Recuerda guardar tu
              usuario y contraseña ya que si los pierdes no podras volver a
              recuperarla.
            </p>
          </div>
          <div className="modal-footer border-0 p-0">
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
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
