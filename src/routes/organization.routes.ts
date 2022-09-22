import express from 'express';

import {
    getOrganizations,
    getOrganization,
    createOrganization,
    updateOrganization,
    deleteOrganization
} from '../controllers/organization.controllers'
import { validate } from '../middleware/validate';
import {
    createOrganizationSchema,
    getOrganizationSchema,
    deleteOrganizationSchema,
    updateOrganizationSchema
} from '../schemas/organization.schema';

const router = express.Router();
router
    .route('/organization')
    .get(getOrganizations)
    .post(validate(createOrganizationSchema), createOrganization)

router
    .route('/organization/:id_organization')
    .delete(validate(deleteOrganizationSchema), deleteOrganization)
    .get(validate(getOrganizationSchema), getOrganization)
    .patch(validate(updateOrganizationSchema), updateOrganization)

export default router