import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        About Us
      </h1>
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          CV Creator is a powerful tool designed to help professionals create stunning resumes and CVs with ease. Our platform combines modern design with user-friendly functionality to make the CV creation process simple and efficient.
        </p>
        <p className="text-gray-600 mb-6">
          Our mission is to empower job seekers by providing them with the tools they need to showcase their skills and experience effectively.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;