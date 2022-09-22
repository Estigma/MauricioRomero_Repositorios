import express from 'express';

import { getTribeMetrics } from '../controllers/tribeMetrics.controllers'
import { validate } from '../middleware/validate';
import { getTribeRepositoriesMectrics } from '../schemas/tribeMetrics.schema';

const router = express.Router();
router
    .route('/tribe/:id_tribe/metrics')
    .get(validate(getTribeRepositoriesMectrics), getTribeMetrics)

export default router