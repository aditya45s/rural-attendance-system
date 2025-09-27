import { Wifi, WifiOff, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopNavigationProps {
  isOnline: boolean;
  teacherName: string;
  onLogout: () => void;
}

export const TopNavigation = ({ isOnline, teacherName, onLogout }: TopNavigationProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground shadow-sm">
      <div className="flex items-center gap-3">
        <div className="text-xl font-bold">EduTrace</div>
        <div className="flex items-center gap-1">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-online" />
          ) : (
            <WifiOff className="h-4 w-4 text-offline" />
          )}
          <span className="text-xs">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4" />
          <span>{teacherName}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-primary-foreground hover:bg-primary-dark"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};