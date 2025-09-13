import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Calendar } from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Course Prospectus",
      description: "Explore all EMS courses and programs with detailed information"
    },
    {
      icon: Users,
      title: "Program Directors",
      description: "Connect with program directors for guidance and support"
    },
    {
      icon: Calendar,
      title: "Meeting Scheduling",
      description: "Book appointments with directors and academic staff"
    },
    {
      icon: GraduationCap,
      title: "Academic Excellence",
      description: "Join UFS EMS Faculty for world-class education"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to UFS EMS Faculty
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Economic and Management Sciences - Your gateway to academic excellence and career success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" variant="secondary" className="min-w-32">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="min-w-32">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Everything You Need for Academic Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to excel in your EMS studies
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-card-custom transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of students who have chosen UFS EMS Faculty for their academic and professional growth
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;