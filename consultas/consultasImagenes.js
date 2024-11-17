import { pool } from '../db/db.js';
import format from 'pg-format';

//Agregar imagenes a publicacion
const addImagenes = async ({ publicacion_id, img1_portada, img2, img3, img4 }) => {

  // Consulta SQL
  const query = `
      INSERT INTO imagenes values (default, %s, '%s', '%s', '%s', '%s')
      RETURNING *;
    `;
  const values = [publicacion_id, img1_portada, img2, img3, img4]
  const formattedQuery = format(query, ...values)
  const { rows } = await pool.query(formattedQuery);
  console.log({ rows })
  // Retorna las imagenes agregadas
  return rows[0];

};

//Actualizar imagenes de publicacion
const updateImagenes = async ({ publicacion_id, img1_portada, img2, img3, img4 }) => {
  console.log(publicacion_id)
  const query = `
        UPDATE imagenes SET img1_portada = '%s', img2 = '%s', img3 = '%s', img4 = '%s' 
        WHERE publicacion_id = %s RETURNING *`;

  const values = [img1_portada, img2, img3, img4, publicacion_id]
  const formattedQuery = format(query, ...values)
  console.log(formattedQuery)
  const { rows } = await pool.query(formattedQuery);
  console.log({ rows })
 // Retorna las imagenes actualizadas
  return rows[0];

}

//Actualiza imagenes con valor NULL excepto portada
const deleteImagenes = async ({ publicacion_id, img }) => {
  const query = `UPDATE imagenes SET %s = NULL
  WHERE publicacion_id = %s RETURNING *`;
  const values = [img, publicacion_id]
  const formattedQuery = format(query, ...values)
  console.log(formattedQuery)
  const { rows } = await pool.query(formattedQuery);
  console.log({ rows })
  // Retorna la publicación
  return rows[0];
}
export const consultasImagenes = { addImagenes, updateImagenes, deleteImagenes }