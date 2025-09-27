import { Camera, BarChart3, RefreshCw, Settings, Calendar, MapPin } from 'lucide-react';
import { ActionTile } from '@/components/ui/ActionTile';

interface DashboardScreenProps {
  onTakeAttendance: () => void;
  onViewReports: () => void;
  onSyncData: () => void;
  onSettings: () => void;
  onTeacherAttendance: () => void;
  syncPending: number;
  todayClasses: number;
}

export const DashboardScreen = ({
  onTakeAttendance,
  onViewReports,
  onSyncData,
  onSettings,
  onTeacherAttendance,
  syncPending,
  todayClasses
}: DashboardScreenProps) => {
  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">
          Ready to take attendance for today's classes
        </p>
      </div>

      {/* Today's Summary */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold">Today's Schedule</h3>
            <p className="text-sm text-muted-foreground">
              {todayClasses} classes scheduled for today
            </p>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4">
        <ActionTile
          title="Take Attendance"
          description="Capture student attendance"
          icon={Camera}
          onClick={onTakeAttendance}
          variant="primary"
        />
        
        <ActionTile
          title="Teacher Attendance"
          description="Check your location status"
          icon={MapPin}
          onClick={onTeacherAttendance}
          variant="secondary"
        />
        
        <ActionTile
          title="View Reports"
          description="Check attendance reports"
          icon={BarChart3}
          onClick={onViewReports}
          variant="accent"
        />
        
        <ActionTile
          title="Sync Data"
          description="Upload pending records"
          icon={RefreshCw}
          onClick={onSyncData}
          variant="secondary"
          badge={syncPending}
        />
      </div>

      {/* Quick Status */}
      {syncPending > 0 && (
        <div className="bg-offline/10 border border-offline/20 rounded-lg p-3">
          <p className="text-sm text-center">
            <span className="font-medium">{syncPending} records</span> waiting to sync
          </p>
        </div>
      )}
    </div>
  );
};