import NameBanco from "../models/NameBModel.js";

export const obtenerTodos = async (req, res) => {
    try {
        const response = await NameBanco.findAll({
            attributes: ['ID_ENTIDAD_BANCO', 'NOMBRE_ENTIDAD_BANCO']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const obtenerPorId = async (req, res) => {
    try {
        const response = await NameBanco.findOne({
            attributes: ['ID_ENTIDAD_BANCO', 'NOMBRE_ENTIDAD_BANCO'],
            where: {
                ID_ENTIDAD_BANCO: req.params.id
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Entidad Banco no encontrada" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const crear = async (req, res) => {
    const { NOMBRE_ENTIDAD_BANCO } = req.body;
    try {
        await NameBanco.create({
            NOMBRE_ENTIDAD_BANCO: NOMBRE_ENTIDAD_BANCO.trim()
        });
        res.status(201).json({ msg: "Entidad Banco creada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const actualizar = async (req, res) => {
    const entityBank = await NameBanco.findOne({
        where: {
            ID_ENTIDAD_BANCO: req.params.id
        }
    });
    if (!entityBank) {
        return res.status(404).json({ msg: "Entidad Banco no encontrada" });
    }
    const { NOMBRE_ENTIDAD_BANCO } = req.body;
    try {
        await NameBanco.update({
            NOMBRE_ENTIDAD_BANCO: NOMBRE_ENTIDAD_BANCO.trim()
        }, {
            where: {
                ID_ENTIDAD_BANCO: entityBank.ID_ENTIDAD_BANCO
            }
        });
        res.status(200).json({ msg: "Entidad Banco actualizada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const eliminar = async (req, res) => {
    const entityBank = await NameBanco.findOne({
        where: {
            ID_ENTIDAD_BANCO: req.params.id
        }
    });
    if (!entityBank) {
        return res.status(404).json({ msg: "Entidad Banco no encontrada" });
    }
    try {
        await NameBanco.destroy({
            where: {
                ID_ENTIDAD_BANCO: entityBank.ID_ENTIDAD_BANCO
            }
        });
        res.status(200).json({ msg: "Entidad Banco eliminada" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
