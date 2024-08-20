import Entidad from "../models/EntidadModel.js";
import Banco from "../models/BancoModel.js";
import Usuario from "../models/UsuarioModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Entidad.findAll({
            attributes: ['ID_ENTIDAD', 'RAZON_SOCIAL', 'RUC', 'TIPO_ENTIDAD', 'ID_USUARIO'],
            include: [
                {
                    model: Banco,
                    attributes: ['TIPO_CUENTA', 'NUMERO_CUENTA']
                },
                {
                    model: Usuario,
                    attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'EMAIL']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const obtenerPorId = async (req, res) => {
    try {
        const response = await Entidad.findOne({
            attributes: ['ID_ENTIDAD', 'RAZON_SOCIAL', 'RUC', 'TIPO_ENTIDAD', 'ID_USUARIO'],
            where: {
                ID_ENTIDAD: req.params.id
            },
            include: [
                {
                    model: Banco,
                    attributes: ['TIPO_CUENTA', 'NUMERO_CUENTA']
                },
                {
                    model: Usuario,
                    attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'EMAIL']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const buscar = async (req, res) => {
    const { searchText } = req.body;  
    try {
        const response = await Entidad.findAll({
            attributes: ['ID_ENTIDAD', 'RAZON_SOCIAL', 'RUC', 'TIPO_ENTIDAD', 'ID_USUARIO'],
            include: [
                {
                    model: Banco,
                    attributes: ['TIPO_CUENTA', 'NUMERO_CUENTA']
                },
                {
                    model: Usuario,
                    attributes: ['NOMBRE_USUARIO', 'APELLIDO_USUARIO', 'EMAIL']
                }
            ],
            where: {
                [Op.or]: [
                    { RAZON_SOCIAL: { [Op.like]: `%${searchText}%` } },
                    { RUC: { [Op.like]: `%${searchText}%` } }
                ]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { RAZON_SOCIAL, RUC, TIPO_ENTIDAD, ID_USUARIO } = req.body;
    try {
        await Entidad.create({
            RAZON_SOCIAL: RAZON_SOCIAL,
            RUC: RUC,
            TIPO_ENTIDAD: TIPO_ENTIDAD,
            ID_USUARIO: ID_USUARIO
        });
        res.status(201).json({ msg: "Entidad creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const actualizar = async (req, res) => {
    const entidad = await Entidad.findOne({
        where: {
            ID_ENTIDAD: req.params.id
        }
    });
    if (!entidad) {
        return res.status(404).json({ msg: "Entidad no encontrada" });
    }
    const { RAZON_SOCIAL, RUC, TIPO_ENTIDAD, ID_USUARIO } = req.body;
    try {
        await Entidad.update({
            RAZON_SOCIAL: RAZON_SOCIAL,
            RUC: RUC,
            TIPO_ENTIDAD: TIPO_ENTIDAD,
            ID_USUARIO: ID_USUARIO
        }, {
            where: {
                ID_ENTIDAD: entidad.ID_ENTIDAD
            }
        });
        res.status(200).json({ msg: "Entidad actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const eliminar = async (req, res) => {
    const entidad = await Entidad.findOne({
        where: {
            ID_ENTIDAD: req.params.id
        }
    });
    if (!entidad) {
        return res.status(404).json({ msg: "Entidad no encontrada" });
    }
    try {
        await Entidad.destroy({
            where: {
                ID_ENTIDAD: entidad.ID_ENTIDAD
            }
        });
        res.status(200).json({ msg: "Entidad eliminada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
