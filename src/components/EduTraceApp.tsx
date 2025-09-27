import { useState, useEffect } from 'react';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { LoginScreen } from '@/components/screens/LoginScreen';
import { AdminLoginScreen, AdminRole } from '@/components/screens/AdminLoginScreen';
import { AdminDashboardScreen } from '@/components/screens/AdminDashboardScreen';
import { TeacherAttendanceScreen } from '@/components/screens/TeacherAttendanceScreen';
import { DashboardScreen } from '@/components/screens/DashboardScreen';
import { AttendanceCaptureScreen } from '@/components/screens/AttendanceCaptureScreen';
import { AttendanceSummaryScreen } from '@/components/screens/AttendanceSummaryScreen';
import { SyncStatus } from '@/components/sync/SyncStatus';
import { ReportsScreen } from '@/components/screens/ReportsScreen';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

type Screen = 'login' | 'admin-login' | 'dashboard' | 'admin-dashboard' | 'teacher-attendance' | 'attendance-capture' | 'attendance-summary' | 'sync' | 'reports';
type BottomTab = 'home' | 'attendance' | 'reports' | 'sync';
type UserType = 'teacher' | 'admin';

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent';
}

interface SyncRecord {
  id: string;
  type: 'attendance' | 'report';
  className: string;
  date: string;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
  progress?: number;
}

// Mock data
const mockStudents = [
  { id: '1', name: 'Rahul Sharma', rollNumber: '001', confidence: 0.95 },
  { id: '2', name: 'Priya Patel', rollNumber: '002', confidence: 0.88 },
  { id: '3', name: 'Arjun Singh', rollNumber: '003', confidence: 0.92 },
  { id: '4', name: 'Sneha Kumar', rollNumber: '004', confidence: 0.85 },
  { id: '5', name: 'Vikram Rao', rollNumber: '005' },
  { id: '6', name: 'Anjali Das', rollNumber: '006' },
];

const mockClasses = ['Class 10A', 'Class 10B', 'Class 9A', 'Class 9B'];

const mockAttendanceData = [
  { date: '2024-03-01', present: 28, total: 30, percentage: 93 },
  { date: '2024-03-02', present: 25, total: 30, percentage: 83 },
  { date: '2024-03-03', present: 22, total: 30, percentage: 73 },
  { date: '2024-03-04', present: 29, total: 30, percentage: 97 },
  { date: '2024-03-05', present: 26, total: 30, percentage: 87 },
];

