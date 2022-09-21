import { AppDataSource } from '../db'
import { Organization } from '../entities/organization.entities'
import RepositoryState from '../interfaces/repository.interfaces'
import fetch from 'node-fetch';

export const getMetricsByTribe = async (id_tribe: number) => {
    const metrics = getMetricsfromDB(id_tribe);
    const repositoriesStatus = getRepositoriesState();

    return metrics;
};

const getMetricsfromDB = async (id_tribe: number) => {
    const categoriesWithQuestions = await AppDataSource
        .getRepository(Organization)
        .createQueryBuilder("organization")
        .innerJoin("organization.tribes", "tribe")
        .innerJoin("tribe.repositories", "repository")
        .leftJoin("repository.metrics", "metrics")
        .select(["organization.id_organization AS id", "repository.name AS name", "tribe.name AS tribe",
            "organization.name AS organization", "metrics.coverage AS coverage", "metrics.code_smells AS code_smells",
            "metrics.bugs AS bugs", "metrics.vulnerabilities AS vulnerabilities", "metrics.hotspot AS hotspots", "repository.state AS state"])
        .printSql()
        .getRawMany()

    return categoriesWithQuestions;
};

function getRepositoriesState(): Promise<RepositoryState[]> {
    return fetch('http://localhost:3000/repositories/status', {
        method: 'GET',
    })
        .then((response: { json: () => any; }) => response.json()) // Parse the response in JSON
        .then((response: RepositoryState[]) => {
            return response as RepositoryState[]; // Cast the response type to our interface
        });
}