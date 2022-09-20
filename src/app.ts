import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from './routes/organization.routes'


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())
app.use(userRoutes)

export default app;