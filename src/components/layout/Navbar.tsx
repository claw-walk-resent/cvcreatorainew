
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-cv-primary">CV</span>
            <span className="text-xl font-bold text-cv-secondary">Creator</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-cv-primary transition-colors">
              Home
            </Link>
            <Link to="/editor" className="text-gray-700 hover:text-cv-primary transition-colors">
              Create CV
            </Link>
            <Button asChild>
              <Link to="/editor">
                Get Started
              </Link>
            </Button>
          </nav>
          
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b py-4">
          <div className="container px-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-cv-primary rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/editor"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-cv-primary rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Create CV
              </Link>
              <Button asChild className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Link to="/editor">
                  Get Started
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
