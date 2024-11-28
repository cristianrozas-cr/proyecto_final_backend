import { consultasCarrito } from '../consultas/consultasCarrito.js';

const agregarProducto = async (req, res) => {
  try {
    const producto = await consultasCarrito.agregarAlCarrito(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(error.code || 500).json({ error: error.message });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await consultasCarrito.obtenerCarrito(req.params.usuario_id);
    res.status(200).json(productos);
  } catch (error) {
    res.status(error.code || 500).json({ error: error.message });
  }
};

const actualizarCantidad = async (req, res) => {
  try {
    const { usuario_id, publicacion_id, cantidad } = req.body;

    // Verificar que la cantidad no sea menor a 1
    if (cantidad < 1) {
      return res.status(400).json({ error: "La cantidad debe ser al menos 1" });
    }

    const resultado = await consultasCarrito.actualizarCantidadCarrito({
      usuario_id,
      publicacion_id,
      cantidad,
    });

    res.json(resultado); // Retornar la fila actualizada
  } catch (error) {
    console.error("Error al actualizar cantidad:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const mensaje = await consultasCarrito.eliminarDelCarrito(req.body);
    res.status(200).json(mensaje);
  } catch (error) {
    res.status(error.code || 500).json({ error: error.message });
  }
};

export const carritoController = { agregarProducto, obtenerProductos, actualizarCantidad, eliminarProducto }
