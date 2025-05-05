import express from 'express';
import userRoutes from './routes/user.router';
import transactionRoutes from './routes/transaction.router';
import sequelize from './database/database';

const app = express();

app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
    return sequelize.sync(); // isso cria as tabelas se não existirem
  })
  .then(() => {
    console.log('Tabelas sincronizadas com o banco de dados!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ou sincronizar com o banco de dados:', err);
  });

export default app;
