import express from 'express';
import { agregarFavorito, obtenerFavoritos, eliminarFavorito } from '../controllers/favoritosController.js';

const router = express.Router();

router.post('/', agregarFavorito);
router.get('/:usuario_id', obtenerFavoritos);
router.delete('/', eliminarFavorito);

export default router;
