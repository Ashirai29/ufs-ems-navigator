import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Download, FileText, BookOpen, GraduationCap, Calendar, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Resources = () => {
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

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `${fileName} download has begun.`,
    });
  };

  const resources = [
    {
      id: "1",
      title: "UFS EMS Faculty Prospectus 2024",
      description: "Complete prospectus with all course information, admission requirements, and faculty overview.",
      type: "PDF",
      size: "2.4 MB",
      category: "Prospectus",
      icon: BookOpen,
      downloadUrl: "#"
    },
    {
      id: "2", 
      title: "Undergraduate Application Guide",
      description: "Step-by-step guide for undergraduate applications including required documents and deadlines.",
      type: "PDF",
      size: "1.8 MB",
      category: "Applications",
      icon: GraduationCap,
      downloadUrl: "#"
    },
    {
      id: "3",
      title: "Academic Calendar 2024",
      description: "Important dates, semester schedules, examination periods, and academic deadlines.",
      type: "PDF",
      size: "0.9 MB", 
      category: "Calendar",
      icon: Calendar,
      downloadUrl: "#"
    },
    {
      id: "4",
      title: "Course Registration Handbook",
      description: "Detailed instructions for course registration, credit requirements, and academic policies.",
      type: "PDF", 
      size: "1.5 MB",
      category: "Registration",
      icon: FileText,
      downloadUrl: "#"
    },
    {
      id: "5",
      title: "Student Information Brochure",
      description: "General information about campus life, student services, and support resources.",
      type: "PDF",
      size: "3.1 MB",
      category: "General",
      icon: Info,
      downloadUrl: "#"
    },
    {
      id: "6", 
      title: "Postgraduate Studies Guide",
      description: "Information on Honours, Masters, and PhD programs including admission criteria and research opportunities.",
      type: "PDF",
      size: "2.7 MB",
      category: "Postgraduate",
      icon: GraduationCap,
      downloadUrl: "#"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Prospectus": return "bg-gradient-primary text-white";
      case "Applications": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Calendar": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Registration": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "General": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Postgraduate": return "bg-gradient-secondary text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentUser={currentUser} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Resources & Downloads
          </h1>
          <p className="text-muted-foreground">
            Access important documents, guides, and resources for your academic journey.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Documents</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{resources.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {new Set(resources.map(r => r.category)).size}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Size</CardTitle>
              <Download className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {resources.reduce((acc, r) => acc + parseFloat(r.size), 0).toFixed(1)} MB
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => {
            const IconComponent = resource.icon;
            return (
              <Card key={resource.id} className="hover:shadow-card-custom transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${getCategoryColor(resource.category)}`}>
                      {resource.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {resource.type} • {resource.size}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button 
                    onClick={() => handleDownload(resource.title)}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help Section */}
        <Card className="mt-8 bg-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Need Help?
            </CardTitle>
            <CardDescription>
              If you have trouble accessing any documents or need additional resources, please contact the EMS Faculty office.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>Email:</strong> ems@ufs.ac.za</p>
              <p><strong>Phone:</strong> +27 51 401 2345</p>
              <p><strong>Office:</strong> Main Building, Room 101</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Resources;