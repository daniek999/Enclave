// services/global.service.ts
import { globalRepository } from "../repositories/global.repository";

export function globalService() {
  const { readActiveStatistics } = globalRepository();

  const getGlobalActives = async () => {
    const { counts } = await readActiveStatistics();
    if (!counts) {
      throw new Error("Error al obtener datos globales.");
    }

    return {
      success: true,
      message: "Datos globales obtenidos correctamente.",
      data: { counts },
    };
  };

  return {
    getGlobalActives,
  };
}
