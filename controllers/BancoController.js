import Banco from "../models/BancoModel.js";
import Entidad from "../models/EntidadModel.js";
import NameBanco from "../models/NameBModel.js";
import { Op } from "sequelize";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await Banco.findAll({
            attributes: ['ID_BANCO', 'TIPO_CUENTA', 'NUMERO_CUENTA', 'ID_ENTIDAD', 'ID_ENTIDAD_BANCO'],
            include: [
                {
                    model: Entidad,
                    attributes: ['ID_ENTIDAD', 'RAZON_SOCIAL', 'TIPO_ENTIDAD','RUC']
                },
                {
                    model: NameBanco,
                    attributes: ['ID_ENTIDAD_BANCO', 'NOMBRE_ENTIDAD_BANCO']
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
        const response = await Banco.findOne({
            attributes: ['ID_BANCO', 'TIPO_CUENTA', 'NUMERO_CUENTA', 'ID_ENTIDAD', 'ID_ENTIDAD_BANCO'],
            where: {
                ID_BANCO: req.params.id
            },
            include: [
                {
                    model: Entidad,
                    attributes: ['ID_ENTIDAD', 'RAZON_SOCIAL', 'TIPO_ENTIDAD','RUC']
                },
                {
                    model: NameBanco,
                    attributes: ['ID_ENTIDAD_BANCO', 'NOMBRE_ENTIDAD_BANCO']
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const buscar = async (req, res) => {
    try {
        const { searchText } = req.body;
        const response = await Banco.findAll({
            attributes: ['ID_BANCO', 'TIPO_CUENTA', 'NUMERO_CUENTA', 'ID_ENTIDAD', 'ID_ENTIDAD_BANCO'],
            include: [
                {
                    model: Entidad,
                    attributes: ['ID_ENTIDAD', 'RAZON_SOCIAL', 'RUC','TIPO_ENTIDAD'],
                    where: {
                        [Op.or]: [
                            { RAZON_SOCIAL: { [Op.like]: `%${searchText}%` } },
                            { RUC: { [Op.like]: `%${searchText}%` } }
                        ]
                    },
                    
                },
                {
                    model: NameBanco,
                    attributes: ['ID_ENTIDAD_BANCO', 'NOMBRE_ENTIDAD_BANCO'],
                    
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { TIPO_CUENTA, NUMERO_CUENTA, ID_ENTIDAD, ID_ENTIDAD_BANCO } = req.body;
    try {
        await Banco.create({
            TIPO_CUENTA: TIPO_CUENTA,
            NUMERO_CUENTA: NUMERO_CUENTA,
            ID_ENTIDAD: ID_ENTIDAD || null,
            ID_ENTIDAD_BANCO: ID_ENTIDAD_BANCO || null
        });
        res.status(201).json({ msg: "Banco creado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const actualizar = async (req, res) => {
    const banco = await Banco.findOne({
        where: {
            ID_BANCO: req.params.id
        }
    });
    if (!banco) {
        return res.status(404).json({ msg: "Banco no encontrado" });
    }
    const { TIPO_CUENTA, NUMERO_CUENTA, ID_ENTIDAD, ID_ENTIDAD_BANCO } = req.body;
    try {
        await Banco.update({
            TIPO_CUENTA: TIPO_CUENTA,
            NUMERO_CUENTA: NUMERO_CUENTA,
            ID_ENTIDAD: ID_ENTIDAD || null,
            ID_ENTIDAD_BANCO: ID_ENTIDAD_BANCO || null
        }, {
            where: {
                ID_BANCO: banco.ID_BANCO
            }
        });
        res.status(200).json({ msg: "Banco actualizado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const eliminar = async (req, res) => {
    const banco = await Banco.findOne({
        where: {
            ID_BANCO: req.params.id
        }
    });
    if (!banco) {
        return res.status(404).json({ msg: "Banco no encontrado" });
    }   
    
    try {
        await Banco.destroy({
            where: {
                ID_BANCO: banco.ID_BANCO
            }
        });
    
        res.status(200).json({ msg: "Banco eliminado" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
