import {getTribeRepositoriesMectrics} from '../schemas/tribeMetrics.schema';
import {getMetricsByTribe} from '../services/tribeMetrics.services'
import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/appError'

export const getTribeMetrics = async (
    req: Request<getTribeRepositoriesMectrics>,
    res: Response,
    next: NextFunction
) => {
    try {
        const organizationInDB = await getMetricsByTribe(Number(req.params.id_tribe));

        if (!organizationInDB) {
            return next(new AppError(404, 'Organización con ese ID no encontrada'));
        }

        res.status(200).json(organizationInDB);

    } catch (err: any) {
        next(err);
    }
};