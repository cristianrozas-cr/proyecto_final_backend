import { consultasFavoritos } from '../consultas/consultasFavoritos.js';

const agregarFavorito = async (req, res) => {
  try {
    const favorito = await consultasFavoritos.agregarFavorito(req.body);
    res.status(201).json(favorito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const obtenerFavoritos = async (req, res) => {
  try {
    const { usuario_id } = req.params; // Obtén el ID del usuario de los parámetros de la ruta
    if (!usuario_id) {
      return res.status(400).json({ error: "Falta el ID del usuario" });
    }

    const favoritos = await consultasFavoritos.obtenerFavoritos(usuario_id); // Llama a la función de consultas

    res.status(200).json(favoritos); // Devuelve los resultados en formato JSON
  } catch (error) {
    console.error("Error al obtener favoritos:", error.message);
    res.status(500).json({ error: "No se pudieron obtener los favoritos" });
  }
};



const eliminarFavorito = async (req, res) => {
  try {
    const eliminado = await consultasFavoritos.eliminarFavorito(req.body.id);

    if (!eliminado) {
      return res.status(404).json({ message: "La publicación no está en favoritos." });
    }

    res.status(200).json({ message: "Publicación eliminada de favoritos con éxito" });
  } catch (error) {
    res.status(error.code || 500).json({ error: error.message });
  }
};

export const favoritoController = { agregarFavorito, obtenerFavoritos, eliminarFavorito }
