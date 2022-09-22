import { getTribeRepositoriesMectrics } from '../schemas/tribeMetrics.schema';
import { getMetricsByTribe } from '../services/tribeMetrics.services'
import { Request, Response, NextFunction } from 'express'
import Json2csv  from 'json2csv';

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

        const tribeMetrics = await getMetricsByTribe(Number(req.params.id_tribe), fechaInicio, fechaFin, estado, porcentaje);
        if (tribeMetrics instanceof Error) {
            return res.status(tribeMetrics.statusCode || 404).json({ message: tribeMetrics.message });
        }
        res.status(200).json(tribeMetrics);
    }
    catch (err: any) {
        next(err);
    }
};

export const getTribeMetricsCSV = async (
    req: Request<getTribeRepositoriesMectrics>,
    res: Response,
    next: NextFunction
) => {
    try {
        const estado = req.query.estado?.toString() || ''
        const fechaInicio = req.query.fechaInicio?.toString() || ''
        const fechaFin = req.query.fechaFin?.toString() || ''
        const porcentaje = req.query.porcentaje?.toString() || ''

        const tribeMetrics = await getMetricsByTribe(Number(req.params.id_tribe), fechaInicio, fechaFin, estado, porcentaje);
        if (tribeMetrics instanceof Error) {
            return res.status(tribeMetrics.statusCode || 404).json({ message: tribeMetrics.message });
        }

        let fields = ['id', 'name', 'tribe', 'organization', 'coverage', 'code_smells', 'bugs', 'vulnerabilities', 
        'hotspots', 'status', 'state'];

        const json2csvParser = new Json2csv.Parser({ fields});
        const csv = json2csvParser.parse(tribeMetrics);
       
        res.attachment('metrics_' + (new Date()).toString() + '.csv');
        res.status(200).send(csv);

    }
    catch (err: any) {
        next(err);
    }
};