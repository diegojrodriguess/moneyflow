import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Transaction } from '../models/Transaction';

const sequelize = new Sequelize({
  database: 'moneyflow_db',
  username: 'moneyflow',
  password: 'moneyflow_password',
  host: 'db',
  dialect: 'postgres',
  port: 5432,
  models: [User, Transaction],
});

export default sequelize;