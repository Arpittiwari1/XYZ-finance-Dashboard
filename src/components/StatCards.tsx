import React from 'react';
import { useStore } from '../store/useStore';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

export const StatCards: React.FC = () => {
  const transactions = useStore((state) => state.transactions);

  const income = transactions
    .filter((t) => t.type === 'Income')
    .reduce((acc, t) => acc + Number(t.amount), 0);
    
  const expense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((acc, t) => acc + Number(t.amount), 0);
    
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="glass-card rounded-3xl p-6 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center">
            <Wallet className="text-primary w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">Total Balance</p>
            <p className="font-headline font-bold text-3xl text-on-surface dark:text-white">
              ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="text-primary w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">Total Income</p>
            <p className="font-headline font-bold text-3xl text-on-surface dark:text-white">
              ${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <TrendingDown className="text-secondary w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">Total Expenses</p>
            <p className="font-headline font-bold text-3xl text-on-surface dark:text-white">
              ${expense.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
