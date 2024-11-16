import express from 'express';
import { agregarProducto, obtenerProductos, actualizarCantidad, eliminarProducto } from '../controllers/carritocontroller';

const router = express.Router();

router.post('/', agregarProducto);
router.get('/:usuario_id', obtenerProductos);
router.put('/', actualizarCantidad);
router.delete('/', eliminarProducto);

export default router;