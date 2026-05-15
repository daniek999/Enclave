// services/comment.service.ts
import { commentRepository as _repo } from "../repositories/comment.repository";
import { postRepository as _postRepo } from "../repositories/post.repository";
import { userRepository as _userRepo } from "../repositories/user.repository";
import {
  CommentCreateDTO,
  CommentSearchDTO,
  CommentUpdateDTO,
} from "../dtos/comment.dto";
import { CommentStatus } from "../../generated/prisma/enums";

export const commentService = {
  getComments: async (postId: number, query: CommentSearchDTO) => {
    const existingPost = await _postRepo.readOneById(postId);
    if (!existingPost) {
      throw new Error("Post inexistente.");
    }

    const { limit, page, status } = query;
    if (limit && ![5, 10, 20].includes(limit)) {
      throw new Error("Límite inválido.");
    }
    if (status && !Object.values(CommentStatus).includes(status)) {
      throw new Error("Estado inválido.");
    }

    const { items, counts, pagination } = await _repo.readAllByPost(
      postId,
      query,
    );
    if (!items || !counts || !pagination) {
      throw new Error("Error al obtener los comentarios del post.");
    }

    return {
      success: true,
      message: "Comentarios obtenidos correctamente.",
      data: { items, counts, pagination },
    };
  },
  getCommentById: async (id: number) => {
    const item = await _repo.readOneById(id);
    if (!item) {
      throw new Error("Error al obtener el comentario.");
    }

    return {
      success: true,
      message: "Comentario obtenido correctamente.",
      data: { item },
    };
  },
  postComment: async (userId: number, body: CommentCreateDTO) => {
    const { content, postId } = body;

    const verifyUser = await _userRepo.readOneById(userId);
    if (!verifyUser) {
      throw new Error("Usuario inexistente.");
    }

    const verifyPost = await _postRepo.readOneById(postId);
    if (!verifyPost) {
      throw new Error("Publicación inexistente.");
    }

    if (content.length > 200) {
      throw new Error("El contenido no debe ser mayor a 200 carácteres.");
    }

    const item = await _repo.createOne({ ...body, userId: userId });
    if (!item) {
      throw new Error("Error al crear el comentario.");
    }

    return {
      success: true,
      message: "Comentario creado correctamente.",
      data: { item },
    };
  },
  putComment: async (
    commentId: number,
    userId: number,
    body: CommentUpdateDTO,
  ) => {
    const { content, postId, status } = body;

    const authUser = await _userRepo.readOneById(userId);
    if (!authUser) {
      throw new Error("Usuario inexistente.");
    }

    const verifyComment = await _repo.readOneById(commentId);
    if (!verifyComment) {
      throw new Error("Comentario inexistente.");
    }

    if (postId) {
      const post = await _postRepo.readOneById(postId);
      if (!post) {
        throw new Error("Publicación inexistente.");
      }
    }

    const isOwner = authUser.id === verifyComment.userId;
    const isStaff = ["admin", "mod"].includes(authUser.role);

    if (!isOwner && !isStaff) {
      throw new Error("No puedes actualizar esta publicación.");
    }
    if (content && content.length > 1000) {
      throw new Error("El contenido no debe ser mayor a 1000 carácteres.");
    }

    if (isStaff && status) {
      if (!Object.values(CommentStatus).includes(status)) {
        throw new Error("Estado inválido.");
      }
    }

    const item = await _repo.updateOne(commentId, body);
    if (!item) {
      throw new Error("Error al actualizar el comentario.");
    }

    return {
      success: true,
      message: "Comentario actualizado correctamente.",
      data: { item },
    };
  },
};
