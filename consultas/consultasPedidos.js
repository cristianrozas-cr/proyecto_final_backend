import { pool } from '../db/db.js';
import format from 'pg-format';

//Pedidos
// POST PEDIDO
const agregarPedidoDB = async ({publicacion_id, comprador_id, direccion_id, cantidad, estado}) => {
    try {
        const consulta = `INSERT INTO pedidos (publicacion_id, comprador_id, direccion_id, cantidad, estado) VALUES($1, $2, $3, $4, $5) RETURNING *;`;
        const values = [publicacion_id, comprador_id, direccion_id, cantidad, estado]
        console.log("Valores enviados a la base de datos:", values);
        const { rows } = await pool.query(consulta, values)
        return rows[0];
    } catch (error) {
        throw new Error("Error al agregar el pedido: " + error.message);
    }
}

// GET PEDIDOS
const obtenerPedidosDB = async (comprador_id) => {
    
    try {
        const consulta = `SELECT 
                p.id AS pedido_id,
                p.cantidad,
                p.comprador_id,
                p.fecha_compra,
                p.estado,
                pub.id AS publicacion_id,
                pub.titulo,
                pub.descripcion,
                pub.precio,
                i.img1_portada,
                i.img2,
                i.img3,
                i.img4
            FROM pedidos p
            INNER JOIN publicaciones pub ON p.publicacion_id = pub.id
            INNER JOIN imagenes i ON pub.id = i.publicacion_id
            WHERE p.comprador_id = $1;`;
        const values = [comprador_id];
        const { rows } = await pool.query(consulta, values);
        console.log(rows);
        return rows; // Devuelve un arreglo de registros
      } catch (error) {
        throw new Error("Error al obtener los pedidos de la base de datos");
      }
}

const actualizarEstadoPedidoDB = async (id, estado) => {
    try {
      const consulta = `UPDATE pedidos SET estado = $1 WHERE id = $2;`;
      const values = [estado, id];
      const result = await pool.query(consulta, values);
      return result.rowCount;
    } catch (error) {
      throw new Error("Error al actualizar el estado del pedido");
    }
  };





export const consultasPedidos = { agregarPedidoDB, obtenerPedidosDB, actualizarEstadoPedidoDB};