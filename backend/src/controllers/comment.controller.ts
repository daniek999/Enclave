// controllers/comment.controller.ts
import { commentService as _serv } from "../services/comment.service";
import { Request, Response } from "express";
import { PostCreateDTO, PostSearchDTO, PostUpdateDTO } from "../dtos/post.dto";
import { CommentStatus, PostStatus } from "../../generated/prisma/enums";
import { authRequest } from "../middlewares/auth.middleware";
import {
  CommentCreateDTO,
  CommentSearchDTO,
  CommentUpdateDTO,
} from "../dtos/comment.dto";

export const commentController = {
  async list(req: Request, res: Response) {
    try {
      const postId: number = Number(req.params.id);
      const query: CommentSearchDTO = {
        limit: req.query.limit ? Number(req.query.limit) : 5,
        page: req.query.page ? Number(req.query.page) : 1,
        status: req.query.status as CommentStatus,
      };
      const { data, message, success } = await _serv.getComments(postId, query);
      return res.status(200).json({
        success,
        message,
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message ?? "Error del servidor",
        data: null,
      });
    }
  },
  async findById(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const { data, message, success } = await _serv.getCommentById(id);
      return res.status(200).json({
        success,
        message,
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message ?? "Error del servidor",
        data: null,
      });
    }
  },
  async insert(req: authRequest, res: Response) {
    try {
      const userId: number = Number(req.user?.id);
      const body: CommentCreateDTO = req.body;
      const { data, message, success } = await _serv.postComment(userId, body);
      return res.status(200).json({
        success,
        message,
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message ?? "Error del servidor",
        data: null,
      });
    }
  },
  async modify(req: authRequest, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const userId: number = Number(req.user?.id);
      const body: CommentUpdateDTO = req.body;
      const { data, message, success } = await _serv.putComment(
        id,
        userId,
        body,
      );
      return res.status(200).json({
        success,
        message,
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message ?? "Error del servidor",
        data: null,
      });
    }
  },
};
