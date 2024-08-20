import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Usuario from "./UsuarioModel.js";

const { DataTypes } = Sequelize;

const Entidad = db.define('ENTIDAD', {
    ID_ENTIDAD: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    RAZON_SOCIAL: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    RUC: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            len: [11, 11]
        }
    },
    TIPO_ENTIDAD: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [[1, 2]]  
        }
    },
    ID_USUARIO: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario, 
            key: 'ID_USUARIO'  
        }
    }
}, {
    freezeTableName: true
});

Usuario.hasMany(Entidad, { foreignKey: 'ID_USUARIO' });  
Entidad.belongsTo(Usuario, { foreignKey: 'ID_USUARIO' });

export default Entidad;
