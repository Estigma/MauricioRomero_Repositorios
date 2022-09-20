import {number, object, string, TypeOf, z} from 'zod';

export const createOrganizationSchema = object({
    body: object({
        name: string({
            required_error: 'name is required',
        }),
        status: number({
            required_error: 'status is required'
        })
    })
})

const params = {
    params: object({
        id_organization: string(),
    }),
  };

export const getOrganizationSchema = object({
    ...params,
  });

  export const deleteOrganizationSchema = object({
    ...params,
  });

export type GetOrganizationInput = TypeOf<typeof getOrganizationSchema>['params'];
export type CreateOrganizationInput = TypeOf<typeof createOrganizationSchema>['body'];
export type DeleteOrganizationInput = TypeOf<typeof deleteOrganizationSchema>['params'];