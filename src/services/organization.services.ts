import { response } from 'express';
import { AppDataSource } from '../db'
import { Organization } from '../entities/organization.entities'
import RepositoryState from '../interfaces/repository.interfaces'

const organizationRepository = AppDataSource.getRepository(Organization);

export const findOrganizationByName = async (name: string) => {
    return await organizationRepository.findOneBy({ name: name });
};

export const findOrganizationById = async (id_organization: number) => {
    return await organizationRepository.findOneBy({ id_organization: id_organization });
};

export const findOrganizationById2 = async (id_organization: number) => {
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

    //const status = await getConvertedData()

    console.log(status)


    return categoriesWithQuestions;
};

export const findOrganizations = async () => {
    return await organizationRepository.find();
};

export const createOrganizationSevice = async (organization: Partial<Organization>) => {
    return await organizationRepository.save(organizationRepository.create(organization));
};

