import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Terms of Service
      </h1>
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          By accessing and using CV Creator, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Use License</h2>
        <p className="text-gray-600 mb-6">
          Permission is granted to temporarily download one copy of CV Creator for personal, non-commercial use only.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;