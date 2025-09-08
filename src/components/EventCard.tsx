import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  maxAttendees: number;
  isRegistered?: boolean;
  organizer: string;
}

interface EventCardProps {
  event: Event;
  onRegister?: (eventId: string) => void;
  showActions?: boolean;
}

const EventCard = ({ event, onRegister, showActions = true }: EventCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'tech': return 'bg-accent text-accent-foreground';
      case 'cultural': return 'bg-secondary text-secondary-foreground';
      case 'sports': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const isFullyBooked = event.attendees >= event.maxAttendees;
  const spotsLeft = event.maxAttendees - event.attendees;

  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge className={getCategoryColor(event.category)}>
            {event.category}
          </Badge>
          <div className="text-xs text-muted-foreground">
            by {event.organizer}
          </div>
        </div>
        <h3 className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4" />
          <span className="text-muted-foreground">
            {event.attendees}/{event.maxAttendees} attendees
          </span>
          {spotsLeft <= 10 && spotsLeft > 0 && (
            <Badge variant="outline" className="text-xs">
              Only {spotsLeft} spots left!
            </Badge>
          )}
        </div>
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-0">
          {event.isRegistered ? (
            <Button variant="outline" className="w-full" disabled>
              Already Registered
            </Button>
          ) : isFullyBooked ? (
            <Button variant="destructive" className="w-full" disabled>
              Event Full
            </Button>
          ) : (
            <Button 
              className="w-full bg-gradient-hero hover:opacity-90"
              onClick={() => onRegister?.(event.id)}
            >
              Register Now
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default EventCard;