// services/user.service.ts
import { userRepository as _repo } from "../repositories/user.repository";
import {
  UserLoginDTO,
  UserRegisterDTO,
  UserSearchDTO,
  UserUpdateDTO,
} from "../dtos/user.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRole, UserStatus } from "../../generated/prisma/enums";

export const userService = {
  getUsers: async (query: UserSearchDTO) => {
    const { limit, page, role, status } = query;
    if (limit && ![5, 10, 20].includes(limit)) {
      throw new Error("Límite inválido.");
    }
    if (role && !Object.values(UserRole).includes(role)) {
      throw new Error("Rol inválido.");
    }
    if (status && !Object.values(UserStatus).includes(status)) {
      throw new Error("Estado inválido.");
    }

    const { counts, items, pagination } = await _repo.readAll(query);
    if (!counts || !items || !pagination) {
      throw new Error("Error al obtener a los usuarios.");
    }

    return {
      success: true,
      message: "Usuarios obtenidos correctamente.",
      data: { items, counts, pagination },
    };
  },
  getUserById: async (id: number) => {
    const item = await _repo.readOneById(id);

    return {
      success: true,
      message: "Usuario obtenido correctamente.",
      data: { item },
    };
  },
  getSelfUser: async (id: number) => {
    const item = await _repo.readOneById(id);

    return {
      success: true,
      message: "Usuario obtenido correctamente.",
      data: { item },
    };
  },
  putUser: async (id: number, body: UserUpdateDTO) => {
    const { password, role, status, username } = body;

    if (username) {
      const verify_username = await _repo.readOneByUsername(username);
      if (verify_username) {
        throw new Error("El nombre de usuario ya está en uso.");
      }
    }
    if (role) {
      if (!Object.values(UserRole).includes(role)) {
        throw new Error("Rol inválido.");
      }
    }
    if (status) {
      if (!Object.values(UserStatus).includes(status)) {
        throw new Error("Estado inválido.");
      }
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashed_password = await bcrypt.hash(password, salt);
      console.log("Actualizado la contraseña", hashed_password);
      const user = await _repo.updateOne(id, {
        ...body,
        password: hashed_password,
      });
      return {
        success: true,
        message: "Usuario modificado correctamente.",
        data: {
          user,
        },
      };
    }

    const item = await _repo.updateOne(id, body);
    if (!item) {
      throw new Error("No se pudo actualizar al usuario.");
    }

    return {
      success: true,
      message: "Usuario modificado correctamente.",
      data: { item },
    };
  },
  postUserRegister: async (body: UserRegisterDTO) => {
    const { username, password } = body;
    if ([password, username].some((f) => !f)) {
      throw new Error("Todos los campos son obligatorios");
    }

    const verify_user = await _repo.readOneByUsername(username);
    if (verify_user) {
      throw new Error("El nombre de usuario ya está en uso.");
    }

    // Agregar condicional que valide los estándares de seguridad modernos

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(password, salt);

    const item = await _repo.createOne({ ...body, password: hashed_password });
    if (!item) {
      throw new Error("No se pudo registrar al usuario.");
    }

    return {
      success: true,
      message: "Registro exitoso.",
      data: { item },
    };
  },
  postUserLogin: async (body: UserLoginDTO) => {
    const { password, username } = body;
    if ([password, username].some((f) => !f)) {
      throw new Error("Todos los campos son obligatorios");
    }

    const verify_user = await _repo.readOneByUsername(username);
    if (!verify_user) {
      throw new Error("No existe un usuario con ese nombre.");
    }
    if (verify_user.status == "suspended") {
      throw new Error("Usuario se encuentra suspendido.");
    }
    if (verify_user.status == "banned") {
      throw new Error("Usuario se encuentra baneado.");
    }

    const verify_password = await bcrypt.compare(
      password,
      verify_user.password,
    );
    if (!verify_password) {
      throw new Error("Contraseña inválida.");
    }

    const token = jwt.sign(
      {
        id: verify_user.id,
        role: verify_user.role,
        status: verify_user.status,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "8h",
        algorithm: "HS256",
      },
    );

    return {
      success: true,
      message: "Inicio de sesión exitoso.",
      data: {
        item: {
          id: verify_user.id,
          username: verify_user.username,
          role: verify_user.role,
          status: verify_user.status,
        },
        token,
      },
    };
  },
};
