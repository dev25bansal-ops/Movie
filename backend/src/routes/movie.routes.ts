import { Router } from 'express';
import { movieController } from '../controllers/movie.controller';

const router = Router();

router.get('/search', movieController.search);
router.get('/popular', movieController.getPopular);
router.get('/trending', movieController.getTrending);
router.get('/:id', movieController.getDetails);

export default router;
