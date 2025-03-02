import express, {Request, Response} from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello World!'
  });
});

app.listen(process.env.EXPRESS_PORT || 3000, () => {
  console.log(`🚀 Servidor rodando na porta ${process.env.EXPRESS_PORT || 3000}`);
});
