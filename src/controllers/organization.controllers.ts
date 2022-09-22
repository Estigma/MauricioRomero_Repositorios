import { Get, Post, Body, Route, Path, Delete } from "tsoa";
import { Organization } from '../entities/organization.entities';

import {
    findOrganizationByName,
    createOrganizationSevice,
    findOrganizations,
    findOrganizationById,
    updateOrganizationSevice
} from '../services/organization.services'
import AppError from "../utils/appError";

@Route("organization")
export default class OrganizationController {

    @Get("/")
    public async getOrganizations(): Promise<Array<Organization>> {
        const organizationsInDB = await findOrganizations();
        
        return organizationsInDB;
    }

    @Get("/:id_organization")
    public async getOrganization(@Path() id_organization: string): Promise<Organization | AppError> {
        const organizationInDB = await findOrganizationById(Number(id_organization));
        
        if (!organizationInDB) {
            return new AppError(400, 'Id de organización no válido')   
        }

        return organizationInDB;
    };

    @Post("/")
    public async createOrganization(@Body() body: Organization): Promise<Organization | AppError> {
        const organizationInDB = await findOrganizationByName(body.name as string);

        if (organizationInDB != null) {
            return new AppError(409, 'Nombre de organización ya existe')            
        }

        const result = await createOrganizationSevice(body);

        return result;

    };

    @Path("/:id_organization")
    public async updateOrganization(@Path() id_organization: string, @Body() body: Organization): Promise<Organization | AppError> {
        const organizationInDB = await findOrganizationById(Number(id_organization));

        if (!organizationInDB) {
            return new AppError(400, 'Id de organización no válido')   
        }

        Object.assign(organizationInDB, body);

        const updatedOrganization = await updateOrganizationSevice(organizationInDB)

        return updatedOrganization;

    };

    @Delete("/:id_organization")
    public async deleteOrganization(@Path() id_organization: string): Promise<Organization | AppError> {
        const organizationInDB = await findOrganizationById(Number(id_organization));

        if (!organizationInDB) {
            return new AppError(400, 'Id de organización no válido')   
        }

        await organizationInDB.remove();

        return organizationInDB;

    }
}