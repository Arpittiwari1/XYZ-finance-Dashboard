import React, { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

export const InsightsPage: React.FC = () => {
  const transactions = useStore((state) => state.transactions);
  const expenseByCategory = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(grouped).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [transactions]);

  const topCategory = expenseByCategory[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="font-headline font-extrabold text-3xl tracking-tighter text-on-surface dark:text-dark-primary mb-6 px-2">Financial Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-[1.5rem] shadow-xl md:col-span-1 border-t border-black/5 dark:border-white/5">
          <p className="text-xs font-bold tracking-widest uppercase text-on-surface-variant/70 dark:text-dark-on-surface-variant/60 mb-4">Peak Category</p>
          <div className="flex flex-col h-full">
            <div>
              <h4 className="text-3xl font-extrabold font-headline text-on-surface dark:text-white mb-2">
                {topCategory ? topCategory.name : 'N/A'}
              </h4>
              <p className="text-sm font-medium text-on-surface-variant dark:text-dark-on-surface-variant/80">
                Largest source of outgoings
              </p>
            </div>
            {topCategory && (
              <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10">
                <p className="text-4xl font-headline font-extrabold text-[#bc0b3b] dark:text-dark-error mb-2">
                   ${topCategory.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-medium text-on-surface-variant dark:text-dark-on-surface-variant">Budget Goal</span>
                  <span className="font-bold text-on-surface dark:text-white">75%</span>
                </div>
                <div className="w-full h-2 bg-surface-variant dark:bg-dark-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-error dark:bg-dark-error w-[75%] rounded-full"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card p-8 rounded-[1.5rem] shadow-xl md:col-span-2 border-t border-black/5 dark:border-white/5">
          <h3 className="text-lg font-bold font-headline text-on-surface dark:text-white mb-6">Expense Distribution</h3>
          <div className="w-full h-[300px]">
            {expenseByCategory.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseByCategory} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="currentColor" className="opacity-10 dark:opacity-20" />
                  <XAxis type="number" stroke="currentColor" className="text-on-surface-variant dark:text-dark-on-surface-variant opacity-50" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="currentColor" className="text-on-surface-variant dark:text-dark-on-surface-variant font-medium" fontSize={12} width={100} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface-container-highest)', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: 'var(--color-on-surface)' }}
                    formatter={(value: any) => `$${Number(value).toFixed(2)}`}
                    cursor={{fill: 'currentColor', opacity: 0.05}}
                  />
                  <Bar dataKey="value" fill="#bc0b3b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-on-surface-variant">No expenses found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
