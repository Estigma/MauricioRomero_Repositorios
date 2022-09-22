import { z, object, TypeOf } from 'zod';

const params = {
    params: z.object({
        id_tribe: z.string() || z.number(),
    }),
};

const query = {
    query: z.object({
        fecha: z.string(),
        estado: z.string(),
        porcentaje: z.string()
    }).partial(),
};

export const getTribeRepositoriesMectrics = object({
    ...params, ...query
});

export type getTribeRepositoriesMectrics = TypeOf<typeof getTribeRepositoriesMectrics>['params'];