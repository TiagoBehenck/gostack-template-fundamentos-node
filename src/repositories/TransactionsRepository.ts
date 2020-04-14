import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      // Buscar os 'income'
      .filter(transaction => transaction.type === 'income')
      // Fazer a soma dos valores com o fitlro anterior aplicado
      .reduce((acc, transaction) => {
        return acc + transaction.value;
      }, 0);

    const outcome = this.transactions
      // Buscar os 'outcome'
      .filter(transaction => transaction.type === 'outcome')
      // Fazer a soma dos valores com o fitlro anterior aplicado
      .reduce((acc, transaction) => {
        return acc + transaction.value;
      }, 0);

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
