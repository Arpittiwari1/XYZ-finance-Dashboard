import React from 'react';
import { useStore } from '../store/useStore';
import { Shield, ShieldAlert, LayoutDashboard, PieChart, Sun, Moon } from 'lucide-react';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  const currentView = useStore((state) => state.currentView);
  const setCurrentView = useStore((state) => state.setCurrentView);

  const toggleRole = () => setRole(role === 'Admin' ? 'Viewer' : 'Admin');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, view: 'Dashboard' as const },
    { label: 'Insights', icon: PieChart, view: 'Insights' as const },
  ];

  return (
    <div className="min-h-screen bg-surface dark:bg-dark-surface text-on-surface dark:text-dark-on-surface transition-colors duration-300">
      
      <aside className="w-64 fixed inset-y-0 left-0 hidden md:flex flex-col bg-white/80 dark:bg-dark-surface-variant/80 backdrop-blur-xl z-50 py-8 px-4 border-r border-black/5 dark:border-white/5 transition-colors">
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary dark:bg-dark-primary rounded-xl flex items-center justify-center shrink-0">
            <LayoutDashboard className="text-white dark:text-dark-surface w-6 h-6"/>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-on-surface dark:text-white font-headline">XYZ</h1>
            <p className="text-[11px] font-bold tracking-wider uppercase text-on-surface-variant/60 dark:text-dark-on-surface-variant/80">Finance</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.label}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold ${
                  isActive 
                    ? 'text-primary dark:text-dark-primary border-r-4 border-primary dark:border-dark-primary bg-primary/10 dark:bg-dark-primary/10' 
                    : 'text-on-surface-variant dark:text-dark-on-surface-variant hover:text-on-surface dark:hover:text-white hover:bg-black/5 dark:hover:bg-dark-surface-bright/20'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 bg-white/70 dark:bg-dark-surface/80 backdrop-blur-2xl flex justify-between items-center h-16 px-6 border-b border-black/5 dark:border-white/5 transition-colors">
        <div className="flex items-center gap-4 flex-1">
           <h2 className="font-headline font-extrabold text-xl md:hidden text-primary dark:text-dark-primary">XYZ</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-variant/30 text-on-surface-variant hover:text-primary dark:bg-dark-surface-variant/50 dark:text-dark-on-surface-variant dark:hover:text-dark-primary transition-all border border-black/5 dark:border-white/5"
            title="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
          
          <button 
            onClick={toggleRole}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              role === 'Admin' 
                ? 'bg-primary text-white dark:bg-dark-primary/20 dark:text-dark-primary border border-transparent dark:border-dark-primary/30' 
                : 'bg-surface-variant text-on-surface-variant dark:bg-dark-surface-variant dark:text-dark-on-surface-variant'
            }`}
             title="Toggle Role"
          >
            {role === 'Admin' ? <Shield className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
            {role}
          </button>
          
          <div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-primary/20 hidden sm:block shadow-sm">
            <img alt="User" className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=Arpit+Tiwari&background=006c49&color=fff" />
          </div>
        </div>
      </header>

      <main className="ml-0 md:ml-64 pt-24 pb-20 md:pb-12 px-4 sm:px-8 max-w-[1600px] mx-auto transition-all">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-white/80 dark:bg-dark-surface-variant/90 backdrop-blur-xl border-t border-black/5 dark:border-white/5 flex justify-around items-center h-20 px-4 pb-2 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] rounded-t-[2rem]">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.label}
              onClick={() => setCurrentView(item.view)}
              className={`flex flex-col items-center justify-center rounded-2xl px-4 py-2 transition-all ${
                isActive ? 'bg-primary/10 text-primary dark:bg-dark-primary/20 dark:text-dark-primary' 
                  : 'text-on-surface-variant dark:text-dark-on-surface-variant hover:text-on-surface dark:hover:text-white'}`}>
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-bold tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
