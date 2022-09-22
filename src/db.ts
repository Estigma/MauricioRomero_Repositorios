import { DataSource } from 'typeorm'
import { Organization } from './entities/organization.entities'
import { Tribe } from './entities/tribe.entities'
import { Repository } from './entities/repository.entities'
import { Metrics } from './entities/metrics.entities'
import dotenv from 'dotenv'

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'cockroachdb',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: process.env.SYNCHRONIZE === 'true',
    logging: true,
    ssl: process.env.SSL === 'true',
    entities: [Organization, Tribe, Repository, Metrics]
})