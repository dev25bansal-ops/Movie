import { Router } from 'express';
import { historyController } from '../controllers/history.controller';

const router = Router();

router.get('/', historyController.getHistory);
router.delete('/', historyController.clearHistory);
router.delete('/:id', historyController.deleteHistoryEntry);

export default router;
