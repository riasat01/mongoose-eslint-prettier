import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import StudentRouter from './app/modules/student/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use(`/api/v1/student`, StudentRouter);

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

app.use((error: Error, req: Request, res: Response) => {
  if (error) {
    res.json({
      success: false,
      message: `Global error handler is saying something went wrong!`,
    });
  }
  // next();
});

export default app;
