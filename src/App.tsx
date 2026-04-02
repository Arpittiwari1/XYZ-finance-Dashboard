import { useEffect } from 'react';
import { useStore } from './store/useStore';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardPage } from './components/pages/DashboardPage';
import { InsightsPage } from './components/pages/InsightsPage';

function App() {
  const theme = useStore((state) => state.theme);
  const currentView = useStore((state) => state.currentView);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Routing logic
  const renderView = () => {
    switch (currentView) {
      case 'Insights':
        return <InsightsPage />;
      case 'Dashboard':
      default:
        return <DashboardPage />;
    }
  };

  return (
    <DashboardLayout>
      {renderView()}
    </DashboardLayout>
  );
}

export default App;
