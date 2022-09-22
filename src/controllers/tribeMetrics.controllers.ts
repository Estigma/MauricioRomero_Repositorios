import { getMetricsByTribe } from '../services/tribeMetrics.services'
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

        const tribeMetrics = await getMetricsByTribe(id_tribe, fechaInicio, fechaFin, estado, porcentaje);
        
        return tribeMetrics
    }

    @Get("/")    
    public async getTribeMetricsCSV(@Path() id_tribe: string, @Query() query: QueryInputDTO): Promise<QueryOutputDTO | AppError>
    {
        const estado = query.estado?.toString() || ''
        const fechaInicio = query.fechaInicio?.toString() || ''
        const fechaFin = query.fechaFin?.toString() || ''
        const porcentaje = query.porcentaje?.toString() || ''

        const tribeMetrics = await getMetricsByTribe(id_tribe, fechaInicio, fechaFin, estado, porcentaje);
        
        if (tribeMetrics instanceof AppError) {
            return tribeMetrics;
        }

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
}