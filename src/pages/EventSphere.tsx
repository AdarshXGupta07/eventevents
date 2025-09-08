import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import EventCard from "@/components/EventCard";
import AuthModal from "@/components/AuthModal";
import { mockEvents, mockUser } from "@/data/mockEvents";
import { Search, Filter, Calendar, Users, Trophy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-events.jpg";

const EventSphere = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    role: 'organizer' | 'student';
    registeredEvents: string[];
  }>(mockUser);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [events, setEvents] = useState(mockEvents);
  const { toast } = useToast();

  const handleLogin = (email: string, password: string, role: 'organizer' | 'student') => {
    setIsLoggedIn(true);
    setUser({ ...user, email, role });
    toast({
      title: "Welcome back!",
      description: `Logged in successfully as ${role}`,
    });
  };

  const handleRegister = (email: string, password: string, name: string, role: 'organizer' | 'student') => {
    setIsLoggedIn(true);
    setUser({ ...user, email, name, role });
    toast({
      title: "Account created!",
      description: `Welcome to EventSphere, ${name}!`,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ ...user, role: 'student' });
    toast({
      title: "Signed out",
      description: "Come back soon!",
    });
  };

  const handleRegisterForEvent = (eventId: string) => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }

    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, attendees: event.attendees + 1, isRegistered: true }
        : event
    ));

    const event = events.find(e => e.id === eventId);
    toast({
      title: "Registration successful!",
      description: `You're registered for ${event?.title}`,
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', 'tech', 'cultural', 'sports'];
  const stats = [
    { label: 'Active Events', value: events.length, icon: Calendar },
    { label: 'Total Attendees', value: events.reduce((sum, event) => sum + event.attendees, 0), icon: Users },
    { label: 'Categories', value: new Set(events.map(e => e.category)).size, icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        isLoggedIn={isLoggedIn}
        userRole={user.role}
        userName={user.name}
        onLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onViewEvents={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Event management and networking"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-purple-200">
                Events
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Connect, learn, and grow through incredible experiences. Join thousands of students and organizers making memories together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 px-8 py-3"
                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Events
              </Button>
              {!isLoggedIn && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-3"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Get Started
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-3">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Upcoming Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover workshops, competitions, cultural events, and more happening in your community
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="flex flex-wrap gap-2 mb-6 max-w-4xl mx-auto">
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm("")} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="gap-1">
                  Category: {selectedCategory}
                  <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-destructive">×</button>
                </Badge>
              )}
            </div>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegisterForEvent}
              />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground mb-2">No events found</p>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default EventSphere;