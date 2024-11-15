import { pool } from '../db/db.js';
import format from 'pg-format';
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import jsonwebtoken from 'jsonwebtoken';

const BASE_URL = `http://localhost:3000`;

const obtenerGaleria = async ({ limit = 8, page = 1 }) => {
  //Consulta para contar el número total de filas en la tabla 'publicaciones'
  const countQuery = "SELECT * FROM publicaciones";
  const { rows: countResult } = await pool.query(countQuery);
  const total_rows = parseInt(countResult[0].count, 10);

  //Calcula el número total de páginas
  const total_pages = Math.ceil(total_rows / limit);

  const query = `
    SELECT 
        p.id AS publicacion_id,
        p.titulo, 
        p.descripcion, 
        p.precio, 
        p.fecha_publicacion,
        p.id_vendedor, 
        i.img1_portada 
        
    FROM 
        publicaciones p 
    LEFT JOIN 
        imagenes i 
    ON 
        p.id = i.publicacion_id
    LIMIT %s OFFSET %s;
`;
  const offset = (page - 1) * limit;
  const formattedQuery = format(query, limit, offset);
  const { rows } = await pool.query(formattedQuery);

  //Devuelve un array con los resultados y un enlace a cada uno de ellos
  const results = rows.map((row) => {
    return {
      ...row,
      href: `${BASE_URL}/galeria/${row.publicacion_id}`,
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


export const consultasPublicaciones = { obtenerGaleria }