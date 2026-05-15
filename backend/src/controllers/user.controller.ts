// controllers/user.controller.ts
import { userService as _serv } from "../services/user.service";
import { Request, Response } from "express";
import {
  UserLoginDTO,
  UserRegisterDTO,
  UserSearchDTO,
  UserUpdateDTO,
} from "../dtos/user.dto";
import { UserRole, UserStatus } from "../../generated/prisma/enums";
import { authRequest } from "../middlewares/auth.middleware";

export const userController = {
  async list(req: Request, res: Response) {
    try {
      const query: UserSearchDTO = {
        limit: req.query.limit ? Number(req.query.limit) : 5,
        page: req.query.page ? Number(req.query.page) : 1,
        status: req.query.status as UserStatus,
        role: req.query.role as UserRole,
      };
      const { data, message, success } = await _serv.getUsers(query);
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

      const { data, message, success } = await _serv.getUserById(id);

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
  async findSelf(req: authRequest, res: Response) {
    try {
      const id: number = Number(req.user?.id);

      const { data, message, success } = await _serv.getSelfUser(id);

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
      const body: UserUpdateDTO = req.body;

      const { data, message, success } = await _serv.putUser(id, body);

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
  async register(req: Request, res: Response) {
    try {
      const body: UserRegisterDTO = req.body;

      const { data, message, success } = await _serv.postUserRegister(body);

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
  async login(req: Request, res: Response) {
    try {
      const body: UserLoginDTO = req.body;

      const { data, message, success } = await _serv.postUserLogin(body);

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
