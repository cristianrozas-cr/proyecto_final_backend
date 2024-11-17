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

  //GET para obtener todos los pedidos de un usuario
  const obtenerPedidos = async (req, res) => {
    try {
      const { comprador_id } = req.params
      const pedidos = await consultasPedidos.obtenerPedidosDB(comprador_id);

      if (pedidos.length === 0) {
        return res.status(404).json({ message: "No se encontraron pedidos para el comprador" });
      }

      return res.json(pedidos);
    } catch (error) {
      console.log(error);
      if (error.code) {
          const { code, message } = getDatabaseError(error.code);
          return res.status(code).json({ message });
      }
      return res.status(500).json({ message: "Internal server error" });
  }
  }

  const actualizarEstadoPedido = async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body;
  
      if (!estado) {
        return res.status(400).json({ message: "El estado es obligatorio" });
      }
  
      const pedidoActualizado = await consultasPedidos.actualizarEstadoPedidoDB(id, estado);
  
      if (pedidoActualizado === 0) {
        return res.status(404).json({ message: "Pedido no encontrado" });
      }
  
      return res.status(200).json({ message: "Estado del pedido actualizado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
  };

export const pedidosController = { agregarPedido, obtenerPedidos, actualizarEstadoPedido }