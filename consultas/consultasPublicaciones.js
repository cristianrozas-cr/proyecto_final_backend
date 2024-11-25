import { pool } from '../db/db.js';
import format from 'pg-format';

const BASE_URL = `http://localhost:3000`;

//Mostrar publicaciones como galería
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
        p.categoria_id, 
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

//Agregar una nueva Publicación
const agregarPublicacionDB = async ({ titulo, descripcion, categoria_id, precio, id_vendedor }) => {
  try { 
    // Validación de los campos
    if (!titulo || !descripcion || !precio || !id_vendedor) {
      throw new Error("Completa todos los campos");
    }

    // Consulta SQL
    const consulta = `
      INSERT INTO publicaciones (id, titulo, descripcion, categoria_id, precio, id_vendedor)
      VALUES (default, $1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const { rows } = await pool.query(consulta, [titulo, descripcion, categoria_id, precio, id_vendedor]);

    // Retorna la publicación
    return rows[0];
  } catch (error) {
    console.error("Error al agregar publicación:", error.message);
    throw new Error(error.message);
  }
};

//Mostrar detalle de una publicacion
const detallePublicacionDB = async (id) => {
  try {
    const consulta = `
      SELECT 
        p.id AS publicacion_id, 
        p.titulo, 
        p.descripcion, 
        p.precio, 
        p.fecha_publicacion, 
        p.categoria_id, 
        p.id_vendedor, 
        i.img1_portada, 
        i.img2, 
        i.img3, 
        i.img4
      FROM publicaciones p
      LEFT JOIN imagenes i ON p.id = i.publicacion_id
      WHERE p.id = $1;
    `;
    const values = [id];
    const { rows } = await pool.query(consulta, values);
    return rows[0]; // Retorna la publicación con sus imágenes
  } catch (error) {
    throw new Error("Error al consultar la base de datos");
  }
};

//Mostrar publicaciones de un usuario en específico
const publicacionesUsuarioDB = async (id) => {
  try{
  const consulta = `
        SELECT 
          p.id AS publicacion_id, 
          p.titulo, 
          p.descripcion, 
          p.precio, 
          p.fecha_publicacion, 
          p.categoria_id, 
          p.id_vendedor, 
          i.img1_portada 
        FROM publicaciones p
        LEFT JOIN imagenes i ON p.id = i.publicacion_id
        WHERE p.id_vendedor = $1;
      `;
      const values = [id];
      const { rows } = await pool.query(consulta, values);
      return rows;
  } catch (error) {
    throw new Error("Error al consultar la base de datos");
  }
}

//Eliminar una publicación
const eliminarPublicacionDB = async (id) =>{

  try{
    const consulta = `DELETE from publicaciones WHERE id = $1 RETURNING *;`;
    const values = [id];
    const { rows } = await pool.query(consulta, values);

    if (rows.length === 0) {
      throw new Error("Error al eliminar la publicación");
    }
  } catch (error) {
    throw new Error("Error al eliminar la publicación")
  }
}


export const consultasPublicaciones = { obtenerGaleria, agregarPublicacionDB, detallePublicacionDB, publicacionesUsuarioDB, eliminarPublicacionDB }