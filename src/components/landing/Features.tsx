
import React from "react";
import { FileText, Wand2, Download, Users } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-full bg-cv-primary/10 flex items-center justify-center text-cv-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-cv-secondary mb-3">
            Create Perfect CVs with Ease
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our powerful editor gives you all the tools you need to craft a professional CV that stands out.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature 
            icon={<FileText className="h-6 w-6" />}
            title="Beautiful Templates"
            description="Choose from professionally designed CV templates that will make your application stand out."
          />
          
          <Feature 
            icon={<Wand2 className="h-6 w-6" />}
            title="AI Enhancement"
            description="Let our AI improve your content to sound more professional and highlight your achievements."
          />
          
          <Feature 
            icon={<Users className="h-6 w-6" />}
            title="Profile Photo"
            description="Easily add a professional photo to your CV for a personal touch when appropriate."
          />
          
          <Feature 
            icon={<Download className="h-6 w-6" />}
            title="Instant PDF Export"
            description="Download your completed CV as a high-quality PDF file ready for submission."
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
