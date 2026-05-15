// services/post.service.ts
import { postRepository as _repo } from "../repositories/post.repository";
import { PostStatus } from "../../generated/prisma/enums";
import { PostCreateDTO, PostSearchDTO, PostUpdateDTO } from "../dtos/post.dto";
import { tagRepository as _tagRepo } from "../repositories/tag.repository";
import { userRepository as _userRepo } from "../repositories/user.repository";

export const postService = {
  getPosts: async (query: PostSearchDTO) => {
    const { limit, page, status, title, tagId } = query;
    if (limit && ![5, 10, 20].includes(limit)) {
      throw new Error("Límite inválido.");
    }
    if (status && !Object.values(PostStatus).includes(status)) {
      throw new Error("Estado inválido.");
    }
    if (title && !/^[a-zA-Z0-9 -]+$/.test(title)) {
      throw new Error("Carácteres de busqueda inválidos.");
    }
    if (tagId) {
      const verifyTag = await _tagRepo.readOneById(tagId);
      if (!verifyTag) {
        throw new Error("Tág inválido.");
      }
    }

    const { counts, pagination, items } = await _repo.readAll(query);
    if (!counts || !pagination || !items) {
      throw new Error("Error al obtener las publicaciones solicitadas.");
    }

    return {
      success: true,
      message: "Publicaciones obtenidas correctamente.",
      data: { items, counts, pagination },
    };
  },
  getPostById: async (id: number) => {
    const item = await _repo.readOneById(id);
    if (!item) {
      throw new Error("No existe la publicación solicitada.");
    }

    return {
      success: true,
      message: "Publicación obtenida correctamente.",
      data: { item },
    };
  },
  postPost: async (userId: number, body: PostCreateDTO) => {
    const { content, tagId, title } = body;

    const verifyUser = await _userRepo.readOneById(userId);
    if (!verifyUser) {
      throw new Error("Usuario inexistente.");
    }

    const verifyTag = await _tagRepo.readOneById(tagId);
    if (!verifyTag) {
      throw new Error("Tag inexistente.");
    }

    if (title.length > 50) {
      throw new Error("El título no debe ser mayor a 50 carácteres.");
    }

    if (content.split(" ").length > 1000) {
      throw new Error("El contenido no debe ser mayor a 1000 carácteres.");
    }

    const item = await _repo.createOne({ ...body, userId: userId });
    if (!item) {
      throw new Error("Error al crear la publicación.");
    }

    return {
      success: true,
      message: "Publicación creada correctamente.",
      data: { item },
    };
  },
  putPost: async (postId: number, userId: number, body: PostUpdateDTO) => {
    const { content, status, tagId, title } = body;

    const authUser = await _userRepo.readOneById(userId);
    if (!authUser) {
      throw new Error("Usuario inexistente.");
    }

    const verifyPost = await _repo.readOneById(postId);
    if (!verifyPost) {
      throw new Error("Post inexistente.");
    }

    if (tagId) {
      const tag = await _tagRepo.readOneById(tagId);
      if (!tag) {
        throw new Error("Tag inexistente.");
      }
    }

    const isOwner = authUser.id === verifyPost.userId;
    const isStaff = ["admin", "mod"].includes(authUser.role);

    if (!isOwner && !isStaff) {
      throw new Error("No puedes actualizar esta publicación.");
    }
    if (title && title.length > 50) {
      throw new Error("El título no debe ser mayor a 50 carácteres.");
    }
    if (content && content.length > 1000) {
      throw new Error("El contenido no debe ser mayor a 1000 carácteres.");
    }
    if (isStaff && status) {
      if (!Object.values(PostStatus).includes(status)) {
        throw new Error("Estado inválido.");
      }
    }

    const item = await _repo.updateOne(postId, { ...body });
    if (!item) {
      throw new Error("Error al actualizar la publicación.");
    }

    return {
      success: true,
      message: "Publicación actualizada correctamente.",
      data: { item },
    };
  },
};
