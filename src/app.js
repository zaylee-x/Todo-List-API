import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import authRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';
import errorHandler from './middlewares/error.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ name: 'TPA5 ToDoList API', status: 'OK', version: '1.0.0' });
});

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);
export default app;
