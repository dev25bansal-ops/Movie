import { Router } from 'express';
import { moodController } from '../controllers/mood.controller';

const router = Router();

router.post('/recommend', moodController.getRecommendations);

export default router;
