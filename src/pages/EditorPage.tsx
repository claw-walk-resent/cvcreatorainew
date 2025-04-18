
import React from "react";
import CVEditor from "@/components/CVEditor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CVProvider } from "@/context/CVContext";

const EditorPage: React.FC = () => {
  return (
    <CVProvider>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <CVEditor />
      </main>
      <Footer />
    </CVProvider>
  );
};

export default EditorPage;
