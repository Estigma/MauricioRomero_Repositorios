import { z, object, TypeOf } from 'zod';

const params = {
    params: z.object({
        id_organization: z.string() || z.number(),
    }),
};

export const createOrganizationSchema = object({
    body: z.object({
        name: z
            .string({ required_error: 'name is required', invalid_type_error: 'name string type is required' })
            .min(1, 'name must contain at least 1 character')
            .max(50, 'name must contain at most 50 characters'),
        status: z.number({
            required_error: 'status is required'
        })
    })
});

export const updateOrganizationSchema = object({
    ...params,
    body: object({
        name: z.string(),
        status: z.number()
    }).partial(),
});

export const getOrganizationSchema = object({
    ...params,
});

export const deleteOrganizationSchema = object({
    ...params,
});

export type GetOrganizationInput = TypeOf<typeof getOrganizationSchema>['params'];
export type CreateOrganizationInput = TypeOf<typeof createOrganizationSchema>['body'];
export type DeleteOrganizationInput = TypeOf<typeof deleteOrganizationSchema>['params'];
export type UpdateOrganizationInput = TypeOf<typeof updateOrganizationSchema>;