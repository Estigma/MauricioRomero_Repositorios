import { DataSource } from 'typeorm'
import {Organization} from './entities/Organization'

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
    entities: [Organization]
})