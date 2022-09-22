import { AppDataSource } from '../db'
import { Organization } from '../entities/organization.entities'
import RepositoryState from '../interfaces/repository.interfaces'
import fetch from 'node-fetch'
import TribeMetricsDto from '../interfaces/tribeMetrics.interfaces'
import { findTribeById } from './tribe.services'
import AppError from '../utils/appError'
//import { CodigosVerificacion } from '../utils/enumerables'
import dotenv from 'dotenv'

dotenv.config();


export const getMetricsByTribe = async (id_tribe: number, fecha: string, estado: string, porcentaje: string) => {
    const tribeInDB = await findTribeById(id_tribe)
    let fechaRepositorio = new Date();

    if (tribeInDB === null) {
        return new AppError(400, 'La Tribu no se encuentra registrada')
    }

    if (fecha !== '') {

        fechaRepositorio = new Date(fecha)

        if (fechaRepositorio.toString() === 'Invalid Date') {
            return new AppError(400, 'Fecha no válida')
        }
    }

    const metrics = await getMetricsfromDB(id_tribe, fecha, estado, porcentaje);
    const tribeMetricsDtos: TribeMetricsDto[] = [];
    const repositoriesStatus = await getRepositoriesState1();

    repositoriesStatus.forEach(element => {
        switch (element.state) {
            case 604: {
                element.name = 'Aprobado'
                break;
            }
            case 605: {
                element.name = 'En espera'
                break;
            }
            case 606: {
                element.name = 'Aprobado'
                break;
            }
            default: {
                element.name = 'Desconocido'
                break;
            }
        }
    })

    metrics.forEach(element => {
        const tribeMetricsDto: TribeMetricsDto = {
            id: element.id,
            name: element.name,
            tribe: element.tribe,
            organization: element.organization,
            coverage: element.coverage,
            code_smells: element.code_smells,
            bugs: element.bugs,
            vulnerabilities: element.vulnerabilities,
            hotspots: element.hotspots,
            status: Array.from(repositoriesStatus).find((obj) => {
                return obj.id == element.id
            })?.name + "" || "Desconocido",
            state: element.state
        }

        tribeMetricsDtos.push(tribeMetricsDto);
    });


    //Object.keys(tribeMetricsDtos).length

    return tribeMetricsDtos;
};

const getMetricsfromDB = async (id_tribe: number, fecha: string, estado: string, porcentaje: string) => {
    const query = AppDataSource
        .getRepository(Organization)
        .createQueryBuilder("organization")
        .innerJoin("organization.tribes", "tribe")
        .innerJoin("tribe.repositories", "repository")
        .innerJoin("repository.metrics", "metrics")
        .select(["organization.id_organization AS id", "repository.name AS name", "tribe.name AS tribe",
            "organization.name AS organization", "metrics.coverage AS coverage", "metrics.code_smells AS code_smells",
            "metrics.bugs AS bugs", "metrics.vulnerabilities AS vulnerabilities", "metrics.hotspot AS hotspots", "repository.state AS state"])
        //.printSql()
        .where("tribe.id_tribe = :id_tribeParam", { id_tribeParam: id_tribe })

    console.log(estado)
    if (estado) {
        query.andWhere("repository.state = :stateParam", { stateParam: estado })
    }

    if (porcentaje) {
        query.andWhere("metrics.coverage >= :coverageParam", { coverageParam: Number(porcentaje)/100 })
    }

    //if (fecha) {
    //    query.andWhere("metrics.coverage = :coverageParam", { coverageParam: porcentaje })
    //}

    const categoriesWithQuestions = await query.getRawMany()

    return categoriesWithQuestions;
};



export const getRepositoriesState1 = async () => {

    const apiResponse = await fetch(
        'http://localhost:3000/repositories/status'
    )
    const apiResponseJson = await apiResponse.json()

    const array = Array.from(Object.values(apiResponseJson))[0];

    return array as RepositoryState[]
}

function getRepositoriesState(): Promise<RepositoryState[]> {
    return fetch('http://localhost:3000/repositories/status', {
        method: 'GET',
    })
        .then((response: { json: () => any; }) => response.json()) // Parse the response in JSON
        .then((response: RepositoryState[]) => {
            return response as RepositoryState[]; // Cast the response type to our interface
        });
}