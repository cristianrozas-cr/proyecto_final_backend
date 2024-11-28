import { pool } from '../db/db.js';
import format from 'pg-format';

//Agregar imagenes a publicacion
const addImagenes = async (id_vendedor, data) => {
  console.log(data, id_vendedor)
  // Consulta SQL
  const query = `
      INSERT INTO imagenes (publicacion_id, id_vendedor, img1_portada, img2, img3, img4)
      values (%s, %s, '%s', '%s', '%s', '%s')
      RETURNING *;
    `;
  const values = [data.publicacion_id, id_vendedor, data.img1_portada, data.img2, data.img3, data.img4]
  const formattedQuery = format(query, ...values)
  console.log(formattedQuery)
  const { rows } = await pool.query(formattedQuery);
  console.log({ rows })
  // Retorna las imagenes agregadas
  return rows[0];

};

//Actualizar imagenes de publicacion
const updateImagenes = async ({ id_vendedor, publicacion_id, img1_portada, img2, img3, img4 }) => {
  console.log(publicacion_id)
  const query = `
        UPDATE imagenes SET img1_portada = '%s', img2 = '%s', img3 = '%s', img4 = '%s' 
        WHERE publicacion_id = %s AND id_vendedor = %s RETURNING *`;

  const values = [img1_portada, img2, img3, img4, publicacion_id, id_vendedor]
  const formattedQuery = format(query, ...values)
  console.log(formattedQuery)
  const { rows } = await pool.query(formattedQuery);
  console.log({ rows })
  // Retorna las imagenes actualizadas
  return rows[0];

}
3
//Actualiza imagenes con valor NULL excepto portada
const deleteImagenes = async ({ id_vendedor, publicacion_id, img }) => {
  const query = `UPDATE imagenes SET %s = NULL
  WHERE publicacion_id = %s AND id_vendedor = %s RETURNING *`;
  const values = [img, publicacion_id, id_vendedor]
  const formattedQuery = format(query, ...values)
  console.log(formattedQuery)
  const { rows } = await pool.query(formattedQuery);
  console.log({ rows })
  // Retorna la publicación
  return rows[0];
}
export const consultasImagenes = { addImagenes, updateImagenes, deleteImagenes }