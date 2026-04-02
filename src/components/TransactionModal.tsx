import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import type { Transaction, TransactionType } from '../types';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  transactionToEdit?: Transaction | null;
}

export const TransactionModal: React.FC<Props> = ({ isOpen, onClose, transactionToEdit }) => {
  const addTransaction = useStore((state) => state.addTransaction);
  const updateTransaction = useStore((state) => state.updateTransaction);

  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<TransactionType>('Expense');

  useEffect(() => {
    if (transactionToEdit) {
      setDate(transactionToEdit.date);
      setAmount(transactionToEdit.amount.toString());
      setCategory(transactionToEdit.category);
      setType(transactionToEdit.type);
    } else {
      setDate(new Date().toISOString().split('T')[0]);
      setAmount('');
      setCategory('');
      setType('Expense');
    }
  }, [transactionToEdit, isOpen]);

  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !date) return;

    const txData = {
      date,
      amount: Number(amount),
      category,
      type
    };

    if (transactionToEdit) {
      updateTransaction(transactionToEdit.id, txData);
    } else {
      addTransaction(txData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000]/60 backdrop-blur-sm p-4">
      <div className="glass-card w-full max-w-md rounded-3xl border border-black/5 dark:border-white/10 overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-black/5 dark:border-white/5">
          <h2 className="font-headline font-bold text-xl text-on-surface dark:text-white">
            {transactionToEdit ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button onClick={onClose} className="p-2 bg-surface-variant rounded-full text-on-surface hover:text-white hover:bg-surface-bright transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border ${type === 'Income' ? 'bg-primary/20 text-primary border-primary/50' : 'bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-bright'}`}
              onClick={() => setType('Income')}>Income</button>
            <button
              type="button"
              className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all border ${type === 'Expense' ? 'bg-secondary/20 text-secondary border-secondary/50' : 'bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-bright'}`}
              onClick={() => setType('Expense')}>Expense</button>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-on-surface-variant font-medium ml-1">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-medium">$</span>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-surface-container-high dark:bg-dark-surface-container-high border border-outline-variant/30 rounded-2xl pl-8 pr-4 py-4 text-on-surface dark:text-white focus:outline-none focus:border-primary/50 placeholder:text-outline-variant transition-colors font-headline font-bold text-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-on-surface-variant font-medium ml-1">Category</label>
            <input 
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Groceries, Salary..."
              className="w-full bg-surface-container-high dark:bg-dark-surface-container-high border border-outline-variant/30 rounded-2xl px-4 py-4 text-on-surface dark:text-white focus:outline-none focus:border-primary/50 placeholder:text-outline-variant transition-colors"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-on-surface-variant font-medium ml-1">Date</label>
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-surface-container-high dark:bg-dark-surface-container-high border border-outline-variant/30 rounded-2xl px-4 py-4 text-on-surface dark:text-white focus:outline-none focus:border-primary/50 transition-colors"
              required
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-primary text-on-primary-container font-headline font-extrabold py-4 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all text-base tracking-wide">
              {transactionToEdit ? 'Update Transaction' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
