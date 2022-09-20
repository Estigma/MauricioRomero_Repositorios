import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import organizationRoutes from './routes/organization.routes'
import repositoryRoutes from './routes/repository.routes'


const app = express();
var path = require('path')
app.use(express.static(path.join(__dirname, 'build')));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use(organizationRoutes, repositoryRoutes)

export default app;