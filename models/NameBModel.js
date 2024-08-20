import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const NameBanco = db.define('ENTIDAD_BANCO', {
    ID_ENTIDAD_BANCO: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    NOMBRE_ENTIDAD_BANCO: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default NameBanco;
