export type Role = 'Admin' | 'Viewer';
export type Theme = 'light' | 'dark';
export type View = 'Dashboard' | 'Insights';

export type TransactionType = 'Income' | 'Expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export interface FilterState {
  search: string;
  category: string;
}
