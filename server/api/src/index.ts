import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import middleware from 'i18next-http-middleware';
import i18next from 'i18next';
import { configureI18n } from './config/i18n';
import { todosRoutes, usersRoutes } from './routes';
import dotenv from 'dotenv';

dotenv.config();
configureI18n();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(middleware.handle(i18next));
app.use('/users', usersRoutes);
app.use('/todos', todosRoutes);

app.listen(port, () => {
  console.log(`api running on port ${port}`);
});