export const EduTraceApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [activeTab, setActiveTab] = useState<BottomTab>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>('teacher');
  const [teacherName, setTeacherName] = useState('');
  const [adminName, setAdminName] = useState('');
  const [adminRole, setAdminRole] = useState<AdminRole>('class-admin');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasCapture, setHasCapture] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Class 10A');
  const [syncRecords, setSyncRecords] = useState<SyncRecord[]>([
    {
      id: '1',
      type: 'attendance',
      className: 'Class 10A',
      date: '2024-03-08',
      status: 'pending'
    },
    {
      id: '2',
      type: 'attendance',
      className: 'Class 9B',
      date: '2024-03-07',
      status: 'pending'
    }
  ]);

  const { toast } = useToast();

  // Monitor online status
  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleLogin = async (teacherId: string, password: string) => {
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoggedIn(true);
    setUserType('teacher');
    setTeacherName(`Teacher ${teacherId}`);
    setCurrentScreen('dashboard');
    toast({
      title: "Login successful",
      description: "Welcome back to EduTrace!",
    });
  };

  const handleAdminLogin = async (adminId: string, password: string, role: AdminRole) => {
    // Simulate admin login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoggedIn(true);
    setUserType('admin');
    setAdminName(`Admin ${adminId}`);
    setAdminRole(role);
    setCurrentScreen('admin-dashboard');
    toast({
      title: "Admin login successful",
      description: `Welcome back, ${role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}!`,
    });
  };

  const switchToAdminLogin = () => {
    setCurrentScreen('admin-login');
  };

  const switchToTeacherLogin = () => {
    setCurrentScreen('login');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTeacherName('');
    setAdminName('');
    setUserType('teacher');
    setCurrentScreen('login');
    setActiveTab('home');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const handleTabChange = (tab: BottomTab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('dashboard');
        break;
      case 'attendance':
        setCurrentScreen('attendance-capture');
        setHasCapture(false);
        setDetectedFaces(0);
        break;
      case 'reports':
        setCurrentScreen('reports');
        break;
      case 'sync':
        setCurrentScreen('sync');
        break;
    }
  };

  const handleCapture = async () => {
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDetectedFaces(4);
    setHasCapture(true);
    setIsProcessing(false);
    toast({
      title: "Faces detected",
      description: "4 students identified in the image",
    });
  };

  const handleProceedToSummary = () => {
    setCurrentScreen('attendance-summary');
  };

  const handleRetake = () => {
    setHasCapture(false);
    setDetectedFaces(0);
  };

  const handleSaveAttendance = (records: AttendanceRecord[]) => {
    // Add to sync queue
    const newSyncRecord: SyncRecord = {
      id: Date.now().toString(),
      type: 'attendance',
      className: selectedClass,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    setSyncRecords(prev => [...prev, newSyncRecord]);
    setCurrentScreen('dashboard');
    setActiveTab('home');
    
    toast({
      title: "Attendance saved",
      description: `Attendance for ${selectedClass} saved locally. Will sync when online.`,
    });
  };

  const handleSyncAll = async () => {
    const pendingRecords = syncRecords.filter(r => r.status === 'pending');
    
    for (const record of pendingRecords) {
      setSyncRecords(prev => 
        prev.map(r => r.id === record.id ? { ...r, status: 'syncing' as const } : r)
      );
      
      // Simulate sync
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSyncRecords(prev => 
        prev.map(r => r.id === record.id ? { ...r, status: 'completed' as const } : r)
      );
    }
    
    toast({
      title: "Sync completed",
      description: `${pendingRecords.length} records synced successfully.`,
    });
  };

  const handleRetryFailed = () => {
    setSyncRecords(prev => 
      prev.map(r => r.status === 'failed' ? { ...r, status: 'pending' } : r)
    );
  };

  const syncPending = syncRecords.filter(r => r.status === 'pending').length;

  if (!isLoggedIn) {
    if (currentScreen === 'admin-login') {
      return (
        <div>
          <AdminLoginScreen onLogin={handleAdminLogin} />
          <div className="fixed bottom-4 left-4">
            <Button variant="outline" size="sm" onClick={switchToTeacherLogin}>
              Teacher Login
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div>
        <LoginScreen onLogin={handleLogin} />
        <div className="fixed bottom-4 right-4">
          <Button variant="outline" size="sm" onClick={switchToAdminLogin}>
            Admin Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavigation
        isOnline={isOnline}
        teacherName={userType === 'teacher' ? teacherName : adminName}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 overflow-auto">
        {currentScreen === 'admin-dashboard' && (
          <AdminDashboardScreen
            adminRole={adminRole}
            adminName={adminName}
            onViewSchools={() => {}}
            onViewTeachers={() => {}}
            onViewReports={() => setCurrentScreen('reports')}
            onManageUsers={() => {}}
            onTeacherAttendance={() => setCurrentScreen('teacher-attendance')}
            onSystemSettings={() => {}}
          />
        )}

        {currentScreen === 'teacher-attendance' && (
          <TeacherAttendanceScreen
            onBack={() => {
              if (userType === 'admin') {
                setCurrentScreen('admin-dashboard');
              } else {
                setCurrentScreen('dashboard');
              }
            }}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            onTakeAttendance={() => handleTabChange('attendance')}
            onViewReports={() => handleTabChange('reports')}
            onSyncData={() => handleTabChange('sync')}
            onSettings={() => {}}
            onTeacherAttendance={() => setCurrentScreen('teacher-attendance')}
            syncPending={syncPending}
            todayClasses={3}
          />
        )}
        
        {currentScreen === 'attendance-capture' && (
          <AttendanceCaptureScreen
            className={selectedClass}
            onCapture={handleCapture}
            onRetake={handleRetake}
            onProceed={handleProceedToSummary}
            detectedFaces={detectedFaces}
            isProcessing={isProcessing}
            hasCapture={hasCapture}
          />
        )}
        
        {currentScreen === 'attendance-summary' && (
          <AttendanceSummaryScreen
            className={selectedClass}
            date={new Date().toLocaleDateString()}
            detectedStudents={mockStudents.filter((_, i) => i < detectedFaces)}
            allStudents={mockStudents}
            onSave={handleSaveAttendance}
            onEdit={() => setCurrentScreen('attendance-capture')}
          />
        )}
        
        {currentScreen === 'sync' && (
          <div className="p-4">
            <SyncStatus
              records={syncRecords}
              onSyncAll={handleSyncAll}
              onRetryFailed={handleRetryFailed}
              isOnline={isOnline}
            />
          </div>
        )}
        
        {currentScreen === 'reports' && (
          <ReportsScreen
            classes={mockClasses}
            onClassSelect={setSelectedClass}
            onDateSelect={() => {}}
            attendanceData={mockAttendanceData}
            selectedClass={selectedClass}
            selectedMonth="2024-03"
          />
        )}
      </main>
      
      {userType === 'teacher' && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          syncPending={syncPending}
        />
      )}
    </div>
  );
};