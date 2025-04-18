import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Privacy Policy
      </h1>
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-6">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our CV Creator service.
        </p>
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">Information We Collect</h2>
        <p className="text-gray-600 mb-6">
          We collect information that you provide directly to us when creating your CV, including your name, contact information, and professional experience.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;