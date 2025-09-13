import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero">
      <div className="text-center text-white">
        <div className="mb-8">
          <GraduationCap className="w-24 h-24 mx-auto mb-4 opacity-80" />
          <h1 className="mb-4 text-6xl font-bold">404</h1>
          <p className="mb-8 text-xl">Oops! Page not found</p>
          <p className="mb-8 text-white/80 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Button variant="secondary" size="lg" onClick={() => window.location.href = "/"}>
          <Home className="w-4 h-4 mr-2" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
