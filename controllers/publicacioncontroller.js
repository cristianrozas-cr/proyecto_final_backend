import { consultasPublicaciones } from "../consultas/consultasPublicaciones.js";

const readGaleria = async (req, res) => {
    const { limit = 8, order = "ASC", page = 1 } = req.query;

    // Utilizar una expresión regular para verificar si 'page' es un número válido
    const isPageValid = /^[1-9]\d*$/.test(page);

    // Validar el resultado de la expresión regular
    if (!isPageValid) {
        return res.status(400).json({ message: "Invalid page number, number > 0" });
    }

    // try {
        const publicaciones = await consultasPublicaciones.obtenerGaleria({ limit, order, page });
        return res.json(publicaciones);
    // } catch (error) {
    //     console.log(error);
    //     if (error.code) {
    //         const { code, message } = getDatabaseError(error.code);
    //         return res.status(code).json({ message });
    //     }
    //     return res.status(500).json({ message: "Internal server error" });
    // }
};

const leerGaleria = async (req, res) => {
    const { limit = 8, order = "ASC", page = 1 } = req.query;

    // Utilizar una expresión regular para verificar si 'page' es un número válido
    const isPageValid = /^[1-9]\d*$/.test(page);

    // Validar el resultado de la expresión regular
    if (!isPageValid) {
        return res.status(400).json({ message: "Invalid page number, number > 0" });
    }

    try {
        const publicaciones = await consultasPublicaciones.obtenerGaleria({ limit, order, page });
        return res.json(todos);
    } catch (error) {
        console.log(error);
        if (error.code) {
            const { code, message } = getDatabaseError(error.code);
            return res.status(code).json({ message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const publicacionController = { readGaleria, leerGaleria }