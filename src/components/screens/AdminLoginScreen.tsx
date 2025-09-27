import { useState } from 'react';
import { Shield, User, Lock, Crown, Settings, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type AdminRole = 'super-admin' | 'school-admin' | 'class-admin';

interface AdminLoginScreenProps {
  onLogin: (adminId: string, password: string, role: AdminRole) => void;
  isLoading?: boolean;
}

const roleIcons = {
  'super-admin': Crown,
  'school-admin': Settings,
  'class-admin': Users,
};

const roleNames = {
  'super-admin': 'Super Administrator',
  'school-admin': 'School Administrator',
  'class-admin': 'Class Administrator',
};

const roleDescriptions = {
  'super-admin': 'Full system access across all schools',
  'school-admin': 'Access to all classes within a school',
  'class-admin': 'Access to specific classes only',
};

export const AdminLoginScreen = ({ onLogin, isLoading = false }: AdminLoginScreenProps) => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<AdminRole>('class-admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(adminId, password, selectedRole);
  };

  const RoleIcon = roleIcons[selectedRole];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <Shield className="h-10 w-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Admin Portal</CardTitle>
          <CardDescription>
            Secure administrator access for EduTrace system
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Administrator Role</Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as AdminRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your admin role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleNames).map(([role, name]) => {
                    const Icon = roleIcons[role as AdminRole];
                    return (
                      <SelectItem key={role} value={role}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <RoleIcon className="h-3 w-3" />
                {roleDescriptions[selectedRole]}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminId">Administrator ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="adminId"
                  type="text"
                  placeholder="Enter your Admin ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !adminId || !password}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                  Signing In...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Sign In
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button variant="link" className="text-xs text-muted-foreground">
              Contact System Administrator
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};