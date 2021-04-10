import { Router } from 'express';
import authRoutes from './url';

const router = Router();

router.use('/', authRoutes);

export default router;
