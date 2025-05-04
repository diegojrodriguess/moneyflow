import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { Transaction } from '../models/Transaction';

const sequelize = new Sequelize('postgres://moneyflow:moneyflow_password@localhost:5434/moneyflow_db', {
  dialect: 'postgres',
  models: [User, Transaction]
});

export default sequelize;