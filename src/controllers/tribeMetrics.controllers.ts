import { getMetricsByTribe } from '../services/tribeMetrics.services'
import { Request, Response, NextFunction } from 'express'
import Json2csv  from 'json2csv';
import { Get, Query, Path, Route } from "tsoa";
import TribeMetricsDTO from '../interfaces/tribeMetrics.interfaces';
import {QueryInputDTO, QueryOutputDTO } from '../interfaces/QueryDTO.interfaces';
import AppError from '../utils/appError';

@Route("tribeMetrics")
export default class TribeMetricsController {
    @Get("/")    
    public async getTribeMetrics(@Path() id_tribe: string, @Query() query: QueryInputDTO): Promise<Array<TribeMetricsDTO> | AppError>
    {
        const estado = query.estado?.toString() || ''
        const fechaInicio = query.fechaInicio?.toString() || ''
        const fechaFin = query.fechaFin?.toString() || ''
        const porcentaje = query.porcentaje?.toString() || ''

        const tribeMetrics = await getMetricsByTribe(Number(id_tribe), fechaInicio, fechaFin, estado, porcentaje);
        
        return tribeMetrics
    }

    @Get("/")    
    public async getTribeMetricsCSV(@Path() id_tribe: string, @Query() query: QueryInputDTO): Promise<QueryOutputDTO>
    {
        const estado = query.estado?.toString() || ''
        const fechaInicio = query.fechaInicio?.toString() || ''
        const fechaFin = query.fechaFin?.toString() || ''
        const porcentaje = query.porcentaje?.toString() || ''

        const tribeMetrics = await getMetricsByTribe(Number(id_tribe), fechaInicio, fechaFin, estado, porcentaje);
        
        let fields = ['id', 'name', 'tribe', 'organization', 'coverage', 'code_smells', 'bugs', 'vulnerabilities', 
        'hotspots', 'status', 'state'];

        const json2csvParser = new Json2csv.Parser({ fields});
        const csv = json2csvParser.parse(tribeMetrics);
       
        const queryOutput: QueryOutputDTO = {
            attachment: 'metrics_' + (new Date()).toString() + '.csv',
            data:csv
        }

        return queryOutput
    }

/*export const getTribeMetricsCSV = async (
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
};*/
}