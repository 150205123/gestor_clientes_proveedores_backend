import { Sequelize } from "sequelize";

const db = new Sequelize('VVDB','root','Coral1502',
    {
        host: "localhost",
        dialect: "mysql"
    }
);

export default db;