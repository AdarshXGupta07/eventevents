import { Calendar, Plus, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavigationProps {
  isLoggedIn?: boolean;
  userRole?: 'organizer' | 'student';
  userName?: string;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateEvent?: () => void;
  onViewEvents?: () => void;
}

const Navigation = ({ 
  isLoggedIn = false, 
  userRole = 'student',
  userName = 'John Doe',
  onLogin,
  onLogout,
  onCreateEvent,
  onViewEvents
}: NavigationProps) => {
  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              EventSphere
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost" 
                  onClick={onViewEvents}
                  className="hidden sm:flex"
                >
                  Browse Events
                </Button>
                
                {userRole === 'organizer' && (
                  <Button 
                    onClick={onCreateEvent}
                    className="bg-gradient-hero hover:opacity-90 hidden sm:flex"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                )}

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-hero text-white">
                          {userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium text-foreground">{userName}</p>
                      <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onViewEvents} className="sm:hidden">
                      <Calendar className="mr-2 h-4 w-4" />
                      Browse Events
                    </DropdownMenuItem>
                    {userRole === 'organizer' && (
                      <DropdownMenuItem onClick={onCreateEvent} className="sm:hidden">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Event
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={onLogin} className="bg-gradient-hero hover:opacity-90">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;