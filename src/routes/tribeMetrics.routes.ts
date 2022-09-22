import express from 'express';

import TribeMetricsController from '../controllers/tribeMetrics.controllers'
import { QueryInputDTO, QueryOutputDTO } from '../interfaces/QueryDTO.interfaces';
import AppError from '../utils/appError';

const router = express.Router();

router.get("/tribe/:id_tribe/metrics", async (req, res) => {
  const controller = new TribeMetricsController();
  const response = await controller.getTribeMetrics(req.params.id_tribe, req.query as unknown as QueryInputDTO);
  if (response instanceof AppError) {
    return res.status(response.statusCode).send({ message: response.message })
  }
  else { return res.send(response); }
});


router.get("/tribe/:id_tribe/metrics/csv", async (req, res) => {
  const controller = new TribeMetricsController();
  const inputParam: QueryInputDTO = {
    fechaInicio: req.query.fechaInicio?.toString() || '',
    fechaFin: req.query.fechaFin?.toString() || '',
    estado: req.query.estado?.toString() || '',
    porcentaje: req.query.porcentaje?.toString() || '',
  }
  const response = await controller.getTribeMetricsCSV(req.params.id_tribe, inputParam);

  if (response instanceof AppError) {
    return res.status(response.statusCode).send({ message: response.message })
  }
  else {
    res.attachment(response.attachment)
    return res.send(response.data);
  }
});

export default router