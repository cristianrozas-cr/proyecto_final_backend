import { consultasCarrito } from '../consultas/consultacarrito.js';

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
    const producto = await consultasCarrito.actualizarCantidadCarrito(req.body);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito." });
    }

    res.status(200).json({
      message: "Cantidad del carrito actualizada correctamente",
      producto
    });
  } catch (error) {
    res.status(error.code || 500).json({ error: error.message });
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
