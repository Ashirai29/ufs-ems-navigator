import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Clock, Award, TrendingUp, User, ChevronRight } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    creditLoad: number;
    modules: string[];
    careerOpportunities: string[];
    programDirector: string;
  };
  currentUser: any;
}

export const CourseCard = ({ course, currentUser }: CourseCardProps) => {
  const [isRegistered, setIsRegistered] = useState(
    currentUser.registeredCourses?.some((c: any) => c.id === course.id) || false
  );
  const { toast } = useToast();

  const handleRegistration = () => {
    const updatedUser = { ...currentUser };
    
    if (isRegistered) {
      // Unregister
      updatedUser.registeredCourses = updatedUser.registeredCourses?.filter((c: any) => c.id !== course.id) || [];
      setIsRegistered(false);
      toast({
        title: "Unregistered successfully",
        description: `You have unregistered from ${course.title}`,
      });
    } else {
      // Register
      if (!updatedUser.registeredCourses) {
        updatedUser.registeredCourses = [];
      }
      updatedUser.registeredCourses.push({
        id: course.id,
        title: course.title,
        registrationDate: new Date().toISOString()
      });
      setIsRegistered(true);
      toast({
        title: "Registered successfully",
        description: `You have registered for ${course.title}`,
      });
    }
    
    localStorage.setItem("ems_current_user", JSON.stringify(updatedUser));
    
    // Update users array
    const users = JSON.parse(localStorage.getItem("ems_users") || "[]");
    const userIndex = users.findIndex((u: any) => u.id === updatedUser.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("ems_users", JSON.stringify(users));
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "undergraduate": return "bg-blue-100 text-blue-800";
      case "honours": return "bg-purple-100 text-purple-800";
      case "postgraduate": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-card-custom transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className={`${getCategoryColor(course.category)} capitalize`}>
            {course.category}
          </Badge>
          {isRegistered && (
            <Badge variant="secondary">Registered</Badge>
          )}
        </div>
        <CardTitle className="text-lg font-bold text-primary">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span>{course.creditLoad} credits</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm">
          <User className="w-4 h-4 text-muted-foreground" />
          <span>{course.programDirector}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <BookOpen className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{course.title}</DialogTitle>
              <DialogDescription className="text-base">
                {course.description}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Program Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Duration:</strong> {course.duration}</p>
                    <p><strong>Credit Load:</strong> {course.creditLoad} credits</p>
                    <p><strong>Category:</strong> {course.category}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <User className="w-4 h-4 mr-2 text-primary" />
                    Program Director
                  </h4>
                  <p className="text-sm">{course.programDirector}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Contact Director
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-primary" />
                  Core Modules
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {course.modules.map((module, index) => (
                    <div key={index} className="flex items-center p-2 bg-accent rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                      <span className="text-sm">{module}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-3 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                  Career Opportunities
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {course.careerOpportunities.map((career, index) => (
                    <div key={index} className="flex items-center p-2 bg-secondary/10 rounded-lg">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-2" />
                      <span className="text-sm">{career}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          onClick={handleRegistration}
          variant={isRegistered ? "secondary" : "default"}
          className="flex-1"
        >
          {isRegistered ? "Unregister" : "Register"}
        </Button>
      </CardFooter>
    </Card>
  );
};