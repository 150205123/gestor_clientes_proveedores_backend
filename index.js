import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import insertInitialData from "./models/insertInitialData.js";

import RolRouter from "./routers/RolRouter.js";
import UsuarioRouter from "./routers/UsuarioRouter.js";
import AuthRouter from "./routers/AuthRouter.js";
import EntidadRouter from "./routers/EntidadRouter.js";
import BancoRouter from "./routers/BancoRouter.js";
import NameBancoRouter from "./routers/NameBRouter.js";

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({ db: db });

(async () => {
    try {
        await db.sync(); // Sincroniza los modelos con la base de datos
        await insertInitialData(); 
        console.log("Base de datos sincronizada y datos iniciales insertados.");
    } catch (error) {
        console.error("Error durante la sincronización de la base de datos:", error);
    }
})();


app.use(session(               
    {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: store,
        cookie: {
            secure: 'auto', //Si se usa http automaticamente será false, si es https será true
        }
    }
));

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000'
    }
));


app.use(express.json());
app.use(RolRouter);
app.use(UsuarioRouter);
app.use(AuthRouter);           
app.use(EntidadRouter);
app.use(BancoRouter);              
app.use(NameBancoRouter);

store.sync(); //creando tabla sessions para almacenar las sesiones en la db y no perderlas al reiniciar servidor

app.listen(process.env.APP_PORT, () => {
    console.log("server corriendo")
});

