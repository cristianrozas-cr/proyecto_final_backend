import express from 'express';

const router = express.Router();

router.post('/', agregarFavorito);
router.get('/:usuario_id', obtenerFavoritos);
router.delete('/', eliminarFavorito);

export default router;
