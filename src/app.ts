import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

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

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.json({
      success: false,
      message: `Global error handler is saying something went wrong!`,
    });
  }
});

export default app;
