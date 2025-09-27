import { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Shield, AlertTriangle, CheckCircle, Navigation } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  status: 'present' | 'late' | 'absent' | 'outside-zone';
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  checkInTime?: string;
  distance?: number; // distance from school in meters
}

interface TeacherAttendanceScreenProps {
  onBack: () => void;
}

// Mock geofence center (school location)
const SCHOOL_LOCATION = {
  latitude: 28.6139,
  longitude: 77.2090,
  name: "Delhi Public School"
};

const GEOFENCE_RADIUS = 100; // 100 meters

// Mock teacher data
const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    subject: 'Mathematics',
    status: 'present',
    location: { latitude: 28.6140, longitude: 77.2091, accuracy: 5 },
    checkInTime: '08:45 AM',
    distance: 15
  },
  {
    id: '2',
    name: 'Mrs. Priya Sharma',
    subject: 'English',
    status: 'present',
    location: { latitude: 28.6138, longitude: 77.2089, accuracy: 8 },
    checkInTime: '08:30 AM',
    distance: 25
  },
  {
    id: '3',
    name: 'Mr. Arjun Singh',
    subject: 'Science',
    status: 'late',
    location: { latitude: 28.6141, longitude: 77.2092, accuracy: 12 },
    checkInTime: '09:15 AM',
    distance: 35
  },
  {
    id: '4',
    name: 'Ms. Sneha Patel',
    subject: 'History',
    status: 'outside-zone',
    location: { latitude: 28.6200, longitude: 77.2150, accuracy: 15 },
    distance: 850
  },
  {
    id: '5',
    name: 'Dr. Vikram Rao',
    subject: 'Physics',
    status: 'absent'
  }
];

export const TeacherAttendanceScreen = ({ onBack }: TeacherAttendanceScreenProps) => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const { toast } = useToast();

  const getStatusColor = (status: Teacher['status']) => {
    switch (status) {
      case 'present': return 'bg-success text-success-foreground';
      case 'late': return 'bg-syncing text-white';
      case 'absent': return 'bg-destructive text-destructive-foreground';
      case 'outside-zone': return 'bg-offline text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: Teacher['status']) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      case 'absent': return <Users className="h-4 w-4" />;
      case 'outside-zone': return <AlertTriangle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getCurrentLocation = () => {
    setIsLocationLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setIsLocationLoading(false);
          toast({
            title: "Location updated",
            description: "Current location has been retrieved successfully.",
          });
        },
        (error) => {
          setIsLocationLoading(false);
          toast({
            title: "Location error",
            description: "Unable to get current location. Using mock data.",
            variant: "destructive",
          });
        }
      );
    } else {
      setIsLocationLoading(false);
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Using mock data.",
        variant: "destructive",
      });
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const presentTeachers = teachers.filter(t => t.status === 'present').length;
  const lateTeachers = teachers.filter(t => t.status === 'late').length;
  const absentTeachers = teachers.filter(t => t.status === 'absent').length;
  const outsideTeachers = teachers.filter(t => t.status === 'outside-zone').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Teacher Attendance Tracking</h1>
          <p className="text-muted-foreground">Real-time location monitoring with geofencing</p>
        </div>
        <Button onClick={onBack} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      {/* Geofence Info */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Geofence Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">School Location</p>
              <p className="text-sm text-muted-foreground">{SCHOOL_LOCATION.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Geofence Radius</p>
              <p className="text-sm text-muted-foreground">{GEOFENCE_RADIUS} meters</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={getCurrentLocation}
                disabled={isLocationLoading}
              >
                <Navigation className="h-4 w-4 mr-2" />
                {isLocationLoading ? 'Updating...' : 'Update Location'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{presentTeachers}</div>
            <p className="text-xs text-muted-foreground">Within geofence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <Clock className="h-4 w-4 text-syncing" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-syncing">{lateTeachers}</div>
            <p className="text-xs text-muted-foreground">Arrived after 9:00 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outside Zone</CardTitle>
            <AlertTriangle className="h-4 w-4 text-offline" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-offline">{outsideTeachers}</div>
            <p className="text-xs text-muted-foreground">Beyond geofence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <Users className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{absentTeachers}</div>
            <p className="text-xs text-muted-foreground">No check-in</p>
          </CardContent>
        </Card>
      </div>

      {/* Teacher List */}
      <Card>
        <CardHeader>
          <CardTitle>Teacher Status</CardTitle>
          <CardDescription>
            Real-time location and attendance status of all teachers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">{teacher.name}</h3>
                    <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                    {teacher.checkInTime && (
                      <p className="text-xs text-muted-foreground">
                        Check-in: {teacher.checkInTime}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {teacher.location && (
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Distance from school</p>
                      <p className="font-medium">{teacher.distance}m</p>
                      <p className="text-xs text-muted-foreground">
                        Accuracy: ±{teacher.location.accuracy}m
                      </p>
                    </div>
                  )}
                  
                  <Badge className={getStatusColor(teacher.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(teacher.status)}
                      {teacher.status.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </div>
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};