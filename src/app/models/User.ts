import { Model, DataType ,Column, Table } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model{
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true, 
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_at!: Date;
}
