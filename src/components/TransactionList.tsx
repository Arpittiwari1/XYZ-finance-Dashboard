import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Plus, Edit2, Trash2, Filter } from 'lucide-react';
import { TransactionModal } from './TransactionModal';
import type { Transaction } from '../types';

export const TransactionList: React.FC = () => {
  const transactions = useStore((state) => state.transactions);
  const role = useStore((state) => state.role);
  const filters =useStore((state) => state.filters);
  const setFilters = useStore((state) => state.setFilters);
  const deleteTransaction = useStore((state) => state.deleteTransaction);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const categories = ['All', ...Array.from(new Set(transactions.map((t) => t.category)))];

  const filteredTransactions = transactions.filter((t) => {
    const matchSearch = t.category.toLowerCase().includes(filters.search.toLowerCase()) || t.amount.toString().includes(filters.search);
    const matchCategory = filters.category === 'All' || t.category === filters.category;
    return matchSearch && matchCategory;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingTx(null);
    setIsModalOpen(true);
  };

  const isAdmin = role === 'Admin';

  return (
    <div className="glass-card rounded-3xl mt-6 border-t border-black/5 dark:border-white/5 overflow-hidden">
      <div className="p-6 border-b border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="font-headline font-bold text-lg text-on-surface dark:text-white self-start sm:self-center">Recent Transactions</h2>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative text-on-surface-variant flex-1 sm:flex-none sm:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="w-full bg-surface-container-high dark:bg-dark-surface-container-high border border-outline-variant/30 rounded-xl pl-9 pr-4 py-2 text-sm text-on-surface dark:text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="relative text-on-surface-variant">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <select
              title="Category Filter"
              value={filters.category}
              onChange={(e) => setFilters({ category: e.target.value })}
              className="appearance-none bg-surface-container-high dark:bg-dark-surface-container-high border border-outline-variant/30 rounded-xl pl-9 pr-8 py-2 text-sm text-on-surface dark:text-white focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {isAdmin && (
            <button 
              onClick={handleNew}
              className="flex items-center justify-center gap-2 bg-primary text-on-primary-container font-headline font-bold px-4 py-2 rounded-xl text-sm hover:opacity-90 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 text-on-primary-container" />
              <span>New</span>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high/50 dark:bg-dark-surface-container-high/50 text-xs text-on-surface-variant dark:text-dark-on-surface-variant uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
              {isAdmin && <th className="px-6 py-4 font-medium text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 5 : 4} className="px-6 py-8 text-center text-on-surface-variant">
                  No transactions found.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-surface-bright/20 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant dark:text-dark-on-surface-variant">{tx.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-on-surface dark:text-white">{tx.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${tx.type === 'Income' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-on-surface dark:text-white">
                    ${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(tx)} className="p-2 text-on-surface-variant hover:text-primary bg-surface-container hover:bg-surface-bright rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => deleteTransaction(tx.id)} className="p-2 text-on-surface-variant hover:text-error bg-surface-container hover:bg-surface-bright rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        transactionToEdit={editingTx} 
      />
    </div>
  );
};
