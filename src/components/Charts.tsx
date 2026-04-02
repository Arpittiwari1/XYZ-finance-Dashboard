import { useMemo } from 'react';
import { useStore } from '../store/useStore';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#69f6b8', '#ff6f7e', '#47c4ff', '#06b77f', '#b50036', '#37bcf7'];

export const Charts: React.FC = () => {
  const transactions = useStore((state) => state.transactions);
  const theme = useStore((state) => state.theme);

  const balanceTrend = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let runningBalance = 0;
    return sorted.map((t) => {
      if (t.type === 'Income') runningBalance += Number(t.amount);
      else runningBalance -= Number(t.amount);
      
      return {
        date: t.date,
        balance: runningBalance
      };
    });
  }, [transactions]);

  const spendingBreakdown = useMemo(() => {
    const expenses = transactions.filter(t => t.type === 'Expense');
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
    });

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value
    }));
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="glass-card rounded-3xl p-6 border-t border-black/5 dark:border-white/5">
        <h2 className="font-headline font-bold text-lg text-on-surface-variant dark:text-dark-on-surface-variant mb-6">Balance Trend</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#192540' : '#e2e8f0'} />
              <XAxis dataKey="date" stroke={theme === 'dark' ? '#6d758c' : '#64748b'} fontSize={12} tickMargin={10} />
              <YAxis stroke={theme === 'dark' ? '#6d758c' : '#64748b'} fontSize={12} tickFormatter={(value) => `$${value}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: theme === 'dark' ? '#0f1930' : '#ffffff', border: `1px solid ${theme === 'dark' ? '#192540' : '#e2e8f0'}`, borderRadius: '12px' }}
                itemStyle={{ color: theme === 'dark' ? '#dee5ff' : '#1e293b' }}/>
              <Line type="monotone" dataKey="balance" stroke="#006c49" strokeWidth={3} dot={{ fill: theme === 'dark' ? '#060e20' : '#ffffff', stroke: '#006c49', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6 border-t border-black/5 dark:border-white/5">
        <h2 className="font-headline font-bold text-lg text-on-surface-variant dark:text-dark-on-surface-variant mb-6">Spending Breakdown</h2>
        <div className="h-[300px] w-full flex justify-center items-center">
          {spendingBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {spendingBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: theme === 'dark' ? '#0f1930' : '#ffffff', border: `1px solid ${theme === 'dark' ? '#192540' : '#e2e8f0'}`, borderRadius: '12px' }}
                  itemStyle={{ color: theme === 'dark' ? '#dee5ff' : '#1e293b' }}
                  formatter={(value: any) => `$${Number(value).toFixed(2)}`}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', color: theme === 'dark' ? '#a3aac4' : '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-on-surface-variant dark:text-dark-on-surface-variant">No expenses to display</p>
          )}
        </div>
      </div>
    </div>
  );
};
