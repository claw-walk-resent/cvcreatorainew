import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 text-gray-600">
          <Link to="/about" className="hover:text-blue-600">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
          <Link to="/privacy-policy" className="hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-blue-600">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;