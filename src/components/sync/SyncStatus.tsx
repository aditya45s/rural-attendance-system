import { RefreshCw, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SyncRecord {
  id: string;
  type: 'attendance' | 'report';
  className: string;
  date: string;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
  progress?: number;
}

interface SyncStatusProps {
  records: SyncRecord[];
  onSyncAll: () => void;
  onRetryFailed: () => void;
  isOnline: boolean;
}

export const SyncStatus = ({ records, onSyncAll, onRetryFailed, isOnline }: SyncStatusProps) => {
  const pendingCount = records.filter(r => r.status === 'pending').length;
  const failedCount = records.filter(r => r.status === 'failed').length;
  const syncingCount = records.filter(r => r.status === 'syncing').length;

  const getStatusIcon = (status: SyncRecord['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-offline" />;
      case 'syncing':
        return <RefreshCw className="h-4 w-4 text-syncing animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-online" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Sync Controls */}
      <div className="flex gap-3">
        <Button
          onClick={onSyncAll}
          disabled={!isOnline || pendingCount === 0}
          className="flex-1"
        >
          <RefreshCw className={cn("h-4 w-4 mr-2", syncingCount > 0 && "animate-spin")} />
          Sync All ({pendingCount})
        </Button>
        {failedCount > 0 && (
          <Button
            variant="destructive"
            onClick={onRetryFailed}
            disabled={!isOnline}
          >
            Retry Failed ({failedCount})
          </Button>
        )}
      </div>

      {/* Sync Queue */}
      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-muted-foreground">SYNC QUEUE</h3>
        {records.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 text-online" />
            <p>All data synced!</p>
          </div>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className={cn(
                "p-3 rounded-lg border",
                record.status === 'completed' && "bg-success/5 border-success/20",
                record.status === 'failed' && "bg-destructive/5 border-destructive/20",
                record.status === 'pending' && "bg-muted/50 border-muted",
                record.status === 'syncing' && "bg-syncing/5 border-syncing/20"
              )}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(record.status)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {record.className} - {record.date}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {record.type} • {record.status}
                  </p>
                </div>
              </div>
              {record.status === 'syncing' && record.progress !== undefined && (
                <Progress value={record.progress} className="mt-2 h-2" />
              )}
            </div>
          ))
        )}
      </div>

      {!isOnline && (
        <div className="p-3 rounded-lg bg-offline/10 border border-offline/20 text-center">
          <p className="text-sm text-muted-foreground">
            Connect to internet to sync data
          </p>
        </div>
      )}
    </div>
  );
};