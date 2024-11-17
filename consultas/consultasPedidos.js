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
    
    const consulta = `SELECT * FROM pedidos WHERE comprador_id = $1 RETURNING *;`;
    const values = [comprador_id]
    const { rows } = await pool.query(consulta, values)
    return rows;
}





export const consultasPedidos = { agregarPedidoDB, obtenerPedidosDB}
// PUT PEDIDO(PDTE O ENVIADO)