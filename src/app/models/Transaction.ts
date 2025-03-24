import { Model, DataType ,Column, Table } from "sequelize-typescript";

@Table({
    tableName: 'transactions',
    timestamps: true,
  })
export class Transaction extends Model{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
    })
    id!: number;
    
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    amount!: number;
    
    @Column({
        type: DataType.ENUM,
        allowNull: false,
    })
    type!: 'INCOME' | 'EXPENSE';

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!: string;   
    
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