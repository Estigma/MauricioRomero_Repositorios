import OrganizationController from './organization.controllers'
import * as OrganizacionServices from '../services/organization.services'
import { generateOrganizationsData } from '../../test/utils/generate'

afterEach(() => {
    jest.resetAllMocks()
})

describe("OrganizationController", () => {
    describe("getOrganizations", () => {
        test("should return empty array", async () => {
            const spy = jest.spyOn(OrganizacionServices, 'findOrganizations').mockResolvedValueOnce([])
            const controller = new OrganizationController();
            const users = await controller.getOrganizations();
            expect(users).toEqual([])
            expect(spy).toHaveBeenCalledWith()
            expect(spy).toHaveBeenCalledTimes(1)
        })
    })

    test("should return organization list", async () => {
        const organizationsData = generateOrganizationsData(2)
        const spy = jest.spyOn(OrganizacionServices, 'findOrganizations').mockResolvedValueOnce(organizationsData)
        const controller = new OrganizationController();
        const users = await controller.getOrganizations();
        expect(users).toEqual(organizationsData)
        expect(spy).toHaveBeenCalledWith()
        expect(spy).toHaveBeenCalledTimes(1)
      })
})