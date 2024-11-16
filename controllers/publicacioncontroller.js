import { consultasPublicaciones } from "../consultas/consultasPublicaciones.js";
import { getDatabaseError } from "../errors/database.error.js";


// GET para mostrar galeria con publicaciones
const readGaleria = async (req, res) => {
    const { limit = 8, order = "ASC", page = 1 } = req.query;

    // Utilizar una expresión regular para verificar si 'page' es un número válido
    const isPageValid = /^[1-9]\d*$/.test(page);

    // Validar el resultado de la expresión regular
    if (!isPageValid) {
        return res.status(400).json({ message: "Invalid page number, number > 0" });
    }

    try {
        const publicaciones = await consultasPublicaciones.obtenerGaleria({ limit, order, page });
        return res.json(publicaciones);
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

const agregarPublicacion = async (req, res) => {
    try {
        const nuevaPublicacion = await consultasPublicaciones.agregarPublicacionDB(req.body);
        res.status(201).json({
            message: "Publicación agregada con éxito",
            publicacion: nuevaPublicacion,
        });
    } catch (error) {
        res.status(400).json({
            message: "No se pudo agregar la publicación",
            error: error.message,
        });
    }
};

export const publicacionController = { readGaleria, agregarPublicacion }