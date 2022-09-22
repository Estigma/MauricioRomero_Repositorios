import TribeMetricsController from './tribeMetrics.controllers'
import * as TribeMetricsServices from '../services/tribeMetrics.services'
import { generateNTribeMetricsData } from '../../test/utils/generate'
import { QueryInputDTO, QueryOutputDTO } from 'src/interfaces/QueryDTO.interfaces'
import AppError from '../utils/appError'

afterEach(() => {
    jest.resetAllMocks()
})

describe("TribeMetricsController", () => {
    describe("getTribeMetrics", () => {
        test("should return empty array", async () => {
            const error = new AppError(400, 'La Tribu no se encuentra registrada')
            const spy = jest.spyOn(TribeMetricsServices, 'getMetricsByTribe').mockResolvedValueOnce(error)
            const controller = new TribeMetricsController();
            const queryInput: QueryInputDTO = { estado: "", fechaFin: "", fechaInicio: '', porcentaje: '' }
            const tribeMetrics = await controller.getTribeMetrics('15', queryInput);
            expect(tribeMetrics).toEqual(error)
            expect(spy).toHaveBeenCalledWith('15', '', '', '', '')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    test("should return empty array", async () => {
        const error = new AppError(400, 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria')
        const spy = jest.spyOn(TribeMetricsServices, 'getMetricsByTribe').mockResolvedValueOnce(error)
        const controller = new TribeMetricsController();
        const queryInput: QueryInputDTO = { estado: "", fechaFin: "", fechaInicio: '', porcentaje: '100' }
        const tribeMetrics = await controller.getTribeMetrics('1', queryInput);
        expect(tribeMetrics).toEqual(error)
        expect(spy).toHaveBeenCalledWith('1', '', '', '', '100')
        expect(spy).toHaveBeenCalledTimes(1)
    })

    test("should return TribeMetrics list", async () => {
        const tribeMetricsData = generateNTribeMetricsData(2)
        const spy = jest.spyOn(TribeMetricsServices, 'getMetricsByTribe').mockResolvedValueOnce(tribeMetricsData)
        const controller = new TribeMetricsController();
        const queryInput: QueryInputDTO = { estado: "", fechaFin: "", fechaInicio: '', porcentaje: '' }
        const tribeMetrics = await controller.getTribeMetrics('1', queryInput);
        expect(tribeMetrics).toEqual(tribeMetricsData)
        expect(spy).toHaveBeenCalledWith('1', '', '', '', '')
        expect(spy).toHaveBeenCalledTimes(1)
    })

    describe("getTribeMetricsCSV", () => {
        test("should return AppError", async () => {
            const error = new AppError(400, 'La Tribu no se encuentra registrada')
            const spy = jest.spyOn(TribeMetricsServices, 'getMetricsByTribe').mockResolvedValueOnce(error)
            const controller = new TribeMetricsController();
            const queryInput: QueryInputDTO = { estado: "", fechaFin: "", fechaInicio: '', porcentaje: '' }
            const tribeMetrics = await controller.getTribeMetricsCSV('15', queryInput);
            expect(tribeMetrics).toEqual(error)
            expect(spy).toHaveBeenCalledWith('15', '', '', '', '')
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    test("should return AppError", async () => {
        const error = new AppError(400, 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria')
        const spy = jest.spyOn(TribeMetricsServices, 'getMetricsByTribe').mockResolvedValueOnce(error)
        const controller = new TribeMetricsController();
        const queryInput: QueryInputDTO = { estado: "", fechaFin: "", fechaInicio: '', porcentaje: '100' }
        const tribeMetrics = await controller.getTribeMetricsCSV('1', queryInput);
        expect(tribeMetrics).toEqual(error)
        expect(spy).toHaveBeenCalledWith('1', '', '', '', '100')
        expect(spy).toHaveBeenCalledTimes(1)
    })
})