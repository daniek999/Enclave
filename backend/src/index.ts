import "dotenv/config";
import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.route";
import { postRouter } from "./routes/post.route";
import { tagRouter } from "./routes/tag.route";
import { commentRouter } from "./routes/comment.route";

// [1] - Config
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// [2] - Endpoints
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/tags", tagRouter);
app.use("/api/comments", commentRouter);

// [3] - Server
app.listen(process.env.PORT, () => {
  console.log(
    `# Servidor - APP04 #\n\n> Puerto  : ${process.env.PORT}\n> URL\t  : ${process.env.BACKEND_URL}`,
  );
});

// [4] - Tareas
/**
 * [!] - Manejar los usuarios puedan gestionar sus posts y comentarios (menos status, createdAt y updatedAt), pero
 * solo los admins y mods pueden cambiar el estado.
 */
