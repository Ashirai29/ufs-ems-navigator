import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Hash, 
  BookOpen, 
  Calendar, 
  Clock, 
  Award,
  Edit,
  Trash2,
  CheckCircle
} from "lucide-react";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("ems_current_user");
    if (!user) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  const handleUnregisterCourse = (courseId: string, courseTitle: string) => {
    const updatedUser = { ...currentUser };
    updatedUser.registeredCourses = updatedUser.registeredCourses?.filter(
      (course: any) => course.id !== courseId
    ) || [];
    
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
      title: "Course removed",
      description: `You have unregistered from ${courseTitle}`,
    });
  };

  const handleCancelMeeting = (meetingId: string, directorName: string) => {
    const updatedUser = { ...currentUser };
    updatedUser.scheduledMeetings = updatedUser.scheduledMeetings?.filter(
      (meeting: any) => meeting.id !== meetingId
    ) || [];
    
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
      title: "Meeting cancelled",
      description: `Your meeting with ${directorName} has been cancelled`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentUser={currentUser} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            My Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your account information and academic activities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {currentUser.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentUser.fullName}</CardTitle>
                    <CardDescription>UFS EMS Student</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{currentUser.email}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <span>{currentUser.studentNumber}</span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined {formatDate(currentUser.joinDate)}</span>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {currentUser.registeredCourses?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Registered Courses</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">
                      {currentUser.scheduledMeetings?.length || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Scheduled Meetings</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Registered Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Registered Courses ({currentUser.registeredCourses?.length || 0})
                </CardTitle>
                <CardDescription>
                  Courses you are currently registered for
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentUser.registeredCourses && currentUser.registeredCourses.length > 0 ? (
                  <div className="space-y-4">
                    {currentUser.registeredCourses.map((course: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{course.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Registered on {formatDate(course.registrationDate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Registered
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnregisterCourse(course.id, course.title)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      No registered courses
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't registered for any courses yet.
                    </p>
                    <Button onClick={() => navigate("/dashboard")}>
                      Browse Courses
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Scheduled Meetings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Scheduled Meetings ({currentUser.scheduledMeetings?.length || 0})
                </CardTitle>
                <CardDescription>
                  Your upcoming meetings with program directors
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentUser.scheduledMeetings && currentUser.scheduledMeetings.length > 0 ? (
                  <div className="space-y-4">
                    {currentUser.scheduledMeetings.map((meeting: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">{meeting.directorName}</h4>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(meeting.date)}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {meeting.timeSlot}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">
                            Scheduled
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelMeeting(meeting.id, meeting.directorName)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      No scheduled meetings
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You don't have any meetings scheduled yet.
                    </p>
                    <Button onClick={() => navigate("/directors")}>
                      Browse Directors
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;