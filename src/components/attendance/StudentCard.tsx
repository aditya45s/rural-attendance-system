import { Check, X, User, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  photo?: string;
  confidence?: number;
}

interface StudentCardProps {
  student: Student;
  status: 'present' | 'absent' | 'pending';
  onStatusChange: (studentId: string, status: 'present' | 'absent') => void;
  showEdit?: boolean;
}

export const StudentCard = ({ student, status, onStatusChange, showEdit = true }: StudentCardProps) => {
  return (
    <div className={cn(
      "flex items-center gap-3 p-4 rounded-lg border-2 transition-all",
      status === 'present' && "border-success bg-success/5",
      status === 'absent' && "border-destructive bg-destructive/5",
      status === 'pending' && "border-muted bg-muted/20"
    )}>
      <div className="relative">
        {student.photo ? (
          <img 
            src={student.photo} 
            alt={student.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
        )}
        {student.confidence && (
          <div className="absolute -bottom-1 -right-1 text-xs bg-primary text-primary-foreground px-1 rounded">
            {Math.round(student.confidence * 100)}%
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{student.name}</h4>
        <p className="text-sm text-muted-foreground">Roll: {student.rollNumber}</p>
      </div>
      
      {showEdit && (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={status === 'present' ? 'default' : 'outline'}
            onClick={() => onStatusChange(student.id, 'present')}
            className={cn(
              status === 'present' && "bg-success hover:bg-success/90"
            )}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={status === 'absent' ? 'destructive' : 'outline'}
            onClick={() => onStatusChange(student.id, 'absent')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};