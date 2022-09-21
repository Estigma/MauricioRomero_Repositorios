import { DataSource } from 'typeorm'
import {Organization} from './entities/organization.entities'
import {Tribe} from './entities/tribe.entities'
import {Repository} from './entities/repository.entities'
import {Metrics} from './entities/metrics.entities'

const dotenv = require('dotenv');
dotenv.config();

export const AppDataSource = new DataSource({
    type: "cockroachdb",
    host: process.env.HOST,
    port: 26257,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: false,
    logging: true,
    ssl: true,
    entities: [Organization, Tribe, Repository, Metrics]
})