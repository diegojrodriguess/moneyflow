import { Model, DataType, Column, Table, ForeignKey, Sequelize } from "sequelize-typescript";
import { User } from "./User";

@Table({
    tableName: 'transactions',
    timestamps: true,
})
export class Transaction extends Model {
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
        type: DataType.ENUM('INCOME', 'EXPENSE'),
        allowNull: false,
    })
    type!: 'INCOME' | 'EXPENSE';

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    created_at!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updated_at!: Date;
}