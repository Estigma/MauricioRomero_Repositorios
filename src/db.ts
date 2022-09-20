import { DataSource } from 'typeorm'
import {Organization} from './entities/Organization'

export const AppDataSource = new DataSource({
    type: "cockroachdb",
    host: "free-tier14.aws-us-east-1.cockroachlabs.cloud",
    port: 26257,
    username: "UserRepository",
    password: "rVe8H--pyPvlIrIh3ukE9A",
    database: "coarse-roarer-5097.Repositories",
    synchronize: false,
    logging: true,
    ssl: true,
    entities: [Organization]
})