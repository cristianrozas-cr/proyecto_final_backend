import { pool } from '../db/db.js';
import format from 'pg-format';

// GET para mostrar categorias
const getCategorias = async (req, res) => {
    try {
        // Consulta directa a la base de datos
        const consulta = `SELECT * FROM categorias`;
        const { rows } = await pool.query(consulta);

        // Enviar las categorías obtenidas como respuesta
        return res.json(rows);
    } catch (error) {
        console.error("Error al obtener categorías:", error.message);

        // Manejo de errores de base de datos
        if (error.code) {

            return res.status(400).json({ message });
        }

        // Error genérico
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const categoriaController = { getCategorias } 