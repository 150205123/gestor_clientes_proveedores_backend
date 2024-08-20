import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,

    buscar
} from "../controllers/BancoController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const BancoRouter = express.Router();

BancoRouter.get('/banco',verificarUsuarioLogeado,obtenerTodos);
BancoRouter.get('/banco/:id',verificarUsuarioLogeado, obtenerPorId);
BancoRouter.post('/banco', crear);
BancoRouter.patch('/banco/:id',verificarUsuarioLogeado, actualizar);
BancoRouter.delete('/banco/:id',verificarUsuarioLogeado, eliminar);

BancoRouter.post('/buscarBanco', verificarUsuarioLogeado, buscar);

export default BancoRouter;