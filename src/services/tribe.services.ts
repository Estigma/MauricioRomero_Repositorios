import { AppDataSource } from '../db'
import { Tribe } from '../entities/tribe.entities'

const tribeRepository = AppDataSource.getRepository(Tribe);

export const findTribeById = async (id_tribe: number) => {
    return await tribeRepository.findOneBy({ id_tribe: id_tribe });
};