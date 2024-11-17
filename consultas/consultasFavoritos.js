import { pool } from '../db/db.js';

const agregarFavorito = async ({ usuario_id, publicacion_id}) =>{
  try {
    if (!usuario_id || !publicacion_id){
      throw new Error(" todos los campos son obligatorios");
    }
    const query =`
      INSERT INTO favoritos values (DEFAULT, $1, $2)     
    `;
    const values = [usuario_id, publicacion_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch( error ) {
    console.error("error al agregar favoritos:", error.message);
    throw new Error("no se pudo agregar a favoritos")
  }
};

const obtenerFavoritos = async(usuario_id) => {
  try {
    if (!usuario_id) {
      throw new Error("falta id del usuario");
    }
    const query = `
      SELECT f.id AS favorito_id, f.publicacion_id, p.titulo, p.descripcion, p.precio, p.fecha_publicacion
      FROM favoritos f
      INNER JOIN publicaciones p ON f.publicacion_id = p.id
      WHERE f.usuario_id = $1
    `;
    const { rows } = await pool.query(query, [usuario_id]);
    return rows;
  } catch (error) {
    console.log("Error al obtener favoritos:", error.message);
    throw new Error("no se pudieron obtener favoritos");
  }
};

const eliminarFavorito = async ({ usuario_id, publicacion_id}) => {
  try{
    const query = `
    DELETE FROM favoritos
    WHERE usuario_id = $1 AND publicacion_id = $2
    RETURNING *
    `;
    const values = [usuario_id, publicacion_id];
    const {rowCount} = await pool.query(query, values);
    return rowCount > 0;
  } catch (error) {
    console.error("Error al eliminar de favoritos:", error.message);
    throw new Error("No se pudo eliminar la publicación de favoritos.");
  }
};




export const consultasFavoritos = {
  agregarFavorito,
  obtenerFavoritos,
  eliminarFavorito
}