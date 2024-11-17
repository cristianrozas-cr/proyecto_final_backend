import { pool } from '../db/db.js';
import format from 'pg-format';

//Agregar un comentario a una publicacion
const addPost = async ({ publicacion_id, usuario_id, texto }) => {
  console.log({ publicacion_id, usuario_id, texto })
  // Consulta SQL
  const query = `
    INSERT INTO posts (publicacion_id, usuario_id, texto)
      VALUES (%s, %s, '%s')
      RETURNING *;
          `;
  const values = [publicacion_id, usuario_id, texto]
  const formattedQuery = format(query, ...values)
  const { rows } = await pool.query(formattedQuery);
  console.log({ rows })
  // Retorna el comentario
  return rows[0];

};

//Selecciona los posts asociados a la ID de la publicacion
const readPost = async ({ publicacion_id }) => {
  console.log(publicacion_id)
  const query = `
  SELECT
    p.id AS post_id,
    p.publicacion_id,
    p.usuario_id,
    p.fecha_post,
    p.texto,
    u.nombre,
    u.apellido
  FROM 
        posts p 
    LEFT JOIN 
        usuarios u
  ON
  p.usuario_id = u.id
  WHERE publicacion_id = %s;`
    ;

  const values = [publicacion_id]
  const formattedQuery = format(query, values)
  console.log(formattedQuery)
  const { rows } = await pool.query(formattedQuery);
  console.log({ rows })
  // Retorna los posts
  return rows;

}

// Borrar el post del usuario acorde al TOKEN autorizado vigente
const deletePost = async ({ post_id, publicacion_id, usuario_id }) => {
  const query = `DELETE FROM posts WHERE id = %s AND publicacion_id = %s AND usuario_id = %s RETURNING * `;
  const values = [post_id, publicacion_id, usuario_id]
  const formattedQuery = format(query, ...values)
  console.log(formattedQuery)
  const { rows } = await pool.query(formattedQuery);
  console.log({ rows })
  // Retorna el post eliminado
  return rows[0];
}

// Verifica si existe un post que cumpla con los requisitos de ID, PUBLICACION_ID y USUARIO_ID
const comprobarPost = async ({ post_id, publicacion_id, usuario_id }) => {
  const query = `SELECT * FROM posts WHERE id = %s AND publicacion_id = %s AND usuario_id = %s`;
  const values = [post_id, publicacion_id, usuario_id]
  const formattedQuery = format(query, ...values)
  console.log(formattedQuery)
  const results = await pool.query(formattedQuery);
  return results;
}
export const consultasComentarios = { addPost, readPost, deletePost, comprobarPost }