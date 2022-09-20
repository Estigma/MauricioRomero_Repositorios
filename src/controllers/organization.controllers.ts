import { Request, Response, NextFunction } from 'express'
import { Organization } from '../entities/Organization'
import AppError from '../utils/appError'

import {
    GetOrganizationInput,
    CreateOrganizationInput,
    DeleteOrganizationInput,
    UpdateOrganizationInput
} from '../schemas/organization.schema';

import {
    findOrganizationByName,
    createOrganizationSevice,
    findOrganizations,
    findOrganizationById
} from '../services/organization.services'

export const createOrganization = async (
    req: Request<{}, {}, CreateOrganizationInput>,
    res: Response,
    next: NextFunction
) => {
    try {

        const organizationInDB = await findOrganizationByName(req.body.name as string);

        if (organizationInDB != null) {
            return res.status(409).json({
                status: 'fail',
                message: 'Nombre de organización ya existe',
            });
        }

        const result = await createOrganizationSevice(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                result,
            },
        });

    } catch (err: any) {
        next(err);
    }
};

export const getOrganizations = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    try {
        const organizationsInDB = await findOrganizations();

        res.status(200).json({
            status: 'success',
            data: {
                organizationsInDB,
            },
        });

    } catch (err: any) {
        next(err);
    }
};

export const getOrganization = async (
    req: Request<GetOrganizationInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const organizationInDB = await findOrganizationById(Number(req.params.id_organization));

        if (!organizationInDB) {
            return next(new AppError(404, 'Organización con ese ID no encontrada'));
        }

        res.status(200).json({
            status: 'success',
            data: {
                organizationInDB,
            },
        });

    } catch (err: any) {
        next(err);
    }
};

export const updateOrganization = async (
    req: Request<UpdateOrganizationInput['params'], {}, UpdateOrganizationInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const organizationInDB = await findOrganizationById(Number(req.params.id_organization));

        if (!organizationInDB) {
            return next(new AppError(404, 'Organización con ese ID no encontrada'));
        }

        Object.assign(organizationInDB, req.body);

        const updatedOrganization = await organizationInDB.save();
        
        res.status(200).json({
            status: 'success',
            data: {
              post: updatedOrganization,
            },
          });
    } catch (err: any) {
        next(err);
    }
};

export const deleteOrganization = async (
    req: Request<DeleteOrganizationInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const organizationInDB = await findOrganizationById(Number(req.params.id_organization));

        if (!organizationInDB) {
            return next(new AppError(404, 'Organización con ese ID no encontrada'));
        }

        await organizationInDB.remove();

        res.status(204).json({
        status: 'success',
        data: null,
        });

    } catch (err: any) {
        next(err);
    }
};