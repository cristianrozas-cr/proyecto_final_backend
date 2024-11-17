import { pool } from '../db/db.js';

export const agregarDireccion = async ({ usuario_id, pais, ciudad, calle, numero }) => {
    try {
      const query = `
        INSERT INTO direcciones (usuario_id, pais, ciudad, calle, numero)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [usuario_id, pais, ciudad, calle, numero];
      const { rows } = await pool.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error al agregar dirección:", error.message);
      throw new Error("No se pudo agregar la dirección");
    }
  };
                                              

const obtenerDirecciones = async ({usuario_id}) => {
  try {
    // Validación de parámetros
    if (!usuario_id) {
      throw new Error("Falta el ID del usuario");
    }

    // Consulta para obtener las direcciones del usuario
    const query = `
      SELECT 
        d.id AS direccion_id, 
        d.pais, 
        d.ciudad, 
        d.calle, 
        d.numero
      FROM direccion d
      WHERE d.usuario_id = $1`;
    ;

    // Ejecutar consulta y devolver resultados
    const { rows } = await pool.query(query, [usuario_id]);
    return rows; // Retorna todas las direcciones asociadas al usuario
  } catch (error) {
    console.error("Error al obtener direcciones:", error.message);
    throw new Error("No se pudieron obtener las direcciones");
  }
};


const eliminarDireccion = async (usuario_id, direccion_id) => {
    try {
      // Asegurarse de que se proporcionen ambos parámetros
      if (!usuario_id || !direccion_id) {
        throw new Error("Faltan el usuario_id o el direccion_id");
      }
  
      // Consulta para eliminar una dirección específica del usuario
      const query = `
        DELETE FROM direcciones 
        WHERE id = $1 AND usuario_id = $2
        RETURNING *;
      `;
      const values = [direccion_id, usuario_id];
      const { rows } = await pool.query(query, values);
  
      if (rows.length === 0) {
        throw new Error("No se encontró la dirección o no pertenece al usuario");
      }
  
      return rows[0]; // Retornar la dirección eliminada
    } catch (error) {
      console.error("Error al eliminar la dirección:", error.message);
      throw new Error("No se pudo eliminar la dirección");
    }
  };
  
  export const consultasDirecciones = {
    eliminarDireccion,
    agregarDireccion,
    obtenerDirecciones
  };