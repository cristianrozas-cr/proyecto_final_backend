import { consultasDirecciones } from "../consultas/constultasDpedidos.js";

export const agregarDireccion = async (req, res) => {
    try {
      const { usuario_id, pais, ciudad, calle, numero } = req.body;
        if (!usuario_id || !pais || !ciudad || !calle || !numero) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }
        const nuevaDireccion = await consultasDirecciones.agregarDireccion({ usuario_id, pais, ciudad, calle, numero });
      res.status(201).json({ message: "Dirección agregada con éxito", direccion: nuevaDireccion });
    } catch (error) {
      console.error("Error al agregar dirección:", error.message);
      res.status(500).json({ error: "No se pudo agregar la dirección" });
    }
  };


export const obtenerDireccion = async (req, res) => {
    try {
      const { usuario_id } = req.params;
  
      if (!usuario_id) {
        return res.status(400).json({ error: "Falta el ID del usuario" });
      }
      const direcciones = await consultasDirecciones.obtenerDirecciones(usuario_id);
      if (direcciones.length === 0) {
        return res.status(404).json({ message: "No se encontraron direcciones para este usuario" });
      }
      res.status(200).json(direcciones);
    } catch (error) {
      console.error("Error al obtener direcciones:", error.message);
      res.status(500).json({ error: "No se pudieron obtener las direcciones" });
    }
};


export const eliminarDireccion = async (req, res) => {
    try {
      const { usuario_id } = req.body;
      const { id } = req.params; 
  
      if (!usuario_id || !id) {
        return res.status(400).json({ error: "Faltan el ID del usuario o de la dirección" });
      }
      const direccionEliminada = await consultasDirecciones.eliminarDireccion(usuario_id, id);
  
      res.status(200).json({
        message: "Dirección eliminada con éxito",
        direccion: direccionEliminada
      });
    } catch (error) {
      console.error("Error al eliminar dirección:", error.message);
      res.status(500).json({ error: "No se pudo eliminar la dirección" });
    }
};