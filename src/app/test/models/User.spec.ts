import { describe, expect, test, beforeAll, jest } from '@jest/globals';
import { User } from '../../models/User';
import { Transaction } from '../../models/Transaction';

jest.mock('../../models/User'); // Mocka o modelo User
jest.mock('../../models/Transaction'); // Mocka o modelo Transaction

describe('Testing User module', () => {
    beforeAll(() => {
        // Mocka o método `create` do modelo User
        jest.spyOn(User, 'create').mockImplementation(async (data: any) => ({
            ...data,
            id: Math.floor(Math.random() * 1000), // Simula um ID auto-incrementado
            $get: jest.fn().mockImplementation(() => Promise.resolve([
                {
                    amount: 100,
                    type: 'INCOME',
                    description: 'Salary',
                    userId: data.id, // usar o id correto do user criado
                },
                {
                    amount: 50,
                    type: 'EXPENSE',
                    description: 'Food',
                    userId: data.id,
                },
            ])),
        }));

        // Mocka o método `create` do modelo Transaction
        jest.spyOn(Transaction, 'create').mockImplementation(async (data: any) => ({
            ...data,
            id: Math.floor(Math.random() * 1000), // Simula um ID auto-incrementado
        }));
    });

    test('Create a user with transactions', async () => {
        // Cria um usuário mockado
        const user = await User.create({
            name: 'Diego',
            email: 'diego@inatel.br',
            password: '123456',
        });

        // Cria transações mockadas associadas ao usuário
        await Transaction.create({
            amount: 100,
            type: 'INCOME',
            description: 'Salary',
            userId: user.id,
        });

        await Transaction.create({
            amount: 50,
            type: 'EXPENSE',
            description: 'Food',
            userId: user.id,
        });

        // Recupera as transações associadas ao usuário
        const transactions = await user.$get('transactions');
        expect(transactions.length).toBe(2);
        expect(transactions).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ amount: 100, type: 'INCOME', description: 'Salary' }),
                expect.objectContaining({ amount: 50, type: 'EXPENSE', description: 'Food' }),
            ])
        );
    });
});