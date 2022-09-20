import {number, object, string, TypeOf, z} from 'zod';

const params = {
    params: object({
        id_organization: string(),
    }),
  };

export const createOrganizationSchema = object({
    body: object({
        name: string({
            required_error: 'name is required',
        }),
        status: number({
            required_error: 'status is required'
        })
    })
});

export const updateOrganizationSchema = object({
    ...params,
    body: object({
        name: string(),
        status: number()
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