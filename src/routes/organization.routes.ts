import express from 'express'
import OrganizationController from '../controllers/organization.controllers'
import AppError from '../utils/appError';

const router = express.Router();

router.get("/organization", async (_req, res) => {
    console.log('route /')
    const controller = new OrganizationController();
    const response = await controller.getOrganizations();
    return res.send(response);
});

router.get("/organization/:id_organization", async (req, res) => {
    console.log('route /id_organization')
    const controller = new OrganizationController();
    const response = await controller.getOrganization(req.params.id_organization);
    if (response instanceof AppError) {
        return res.status(response.statusCode).send({ message: response.message })
    }
    else { return res.send(response); }

});

router.post("/organization/", async (req, res) => {
    const controller = new OrganizationController();
    const response = await controller.createOrganization(req.body);
    if (response instanceof AppError) {
        res.status(response.statusCode).send({ message: response.message })
    }
    else { return res.send(response); }
})

router.delete("/organization/:id_organization", async (req, res) => {
    const controller = new OrganizationController();
    const response = await controller.deleteOrganization(req.params.id_organization);
    if (response instanceof AppError) {
        res.status(response.statusCode).send({ message: response.message })
    }
    else { return res.send(response); }
});

router.patch("/organization/:id_organization", async (req, res) => {
    const controller = new OrganizationController();
    const response = await controller.updateOrganization(req.params.id_organization, req.body);
    if (response instanceof AppError) {
        res.status(response.statusCode).send({ message: response.message })
    }
    else { return res.send(response); }
});

export default router