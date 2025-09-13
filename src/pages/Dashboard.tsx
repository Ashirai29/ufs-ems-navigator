import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/CourseCard";
import { Navigation } from "@/components/Navigation";
import { Search, Filter, BookOpen, Users, Calendar, Bell } from "lucide-react";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("ems_current_user");
    if (!user) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(user));
    
    // Initialize courses data
    const coursesData = [
      {
        id: "1",
        title: "Bachelor of Commerce (BCom)",
        description: "A comprehensive business degree covering accounting, finance, marketing, and management.",
        category: "undergraduate",
        duration: "3 years",
        creditLoad: 360,
        modules: ["Financial Accounting", "Marketing Management", "Business Statistics", "Economics"],
        careerOpportunities: ["Accountant", "Marketing Manager", "Business Analyst", "Financial Advisor"],
        programDirector: "Dr. Sarah Johnson"
      },
      {
        id: "2", 
        title: "Bachelor of Economic Sciences (BEconSc)",
        description: "Focus on economic theory, econometrics, and policy analysis.",
        category: "undergraduate",
        duration: "3 years", 
        creditLoad: 360,
        modules: ["Microeconomics", "Macroeconomics", "Econometrics", "Development Economics"],
        careerOpportunities: ["Economist", "Policy Analyst", "Research Consultant", "Banking Analyst"],
        programDirector: "Prof. Michael Chen"
      },
      {
        id: "3",
        title: "Honours in Business Administration",
        description: "Advanced study in business strategy, leadership, and organizational behavior.",
        category: "honours",
        duration: "1 year",
        creditLoad: 120, 
        modules: ["Strategic Management", "Advanced Finance", "Leadership Studies", "Research Methodology"],
        careerOpportunities: ["Business Consultant", "Senior Manager", "CEO", "Entrepreneur"],
        programDirector: "Dr. Lisa Williams"
      },
      {
        id: "4",
        title: "Master of Business Administration (MBA)",
        description: "Executive-level program for experienced professionals seeking leadership roles.",
        category: "postgraduate",
        duration: "2 years",
        creditLoad: 180,
        modules: ["Executive Leadership", "Global Strategy", "Innovation Management", "Corporate Finance"],
        careerOpportunities: ["Executive Director", "Managing Director", "Chief Executive Officer", "Business Owner"],
        programDirector: "Prof. David Brown"
      },
      {
        id: "5",
        title: "Bachelor of Accounting Sciences",
        description: "Professional accounting degree with CA(SA) pathway preparation.",
        category: "undergraduate", 
        duration: "3 years",
        creditLoad: 360,
        modules: ["Financial Accounting", "Management Accounting", "Auditing", "Taxation"],
        careerOpportunities: ["Chartered Accountant", "Auditor", "Tax Consultant", "CFO"],
        programDirector: "Dr. Amanda Taylor"
      }
    ];
    
    setCourses(coursesData);
    setFilteredCourses(coursesData);
  }, [navigate]);

  useEffect(() => {
    let filtered = courses;
    
    if (selectedFilter !== "all") {
      filtered = filtered.filter(course => course.category === selectedFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.modules.some((module: string) => module.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedFilter]);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentUser={currentUser} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Welcome back, {currentUser.fullName}
          </h1>
          <p className="text-muted-foreground">
            Explore courses, connect with program directors, and manage your academic journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-primary text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
              <BookOpen className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-secondary text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registered Courses</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUser.registeredCourses?.length || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Meetings</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{currentUser.scheduledMeetings?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses, modules, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => setSelectedFilter("all")}
              className="min-w-fit"
            >
              All Courses
            </Button>
            <Button
              variant={selectedFilter === "undergraduate" ? "default" : "outline"}
              onClick={() => setSelectedFilter("undergraduate")}
              className="min-w-fit"
            >
              Undergraduate
            </Button>
            <Button
              variant={selectedFilter === "honours" ? "default" : "outline"}
              onClick={() => setSelectedFilter("honours")}
              className="min-w-fit"
            >
              Honours
            </Button>
            <Button
              variant={selectedFilter === "postgraduate" ? "default" : "outline"}
              onClick={() => setSelectedFilter("postgraduate")}
              className="min-w-fit"
            >
              Postgraduate
            </Button>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} currentUser={currentUser} />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;