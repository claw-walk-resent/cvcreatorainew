
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import NotFound from "./pages/NotFound";
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import PopunderAd from './components/ads/PopunderAd';
import NativeBannerAd from './components/ads/NativeBannerAd';
import BannerAd from './components/ads/BannerAd';
import SocialBarAd from './components/ads/SocialBarAd';

function App() {
  return (
    <>
      <PopunderAd />
      <div className="main-content">
        <NativeBannerAd />
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BannerAd />
      </div>
      <SocialBarAd />
    </>
  );
}

export default App;
