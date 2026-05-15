// controllers/post.controller.ts
import { postService as _serv } from "../services/post.service";
import { Request, Response } from "express";
import { PostCreateDTO, PostSearchDTO, PostUpdateDTO } from "../dtos/post.dto";
import { PostStatus } from "../../generated/prisma/enums";
import { authRequest } from "../middlewares/auth.middleware";

export const postController = {
  async list(req: Request, res: Response) {
    try {
      const query: PostSearchDTO = {
        limit: req.query.limit ? Number(req.query.limit) : 5,
        page: req.query.page ? Number(req.query.page) : 1,
        status: req.query.status as PostStatus,
        title: req.query.title ? String(req.query.title) : undefined,
        tagId: req.query.tagId ? Number(req.query.tagId) : undefined,
      };
      const { data, message, success } = await _serv.getPosts(query);
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
      const { data, message, success } = await _serv.getPostById(id);
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
      const body: PostCreateDTO = {
        content: String(req.body.content),
        tagId: Number(req.body.tagId),
        title: String(req.body.title),
        userId: userId,
      };
      const { data, message, success } = await _serv.postPost(userId, body);
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
      const body: PostUpdateDTO = req.body;
      const { data, message, success } = await _serv.putPost(id, userId, body);
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
