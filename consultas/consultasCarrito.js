import { pool } from '../db/db.js';

// Agregar un producto al carrito
// Agregar un producto al carrito
const agregarAlCarrito = async ({ usuario_id, publicacion_id, cantidad }) => {
  try {
    if (!usuario_id || !publicacion_id || !cantidad) {
      throw new Error("Todos los campos son obligatorios");
    }

    const query = `
      INSERT INTO carrito (usuario_id, publicacion_id, cantidad)
      VALUES ($1, $2, $3)
      ON CONFLICT (usuario_id, publicacion_id)
      DO UPDATE SET cantidad = carrito.cantidad + EXCLUDED.cantidad
      RETURNING *;
    `;

    const values = [usuario_id, publicacion_id, cantidad];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error al agregar al carrito:", error.message);
    throw new Error("No se pudo agregar el producto al carrito.");
  }
};

// Obtener los productos del carrito de un usuario
const obtenerCarrito = async (usuario_id) => {
  try {
    if (!usuario_id) {
      throw new Error("El ID del usuario es obligatorio");
    }

    const query = `
      SELECT c.id AS carrito_id, c.cantidad, p.titulo, p.precio, p.descripcion, p.id AS publicacion_id
      FROM carrito c
      INNER JOIN publicaciones p ON c.publicacion_id = p.id
      WHERE c.usuario_id = $1;
    `;
    const { rows } = await pool.query(query, [usuario_id]);
    return rows;
  } catch (error) {
    console.error("Error al obtener el carrito:", error.message);
    throw new Error("No se pudo obtener el carrito.");
  }
};

/// Actualizar la cantidad de un producto en el carrito
const actualizarCantidadCarrito = async ({ usuario_id, publicacion_id, cantidad }) => {
  try {
    console.log("Datos recibidos para actualizar:", { usuario_id, publicacion_id, cantidad });
    
    if (!usuario_id || !publicacion_id || cantidad == null || cantidad < 1) {
      throw new Error("Todos los campos son obligatorios y la cantidad debe ser mayor a cero.");
    }

    const query = `
      UPDATE carrito
      SET cantidad = $1
      WHERE usuario_id = $2 AND publicacion_id = $3
      RETURNING *;
    `;
    const values = [cantidad, usuario_id, publicacion_id];
    
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      throw new Error("El producto no se encontró en el carrito.");
    }

    console.log("Producto actualizado:", rows[0]);
    return rows[0];
    
  } catch (error) {
    console.error("Error al actualizar la cantidad en el carrito:", error);
    throw new Error(`No se pudo actualizar la cantidad en el carrito: ${error.message}`);
  }
};
// Eliminar un producto del carrito
const eliminarDelCarrito = async ({ usuario_id, publicacion_id }) => {
  try {
    if (!usuario_id || !publicacion_id) {
      throw new Error("Todos los campos son obligatorios");
    }

    const query = `
      DELETE FROM carrito
      WHERE usuario_id = $1 AND publicacion_id = $2
      RETURNING *;
    `;
    const values = [usuario_id, publicacion_id];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      throw new Error("El producto no existe en el carrito.");
    }

    console.log("Producto eliminado:", rows[0]);
    return { message: "Producto eliminado del carrito" };
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error.message);
    throw new Error("No se pudo eliminar el producto del carrito.");
  }
};

export const consultasCarrito = {
  agregarAlCarrito,
  obtenerCarrito,
  actualizarCantidadCarrito,
  eliminarDelCarrito,
};

