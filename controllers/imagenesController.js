import { consultasImagenes } from "../consultas/consultasImagenes.js";

// Agregar imagenes
const agregarImagenes = async (req, res) => {
    const id_vendedor = req.user.id
    const { publicacion_id, img1_portada, img2, img3, img4 } = req.body
    try {

        const nuevaImagen = await consultasImagenes.addImagenes({ id_vendedor, publicacion_id, img1_portada, img2, img3, img4 });
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

// Actualizar imagenes
const actualizarImagenes = async (req, res) => {
    try {
        const id_vendedor = req.user.id
        const publicacion_id = req.params.id;
        const { img1_portada, img2, img3, img4 } = req.body;

        console.log(publicacion_id)

        const nuevasImagenes = await consultasImagenes.updateImagenes({ id_vendedor, publicacion_id, img1_portada, img2, img3, img4 })
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

// Asignar valor NULL a imagenes
const borrarImagenes = async (req, res) => {
    try {
        const id_vendedor = req.user.id
        const publicacion_id = req.params.id;
        const { img } = req.body // seleccionar columna a editar desde el front
        const imagenEliminada = await consultasImagenes.deleteImagenes({ id_vendedor, publicacion_id, img })
        res.status(201).json({
            message: "Imágenes eliminadas correctamente",
            publicacion: imagenEliminada,
        });
    } catch (error) {
        res.status(400).json({
            message: "No se pudieron eliminar las imágenes",
            error: error.message,
        });
    }
}
export const imagenesController = { agregarImagenes, actualizarImagenes, borrarImagenes }