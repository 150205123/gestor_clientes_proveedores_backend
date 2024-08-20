import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
} from "../controllers/NameBController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const NameBancoRouter = express.Router();

NameBancoRouter.get('/nameBanco', obtenerTodos);
NameBancoRouter.get('/nameBanco/:id', verificarUsuarioLogeado, adminPermiso, obtenerPorId);
NameBancoRouter.post('/nameBanco', crear);
NameBancoRouter.patch('/nameBanco/:id', verificarUsuarioLogeado, adminPermiso, actualizar);
NameBancoRouter.delete('/nameBanco/:id', verificarUsuarioLogeado, adminPermiso, eliminar);

export default NameBancoRouter;
