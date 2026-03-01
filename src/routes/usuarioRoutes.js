import { Router } from 'express';
import { listar, listarPorId, criar, atualizar, remover} from '../controllers/usuarioController.js';

const router = Router();

router.post('/', criar);
router.get('/', listar);
router.get('/:id', listarPorId);
router.put('/:id', atualizar);
router.delete('/:id', remover);

export default router;