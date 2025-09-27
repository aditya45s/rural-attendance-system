import { useState } from 'react';
import { LogIn, User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginScreenProps {
  onLogin: (teacherId: string, password: string) => void;
  isLoading?: boolean;
}

export const LoginScreen = ({ onLogin, isLoading = false }: LoginScreenProps) => {
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(teacherId, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">EduTrace</CardTitle>
          <CardDescription>
            Secure teacher login for attendance management
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teacherId">Teacher ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="teacherId"
                  type="text"
                  placeholder="Enter your Teacher ID"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
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
              disabled={isLoading || !teacherId || !password}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Button variant="link" className="text-xs text-muted-foreground">
              Forgot your password?
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};