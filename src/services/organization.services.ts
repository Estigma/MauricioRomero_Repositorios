import { AppDataSource } from '../db'
import { Organization } from '../entities/organization.entities'

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
    .leftJoinAndSelect("organization.tribes", "tribe")
    .leftJoinAndSelect("tribe.repositories", "repository")
    //.leftJoinAndSelect("repository.id_repository", "metrics.id_repository")
    .getMany()
    return categoriesWithQuestions;
};

export const findOrganizations = async () => {
    return await organizationRepository.find();
};

export const createOrganizationSevice = async (organization: Partial<Organization>) => {
    return await organizationRepository.save(organizationRepository.create(organization));
};