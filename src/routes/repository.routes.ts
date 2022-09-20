import express from 'express';

import {getData} from '../controllers/repository.controller';
const router = express.Router();

router
    .route('/repositories/status')
    .get(getData)

export default router