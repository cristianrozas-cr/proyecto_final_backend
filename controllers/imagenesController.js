import { consultasImagenes } from "../consultas/consultasImagenes.js";



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

const agregarImagenes = async (req, res) => {
    try {

        const nuevaImagen = await consultasImagenes.addImagenes(req.body);
        res.status(201).json({
            message: "Imágenes agregadas con éxito",
            publicacion: nuevaImagen,
        });
    } catch (error) {
        res.status(400).json({
            message: "No se pudieron agregar imágenes",
            error: error.message,
        });
    }
};

const actualizarImagenes = async (req, res) => {
    try {
        const publicacion_id = req.params.id;
        const { img1_portada, img2, img3, img4 } = req.body;

        console.log(publicacion_id)

        const nuevasImagenes = await consultasImagenes.updateImagenes({ publicacion_id, img1_portada, img2, img3, img4 })
        res.status(201).json({
            message: "Imágenes actualizadas correctamente",
            publicacion: nuevasImagenes,
        });
    } catch (error) {
        res.status(400).json({
            message: "No se pudieron actualizar las imágenes",
            error: error.message,
        });
    }

}

const borrarImagenes = async (req, res) => {
    try {
        const publicacion_id = req.params.id;
        const { img } = req.body // seleccionar columna a editar desde el front
        console.log(publicacion_id, img)
        const imagenEliminada = await consultasImagenes.deleteImagenes({ publicacion_id, img })
        res.status(201).json({
            message: "Imágenes actualizadas correctamente",
            publicacion: imagenEliminada,
        });
    } catch (error) {
        res.status(400).json({
            message: "No se pudieron actualizar las imágenes",
            error: error.message,
        });
    }
}
export const imagenesController = { agregarImagenes, actualizarImagenes, borrarImagenes }