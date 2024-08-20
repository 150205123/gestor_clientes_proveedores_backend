import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Entidad from "./EntidadModel.js";
import NameBanco from "./NameBModel.js";

const { DataTypes } = Sequelize;

const Banco = db.define('BANCO', {
    ID_BANCO: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    TIPO_CUENTA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2]]
        }
    },
    NUMERO_CUENTA: {
        type: DataTypes.STRING(22),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    ID_ENTIDAD: {  
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Entidad, 
            key: 'ID_ENTIDAD'  
        }
    },
    ID_ENTIDAD_BANCO: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: NameBanco, 
            key: 'ID_ENTIDAD_BANCO'
        }
    }
}, {
    freezeTableName: true
});

Entidad.hasMany(Banco, { foreignKey: 'ID_ENTIDAD' });  
Banco.belongsTo(Entidad, { foreignKey: 'ID_ENTIDAD' });

NameBanco.hasMany(Banco, { foreignKey: 'ID_ENTIDAD_BANCO' });  
Banco.belongsTo(NameBanco, { foreignKey: 'ID_ENTIDAD_BANCO' });

export default Banco;
