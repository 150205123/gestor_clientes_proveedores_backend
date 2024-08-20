import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,

    buscar
} from "../controllers/EntidadController.js"; 

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const EntidadRouter = express.Router();

EntidadRouter.get('/entidad', verificarUsuarioLogeado, obtenerTodos);
EntidadRouter.get('/entidad/:id', verificarUsuarioLogeado, obtenerPorId);
EntidadRouter.post('/entidad', verificarUsuarioLogeado, crear);
EntidadRouter.patch('/entidad/:id', verificarUsuarioLogeado, actualizar);
EntidadRouter.delete('/entidad/:id', verificarUsuarioLogeado, eliminar);

EntidadRouter.post('/buscarEntidad', verificarUsuarioLogeado, buscar);

export default EntidadRouter;
