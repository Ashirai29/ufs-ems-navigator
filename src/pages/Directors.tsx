import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { Mail, Calendar as CalendarIcon, Clock, User, Send, CheckCircle } from "lucide-react";

const Directors = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [messageContent, setMessageContent] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const directors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      position: "Program Director - Bachelor of Commerce",
      email: "sarah.johnson@ufs.ac.za",
      specialties: ["Accounting", "Finance", "Business Strategy"],
      availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      dailyCapacity: 15,
      bookedSlots: 8
    },
    {
      id: "2", 
      name: "Prof. Michael Chen",
      position: "Program Director - Economic Sciences",
      email: "michael.chen@ufs.ac.za",
      specialties: ["Economics", "Policy Analysis", "Research Methods"],
      availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      dailyCapacity: 12,
      bookedSlots: 12
    },
    {
      id: "3",
      name: "Dr. Lisa Williams", 
      position: "Program Director - Honours Programs",
      email: "lisa.williams@ufs.ac.za",
      specialties: ["Advanced Business", "Leadership", "Strategic Management"],
      availableDays: ["Monday", "Wednesday", "Friday"],
      dailyCapacity: 10,
      bookedSlots: 3
    },
    {
      id: "4",
      name: "Prof. David Brown",
      position: "Program Director - MBA Program", 
      email: "david.brown@ufs.ac.za",
      specialties: ["Executive Leadership", "Innovation", "Global Business"],
      availableDays: ["Monday", "Tuesday", "Thursday"],
      dailyCapacity: 8,
      bookedSlots: 5
    },
    {
      id: "5",
      name: "Dr. Amanda Taylor",
      position: "Program Director - Accounting Sciences",
      email: "amanda.taylor@ufs.ac.za", 
      specialties: ["Professional Accounting", "Auditing", "Taxation"],
      availableDays: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      dailyCapacity: 15,
      bookedSlots: 6
    }
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  useEffect(() => {
    const user = localStorage.getItem("ems_current_user");
    if (!user) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  const handleSendMessage = (directorId: string, directorName: string) => {
    if (!messageContent.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending message
    toast({
      title: "Message sent successfully",
      description: `Your message has been sent to ${directorName}. They will respond within 24 hours.`,
    });
    setMessageContent("");
  };

  const handleScheduleMeeting = (directorId: string, directorName: string) => {
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "Complete selection required",
        description: "Please select both date and time for your meeting.",
        variant: "destructive",
      });
      return;
    }

    const meetingData = {
      id: Date.now().toString(),
      directorId,
      directorName,
      date: selectedDate.toISOString(),
      timeSlot: selectedTimeSlot,
      status: "scheduled"
    };

    // Update user's scheduled meetings
    const updatedUser = { ...currentUser };
    if (!updatedUser.scheduledMeetings) {
      updatedUser.scheduledMeetings = [];
    }
    updatedUser.scheduledMeetings.push(meetingData);
    
    setCurrentUser(updatedUser);
    localStorage.setItem("ems_current_user", JSON.stringify(updatedUser));

    // Update users array
    const users = JSON.parse(localStorage.getItem("ems_users") || "[]");
    const userIndex = users.findIndex((u: any) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("ems_users", JSON.stringify(users));
    }

    toast({
      title: "Meeting scheduled successfully",
      description: `Your meeting with ${directorName} is scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTimeSlot}.`,
    });
    
    setSelectedTimeSlot("");
  };

  const getAvailabilityStatus = (director: any) => {
    if (director.bookedSlots >= director.dailyCapacity) {
      return { status: "full", text: "Fully Booked", color: "bg-red-100 text-red-800" };
    } else if (director.bookedSlots >= director.dailyCapacity * 0.8) {
      return { status: "limited", text: "Limited Slots", color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { status: "available", text: "Available", color: "bg-green-100 text-green-800" };
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentUser={currentUser} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Program Directors
          </h1>
          <p className="text-muted-foreground">
            Connect with our experienced program directors for academic guidance and support.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {directors.map((director) => {
            const availability = getAvailabilityStatus(director);
            
            return (
              <Card key={director.id} className="hover:shadow-card-custom transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{director.name}</CardTitle>
                        <CardDescription>{director.position}</CardDescription>
                      </div>
                    </div>
                    <Badge className={availability.color}>
                      {availability.text}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-2">
                      {director.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm">
                    <p className="text-muted-foreground mb-1">Email: {director.email}</p>
                    <p className="text-muted-foreground">
                      Available: {director.availableDays.join(", ")}
                    </p>
                    <p className="text-muted-foreground">
                      Capacity: {director.bookedSlots}/{director.dailyCapacity} slots booked today
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {/* Send Message Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="flex-1">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Send Message to {director.name}</DialogTitle>
                          <DialogDescription>
                            Compose your message and they will respond within 24 hours.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                              id="message"
                              placeholder="Type your message here..."
                              value={messageContent}
                              onChange={(e) => setMessageContent(e.target.value)}
                              rows={5}
                            />
                          </div>
                          <Button 
                            onClick={() => handleSendMessage(director.id, director.name)}
                            className="w-full"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* Schedule Meeting Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="flex-1"
                          disabled={availability.status === "full"}
                        >
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {availability.status === "full" ? "Fully Booked" : "Schedule Meeting"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Schedule Meeting with {director.name}</DialogTitle>
                          <DialogDescription>
                            Select a date and time for your meeting.
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Select Date</Label>
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              className="rounded-md border p-3 pointer-events-auto"
                              disabled={(date) => {
                                const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
                                return !director.availableDays.includes(dayName) || date < new Date();
                              }}
                            />
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium mb-2 block">Available Time Slots</Label>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                              {timeSlots.map((time) => (
                                <Button
                                  key={time}
                                  variant={selectedTimeSlot === time ? "default" : "outline"}
                                  className="w-full justify-start"
                                  onClick={() => setSelectedTimeSlot(time)}
                                >
                                  <Clock className="w-4 h-4 mr-2" />
                                  {time}
                                </Button>
                              ))}
                            </div>
                            
                            {selectedDate && selectedTimeSlot && (
                              <div className="mt-4 p-3 bg-accent rounded-lg">
                                <p className="text-sm font-medium flex items-center">
                                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                                  Meeting Details
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedDate.toLocaleDateString()} at {selectedTimeSlot}
                                </p>
                              </div>
                            )}
                            
                            <Button 
                              onClick={() => handleScheduleMeeting(director.id, director.name)}
                              className="w-full mt-4"
                              disabled={!selectedDate || !selectedTimeSlot}
                            >
                              Confirm Meeting
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Directors;