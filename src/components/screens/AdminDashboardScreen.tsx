import { School, Users, BarChart3, Shield, MapPin, Clock, Calendar, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminRole } from './AdminLoginScreen';

interface AdminDashboardScreenProps {
  adminRole: AdminRole;
  adminName: string;
  onViewSchools?: () => void;
  onViewTeachers?: () => void;
  onViewReports?: () => void;
  onManageUsers?: () => void;
  onTeacherAttendance?: () => void;
  onSystemSettings?: () => void;
}

const getRoleColor = (role: AdminRole) => {
  switch (role) {
    case 'super-admin': return 'bg-gradient-to-r from-admin-super to-admin-super';
    case 'school-admin': return 'bg-gradient-to-r from-admin-school to-admin-school';
    case 'class-admin': return 'bg-gradient-to-r from-admin-class to-admin-class';
  }
};

const getRolePermissions = (role: AdminRole) => {
  switch (role) {
    case 'super-admin':
      return {
        schools: 15,
        teachers: 245,
        students: 3420,
        permissions: ['All Schools', 'System Config', 'User Management', 'Reports', 'Teacher Tracking']
      };
    case 'school-admin':
      return {
        schools: 1,
        teachers: 32,
        students: 680,
        permissions: ['School Data', 'Teacher Management', 'Reports', 'Teacher Tracking']
      };
    case 'class-admin':
      return {
        schools: 1,
        teachers: 8,
        students: 240,
        permissions: ['Class Data', 'Student Reports']
      };
  }
};

export const AdminDashboardScreen = ({
  adminRole,
  adminName,
  onViewSchools,
  onViewTeachers,
  onViewReports,
  onManageUsers,
  onTeacherAttendance,
  onSystemSettings
}: AdminDashboardScreenProps) => {
  const permissions = getRolePermissions(adminRole);
  const roleColorClass = getRoleColor(adminRole);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className={`${roleColorClass} rounded-lg p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-white/90 mt-1">Welcome back, {adminName}</p>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {adminRole.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Badge>
            <p className="text-sm text-white/80 mt-1">Last login: Today 9:32 AM</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Schools</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissions.schools}</div>
            <p className="text-xs text-muted-foreground">
              {adminRole === 'super-admin' ? 'Total schools' : 'Accessible schools'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissions.teachers}</div>
            <p className="text-xs text-muted-foreground">
              Active teachers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{permissions.students}</div>
            <p className="text-xs text-muted-foreground">
              Enrolled students
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access Permissions
          </CardTitle>
          <CardDescription>
            Your current role allows access to the following features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {permissions.permissions.map((permission) => (
              <Badge key={permission} variant="outline">
                {permission}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(adminRole === 'super-admin' || adminRole === 'school-admin') && (
          <>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewSchools}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  School Management
                </CardTitle>
                <CardDescription>
                  View and manage school data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewTeachers}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Teacher Management
                </CardTitle>
                <CardDescription>
                  Manage teacher accounts and permissions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onTeacherAttendance}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Teacher Attendance
                </CardTitle>
                <CardDescription>
                  Track teacher location and attendance
                </CardDescription>
              </CardHeader>
            </Card>
          </>
        )}

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewReports}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Reports & Analytics
            </CardTitle>
            <CardDescription>
              View attendance reports and analytics
            </CardDescription>
          </CardHeader>
        </Card>

        {adminRole === 'super-admin' && (
          <>
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onManageUsers}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage admin accounts and roles
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onSystemSettings}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Settings
                </CardTitle>
                <CardDescription>
                  Configure system-wide settings
                </CardDescription>
              </CardHeader>
            </Card>
          </>
        )}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Daily attendance report generated for March 12</span>
              <span className="text-muted-foreground ml-auto">2 hours ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>New teacher account created: Sarah Johnson</span>
              <span className="text-muted-foreground ml-auto">5 hours ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Teacher attendance alerts: 2 teachers outside geofence</span>
              <span className="text-muted-foreground ml-auto">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};