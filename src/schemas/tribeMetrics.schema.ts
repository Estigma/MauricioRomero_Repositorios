import { z, object, TypeOf } from 'zod';

const params = {
    params: z.object({
        id_tribe: z.string() || z.number(),
    }),
};

export const getTribeRepositoriesMectrics = object({
    ...params,
});

export type getTribeRepositoriesMectrics = TypeOf<typeof getTribeRepositoriesMectrics>['params'];