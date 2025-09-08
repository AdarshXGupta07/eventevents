import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Users, Trophy } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string, role: 'organizer' | 'student') => void;
  onRegister: (email: string, password: string, name: string, role: 'organizer' | 'student') => void;
}

const AuthModal = ({ isOpen, onClose, onLogin, onRegister }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<'organizer' | 'student'>('student');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(email, password, name, role);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-hero rounded flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            Welcome to EventSphere
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>Account Type</Label>
                    <RadioGroup value={role} onValueChange={(value: 'organizer' | 'student') => setRole(value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="student-login" />
                        <Label htmlFor="student-login" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Student
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organizer" id="organizer-login" />
                        <Label htmlFor="organizer-login" className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          Event Organizer
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-gradient-hero hover:opacity-90">
                    Sign In
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Join EventSphere to discover amazing events
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label>I want to...</Label>
                    <RadioGroup value={role} onValueChange={(value: 'organizer' | 'student') => setRole(value)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="student-register" />
                        <Label htmlFor="student-register" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Discover and join events
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organizer" id="organizer-register" />
                        <Label htmlFor="organizer-register" className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" />
                          Organize and manage events
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-gradient-hero hover:opacity-90">
                    Create Account
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;