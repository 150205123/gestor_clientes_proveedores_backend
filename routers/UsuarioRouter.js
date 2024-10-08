import express from "express";
import {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,

    buscar
} from "../controllers/UsuarioController.js";

import { verificarUsuarioLogeado, adminPermiso } from "../middleware/AuthUser.js";

const UsuarioRouter = express.Router();

UsuarioRouter.get('/usuario',verificarUsuarioLogeado,adminPermiso,obtenerTodos);
UsuarioRouter.get('/usuario/:id',verificarUsuarioLogeado,adminPermiso, obtenerPorId);
UsuarioRouter.post('/usuario', crear);
UsuarioRouter.patch('/usuario/:id',verificarUsuarioLogeado,adminPermiso, actualizar);
UsuarioRouter.delete('/usuario/:id',verificarUsuarioLogeado,adminPermiso, eliminar);

UsuarioRouter.post('/buscarUsuario', verificarUsuarioLogeado, adminPermiso, buscar);

export default UsuarioRouter;