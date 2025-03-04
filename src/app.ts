import express from 'express';
import accountRoutes from "./routes/accountRoutes";

const app = express();

app.use(express.json());

app.use('/account/v1', accountRoutes);

app.listen(process.env.EXPRESS_PORT || 3000, () => {
  console.log(`🚀 Servidor rodando na porta ${process.env.EXPRESS_PORT || 3000}`);
});
