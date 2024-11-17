import { consultasPedidos } from "../consultas/consultasPedidos.js";
import { getDatabaseError } from "../errors/database.error.js";


//POST para agregar una nuevo pedido
const agregarPedido = async (req, res) => {
    try {
      const { publicacion_id, comprador_id, direccion_id, cantidad, estado } = req.body;
  
      const nuevoPedido = await consultasPedidos.agregarPedidoDB({
        publicacion_id,
        comprador_id,
        direccion_id,
        cantidad,
        estado,
      });
  
      res.status(201).json({
        message: "Pedido agregado con éxito",
        data: nuevoPedido,
      });
    } catch (error) {
      console.error("Error al agregar el pedido:", error.message); 
      res.status(400).json({
        message: "No se pudo agregar el pedido",
        error: error.message,
      });
    }
  };

export const pedidosController = { agregarPedido }