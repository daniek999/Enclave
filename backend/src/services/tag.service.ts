// services/tag.service.ts
import { tagRepository as _repo } from "../repositories/tag.repository";
import { TagStatus } from "../../generated/prisma/enums";
import { TagCreateDTO, TagSearchDTO, TagUpdateDTO } from "../dtos/tag.dto";

export const tagService = {
  getTags: async (query: TagSearchDTO) => {
    const { limit, page, status } = query;
    if (limit && ![5, 10, 20].includes(limit)) {
      throw new Error("Límite inválido.");
    }
    if (status && !Object.values(TagStatus).includes(status)) {
      throw new Error("Estado inválido.");
    }

    const { counts, pagination, items } = await _repo.readAll(query);
    if (!counts || !pagination || !items) {
      throw new Error("Error al obtener los tags solicitados.");
    }

    return {
      success: true,
      message: "Tags obtenidos correctamente.",
      data: { counts, pagination, items },
    };
  },
  getTagById: async (id: number) => {
    const item = await _repo.readOneById(id);
    if (!item) {
      throw new Error("Error al obtener el tag solicitado.");
    }

    return {
      success: true,
      message: "Tag obtenido correctamente.",
      data: { item },
    };
  },
  postTag: async (body: TagCreateDTO) => {
    const { name } = body;

    if (!name) {
      throw new Error("Todos los campos son obligatorios.");
    }
    if (name.length > 20) {
      throw new Error("El nombre del tag no debe ser mayor a 20 carácteres.");
    }

    const item = await _repo.createOne(body);
    if (!item) {
      throw new Error("Error al crear el tag.");
    }

    return {
      success: true,
      message: "Tag creado correctamente.",
      data: { item },
    };
  },
  putTag: async (id: number, body: TagUpdateDTO) => {
    const { name, status } = body;

    const existsTag = await _repo.readOneById(id);
    if (!existsTag) {
      throw new Error("Tag inexistente.");
    }

    if (name && name.length > 20) {
      throw new Error("El nombre del tag no debe ser mayor a 20 carácteres.");
    }

    if (status && !Object.values(TagStatus).includes(status)) {
      throw new Error("Estado inválido.");
    }

    const item = await _repo.updateOne(id, body);
    if (!item) {
      throw new Error("Error al actualizar el tag.");
    }

    return {
      success: true,
      message: "Tag actualizado correctamente.",
      data: { item },
    };
  },
};
