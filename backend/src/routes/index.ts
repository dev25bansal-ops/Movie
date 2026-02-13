import { Router } from 'express';
import moodRoutes from './mood.routes';
import movieRoutes from './movie.routes';
import favoriteRoutes from './favorite.routes';
import historyRoutes from './history.routes';

const router = Router();

router.use('/mood', moodRoutes);
router.use('/movies', movieRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/history', historyRoutes);

router.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'movie-recommendation-api'
  });
});

export default router;
