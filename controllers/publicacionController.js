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

//POST para agregar una nueva publicacion
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

//GET para mostrar una publicación en detalle
const detallePublicacion = async (req, res) => {
    try {
        const idPublicacion = req.params.id; // Extraer el parámetro `id` de req.params
        const publicacion = await consultasPublicaciones.detallePublicacionDB(idPublicacion);

        if (!publicacion) {
            // Si no se encontró la publicación, enviar un 404
            return res.status(404).json({ message: "Publicación no encontrada" });
        }

        // Si todo está bien, enviar la publicación como respuesta
        res.status(200).json(publicacion);
    } catch (error) {
        res.status(400).json({
            message: "Error al obtener la publicación",
            error: error.message,
        });
    }
}

//GET para obtener todas las publicaciones de un usuario
const publicacionesUsuarios = async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const publicaciones = await consultasPublicaciones.publicacionesUsuarioDB(idUsuario);

        if (!publicaciones || publicaciones.length === 0) {
            return res.status(404).json({ message: "No se encontraron publicaciones para este usuario" });
        }

        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(400).json({
            message: "Error al obtener las publicaciones",
            error: error.message,
        });
    }
}

//DELETE para eliminar una publicacion
const eliminarPublicacion = async (req, res) => {
    try {
        const idPublicacion = req.params.id;
        const publicacionEliminada = await consultasPublicaciones.eliminarPublicacionDB(idPublicacion);

        res.status(200).json({
            message: "Publicación eliminada con éxito",
            data: publicacionEliminada
        });
    } catch (error) {
        res.status(400).json({
            message: "Error al eliminar la publicación",
            error: error.message,
        });
    }
}

const filtroGaleria = async (req, res) => {
    const { limit = 8, order = "ASC", page = 1 } = req.query;
    const  categoria_id  = req.params.categoria_id
    console.log(categoria_id)

    // Utilizar una expresión regular para verificar si 'page' es un número válido
    const isPageValid = /^[1-9]\d*$/.test(page);

    // Validar el resultado de la expresión regular
    if (!isPageValid) {
        return res.status(400).json({ message: "Invalid page number, number > 0" });
    }

    try {
        const publicaciones = await consultasPublicaciones.filtrarGaleria({ limit, order, page, categoria_id });
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


export const publicacionController = { readGaleria, agregarPublicacion, detallePublicacion, publicacionesUsuarios, eliminarPublicacion, filtroGaleria }
