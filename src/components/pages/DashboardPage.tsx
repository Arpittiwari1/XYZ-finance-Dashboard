import React from 'react';
import { StatCards } from '../StatCards';
import { Charts } from '../Charts';
import { TransactionList } from '../TransactionList';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section>
        <h2 className="font-headline font-bold text-xl text-on-surface dark:text-white mb-4 px-2">Overview</h2>
        <StatCards />
      </section>
      
      <section>
        <Charts />
      </section>

      <section>
        <TransactionList />
      </section>
    </div>
  );
};
