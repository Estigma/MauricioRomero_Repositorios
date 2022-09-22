import express from 'express';

import { getTribeMetrics, getTribeMetricsCSV } from '../controllers/tribeMetrics.controllers'
import { validate } from '../middleware/validate';
import { getTribeRepositoriesMectrics } from '../schemas/tribeMetrics.schema';

const router = express.Router();
router
    .route('/tribe/:id_tribe/metrics')
    .get(validate(getTribeRepositoriesMectrics), getTribeMetrics)

router
    .route('/tribe/:id_tribe/metrics/csv')
    .get(validate(getTribeRepositoriesMectrics), getTribeMetricsCSV)
export default router