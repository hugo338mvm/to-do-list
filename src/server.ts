import express from 'express';

const app = express();
const PORTA = 3333;

app.use(express.json());

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
})