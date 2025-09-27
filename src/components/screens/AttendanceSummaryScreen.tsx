import { useState } from 'react';
import { Save, Edit, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentCard } from '@/components/attendance/StudentCard';
import { Badge } from '@/components/ui/badge';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  photo?: string;
  confidence?: number;
}

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent';
}

interface AttendanceSummaryScreenProps {
  className: string;
  date: string;
  detectedStudents: Student[];
  allStudents: Student[];
  onSave: (records: AttendanceRecord[]) => void;
  onEdit: () => void;
}

export const AttendanceSummaryScreen = ({
  className,
  date,
  detectedStudents,
  allStudents,
  onSave,
  onEdit
}: AttendanceSummaryScreenProps) => {
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent'>>(() => {
    const initial: Record<string, 'present' | 'absent'> = {};
    
    // Mark detected students as present
    detectedStudents.forEach(student => {
      initial[student.id] = 'present';
    });
    
    // Mark others as absent
    allStudents.forEach(student => {
      if (!initial[student.id]) {
        initial[student.id] = 'absent';
      }
    });
    
    return initial;
  });

  const handleStatusChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    const records: AttendanceRecord[] = Object.entries(attendance).map(([studentId, status]) => ({
      studentId,
      status
    }));
    onSave(records);
  };

  const presentCount = Object.values(attendance).filter(status => status === 'present').length;
  const totalCount = allStudents.length;
  const attendanceRate = Math.round((presentCount / totalCount) * 100);

  return (
    <div className="p-4 space-y-4">
      {/* Summary Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{className}</CardTitle>
              <p className="text-sm text-muted-foreground">{date}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{attendanceRate}%</div>
              <p className="text-sm text-muted-foreground">{presentCount}/{totalCount} present</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Detection Results */}
      {detectedStudents.length > 0 && (
        <Card className="bg-success/5 border-success/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">AI Detected ({detectedStudents.length})</span>
            </div>
            <p className="text-xs text-muted-foreground">
              These students were automatically marked present based on face recognition
            </p>
          </CardContent>
        </Card>
      )}

      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Badge variant="outline" className="whitespace-nowrap">
          All ({totalCount})
        </Badge>
        <Badge variant="outline" className="whitespace-nowrap bg-success/10 text-success">
          Present ({presentCount})
        </Badge>
        <Badge variant="outline" className="whitespace-nowrap bg-destructive/10 text-destructive">
          Absent ({totalCount - presentCount})
        </Badge>
      </div>

      {/* Student List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {allStudents.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            status={attendance[student.id] || 'absent'}
            onStatusChange={handleStatusChange}
            showEdit={true}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t sticky bottom-0 bg-background">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onEdit}
        >
          <Edit className="h-4 w-4 mr-2" />
          Retake Photo
        </Button>
        <Button
          className="flex-1"
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-2" />
          Save Attendance
        </Button>
      </div>
    </div>
  );
};