import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import ApplicationRouter from './app/routes/index';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use(`/api/v1`, ApplicationRouter);

app.get(`/`, async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: `Long game?`,
  });
});

app.all(`*`, async (req: Request, res: Response) => {
  // throw new Error(`Hudai error`);
  res.json({
    success: false,
    message: `Route doesn't exist!`,
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
