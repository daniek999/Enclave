// controllers/tag.controller.ts
import { tagService as _serv } from "../services/tag.service";
import { Request, Response } from "express";
import { TagCreateDTO, TagSearchDTO, TagUpdateDTO } from "../dtos/tag.dto";
import { TagStatus } from "../../generated/prisma/enums";

export const tagController = {
  async list(req: Request, res: Response) {
    try {
      const query: TagSearchDTO = {
        limit: req.query.limit ? Number(req.query.limit) : 5,
        page: req.query.page ? Number(req.query.page) : 1,
        status: req.query.status as TagStatus,
      };
      const { data, message, success } = await _serv.getTags(query);
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
      const { data, message, success } = await _serv.getTagById(id);
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
  async insert(req: Request, res: Response) {
    try {
      const body: TagCreateDTO = req.body;
      const { data, message, success } = await _serv.postTag(body);
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
  async modify(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const body: TagUpdateDTO = req.body;
      const { data, message, success } = await _serv.putTag(id, body);
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
