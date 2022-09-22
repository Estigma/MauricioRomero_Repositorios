import { getTribeRepositoriesMectrics } from '../schemas/tribeMetrics.schema';
import { getMetricsByTribe } from '../services/tribeMetrics.services'
import { Request, Response, NextFunction } from 'express'
import { INVALID } from 'zod';

export const getTribeMetrics = async (
    req: Request<getTribeRepositoriesMectrics>,
    res: Response,
    next: NextFunction
) => {
    try {
        const estado = req.query.estado?.toString() || ''
        const fechaInicio = req.query.fechaInicio?.toString() || ''
        const fechaFin = req.query.fechaFin?.toString() || ''
        const porcentaje = req.query.porcentaje?.toString() || ''

        const organizationInDB = await getMetricsByTribe(Number(req.params.id_tribe), fechaInicio, fechaFin, estado, porcentaje);
        if (organizationInDB instanceof Error) {
            return res.status(organizationInDB.statusCode || 404).json({ message: organizationInDB.message });
        }
        res.status(200).json(organizationInDB);
    }
    catch (err: any) {
        next(err);
    }
};