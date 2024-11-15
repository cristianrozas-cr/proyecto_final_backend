import { pool } from '../db/db.js';
import format from 'pg-format';
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import jsonwebtoken from 'jsonwebtoken';

const BASE_URL = `http://localhost:3000`;

//Mostrar publicaciones como galería
const obtenerGaleria = async ({ limit = 8, page = 1 }) => {
  //Consulta para contar el número total de filas en la tabla 'publicaciones'
  const countQuery = "SELECT * FROM publicaciones";
  const { rows: countResult } = await pool.query(countQuery);
  const total_rows = parseInt(countResult[0].count, 10);

  //Calcula el número total de páginas
  const total_pages = Math.ceil(total_rows / limit);

  const query = "SELECT * FROM publicaciones LIMIT %s OFFSET %s";
  const offset = (page - 1) * limit;
  const formattedQuery = format(query, limit, offset);
  const { rows } = await pool.query(formattedQuery);
 
  //Devuelve un array con los resultados y un enlace a cada uno de ellos
  const results = rows.map((row) => {
    return {
      ...row,
      href: `${BASE_URL}/galeria/${row.id}`,
    };
  });

  //Devuelve un objeto con los resultados, el número total de páginas y los enlaces a la página siguiente y anterior
  return {
    results,
    total_pages,
    page,
    limit,
    next:
      total_pages <= page
        ? null
        : `${BASE_URL}/tecno?limit=${limit}&page=${page + 1}`,
    previous:
      page <= 1 ? null : `${BASE_URL}/tecno?limit=${limit}&page=${page - 1}`,
  };
};

//Agregar una nueva Publicación
const agregarPublicacion = async ({ titulo, descripcion, categoria_id, precio, id_vendedor }) => {
  try {
    // Validación de los campos
    if (!titulo || !descripcion || !precio || !id_vendedor) {
      throw new Error("Completa todos los campos");
    }

    // Consulta SQL
    const consulta = `
      INSERT INTO publicaciones (titulo, descripcion, categoria_id, precio, id_vendedor)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const { rows } = await pool.query(consulta, [titulo, descripcion, categoria_id, precio, id_vendedor]);

    // Retorna la publicación
    return rows[0];
  } catch (error) {
    console.error("Error al agregar publicación:", error.message);
    throw new Error("No se pudo agregar la publicación.");
  }
};



export const consultasPublicaciones = { obtenerGaleria, agregarPublicacion }