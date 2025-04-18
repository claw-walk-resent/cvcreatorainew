
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero: FC = () => {
  // Get navigate function directly from the hook
  const navigate = useNavigate();
  
  // Create a safe navigation function
  const safeNavigate = (path: string) => {
    try {
      navigate(path);
    } catch (e) {
      console.warn("Router not available, navigation disabled");
      window.location.href = path; // Fallback to direct navigation
    }
  };

  return (
    <div className="relative py-12 sm:py-20 md:py-32 overflow-hidden bg-gradient-to-b from-cv-light to-white">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cv-primary/10 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cv-accent/10 rounded-full blur-3xl z-0" />
      
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-cv-secondary mb-4 sm:mb-6">
              <span className="text-cv-primary">Professional CVs</span> in minutes, not hours
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
              Create stunning CVs with our AI-powered editor. Choose from beautiful templates, add your details, and download your professional CV instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg bg-cv-primary hover:bg-cv-primary/90 text-white w-full sm:w-auto"
                onClick={() => safeNavigate("/editor")}
              >
                Create Your CV
              </Button>
              <Button 
                variant="outline" 
                className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
              >
                View Templates
              </Button>
            </div>
          </div>
          
          <div className="relative animate-float">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400&q=80"
              alt="CV Editor Preview"
              className="rounded-lg shadow-xl transform rotate-2 z-20 relative"
            />
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-cv-primary rounded-lg z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
