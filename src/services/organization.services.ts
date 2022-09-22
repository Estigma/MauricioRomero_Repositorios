import { AppDataSource } from '../db'
import { Organization } from '../entities/organization.entities'

const organizationRepository = AppDataSource.getRepository(Organization);

export const findOrganizationByName = async (name: string) => {
    return await organizationRepository.findOneBy({ name: name });
};

export const findOrganizationById = async (id_organization: number) => {
    return await organizationRepository.findOneBy({ id_organization: id_organization });
};

export const findOrganizations = async () => {
    return await organizationRepository.find();
};

export const createOrganizationSevice = async (organization: Partial<Organization>) => {
    return await organizationRepository.save(organizationRepository.create(organization));
};

export const updateOrganizationSevice = async (organization: Organization) => {
    return await organizationRepository.save(organization);
};

