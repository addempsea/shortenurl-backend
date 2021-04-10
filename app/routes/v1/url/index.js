import { Router } from 'express';
import RedirectController from '../../../controllers';

const router = Router();
router.get('/:shortUrl', RedirectController.redirect);

export default router;
