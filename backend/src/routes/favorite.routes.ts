import { Router } from 'express';
import { favoriteController } from '../controllers/favorite.controller';

const router = Router();

router.post('/', favoriteController.addToFavorites);
router.get('/', favoriteController.getFavorites);
router.delete('/:id', favoriteController.removeFromFavorites);
router.get('/check/:id', favoriteController.checkFavorite);

export default router;
