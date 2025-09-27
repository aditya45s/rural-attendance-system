import { Home, Camera, BarChart3, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: 'home' | 'attendance' | 'reports' | 'sync';
  onTabChange: (tab: 'home' | 'attendance' | 'reports' | 'sync') => void;
  syncPending?: number;
}

export const BottomNavigation = ({ activeTab, onTabChange, syncPending = 0 }: BottomNavigationProps) => {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'attendance' as const, label: 'Attendance', icon: Camera },
    { id: 'reports' as const, label: 'Reports', icon: BarChart3 },
    { id: 'sync' as const, label: 'Sync', icon: RefreshCw },
  ];

  return (
    <nav className="flex border-t bg-card">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 flex flex-col items-center py-3 px-2 relative transition-colors",
              isActive 
                ? "text-primary bg-primary/5" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <div className="relative">
              <IconComponent className="h-5 w-5 mb-1" />
              {tab.id === 'sync' && syncPending > 0 && (
                <div className="absolute -top-2 -right-2 h-4 w-4 bg-offline text-white text-xs rounded-full flex items-center justify-center">
                  {syncPending}
                </div>
              )}
            </div>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};