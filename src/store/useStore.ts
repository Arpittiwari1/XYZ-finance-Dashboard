import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction, Role, FilterState, Theme, View } from '../types';

interface AppState {
  transactions: Transaction[];
  role: Role;
  theme: Theme;
  currentView: View;
  filters: FilterState;
  
  setRole: (role: Role) => void;
  setTheme: (theme: Theme) => void;
  setCurrentView: (view: View) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, tx: Partial<Omit<Transaction, 'id'>>) => void;
  setFilters: (filters: Partial<FilterState>) => void;
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2026-03-25', amount: 4500, category: 'Salary', type: 'Income' },
  { id: '2', date: '2026-03-26', amount: 120, category: 'Groceries', type: 'Expense' },
  { id: '3', date: '2026-03-27', amount: 45, category: 'Entertainment', type: 'Expense' },
  { id: '4', date: '2026-03-28', amount: 1500, category: 'Freelance', type: 'Income' },
  { id: '5', date: '2026-03-29', amount: 80, category: 'Utilities', type: 'Expense' },
  { id: '6', date: '2026-03-30', amount: 350, category: 'Travel', type: 'Expense' },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      role: 'Admin',
      theme: 'light',
      currentView: 'Dashboard',
      filters: {
        search: '',
        category: 'All',
      },

      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      setCurrentView: (currentView) => set({ currentView }),
      
      addTransaction: (tx) => set((state) => ({
        transactions: [
          ...state.transactions,
          { ...tx, id: Math.random().toString(36).substr(2, 9) }
        ]
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      updateTransaction: (id, tx) => set((state) => ({
        transactions: state.transactions.map((t) => 
          t.id === id ? { ...t, ...tx } : t
        )
      })),

      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),
    }),
    {
      name: 'finance-dashboard-storage',
    }
  )
);
