import { useState } from 'react';
import { Calendar, Download, BarChart3, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AttendanceData {
  date: string;
  present: number;
  total: number;
  percentage: number;
}

interface ReportsScreenProps {
  classes: string[];
  onClassSelect: (className: string) => void;
  onDateSelect: (date: string) => void;
  attendanceData: AttendanceData[];
  selectedClass: string;
  selectedMonth: string;
}

export const ReportsScreen = ({
  classes,
  onClassSelect,
  onDateSelect,
  attendanceData,
  selectedClass,
  selectedMonth
}: ReportsScreenProps) => {
  const [viewType, setViewType] = useState<'table' | 'chart'>('table');

  const averageAttendance = attendanceData.length > 0
    ? Math.round(attendanceData.reduce((sum, item) => sum + item.percentage, 0) / attendanceData.length)
    : 0;

  const totalClasses = attendanceData.length;
  const highAttendanceDays = attendanceData.filter(item => item.percentage >= 80).length;

  return (
    <div className="p-4 space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Attendance Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Class</label>
              <Select value={selectedClass} onValueChange={onClassSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map(className => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Month</label>
              <Select value={selectedMonth} onValueChange={onDateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                  <SelectItem value="2024-02">February 2024</SelectItem>
                  <SelectItem value="2024-03">March 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{averageAttendance}%</div>
              <p className="text-xs text-muted-foreground">Avg Attendance</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{totalClasses}</div>
              <p className="text-xs text-muted-foreground">Total Classes</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{highAttendanceDays}</div>
              <p className="text-xs text-muted-foreground">Good Days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart/Table Toggle */}
      <div className="flex gap-2">
        <Button
          variant={viewType === 'table' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewType('table')}
          className="flex-1"
        >
          Table View
        </Button>
        <Button
          variant={viewType === 'chart' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setViewType('chart')}
          className="flex-1"
        >
          Chart View
        </Button>
      </div>

      {/* Data Display */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Attendance Data</CardTitle>
              <CardDescription>{selectedClass} - {selectedMonth}</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {viewType === 'table' ? (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {attendanceData.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No attendance data found</p>
                  <p className="text-xs">Select a class and month to view reports</p>
                </div>
              ) : (
                attendanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
                    <div>
                      <p className="font-medium text-sm">{item.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.present}/{item.total} students
                      </p>
                    </div>
                    <Badge 
                      variant={item.percentage >= 80 ? 'default' : item.percentage >= 60 ? 'secondary' : 'destructive'}
                      className={
                        item.percentage >= 80 ? 'bg-success hover:bg-success/90' : ''
                      }
                    >
                      {item.percentage}%
                    </Badge>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Chart visualization</p>
                <p className="text-xs">Coming soon</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};