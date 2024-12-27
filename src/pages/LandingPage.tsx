import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import HeroSection from '../components/landing/HeroSection';
import FeatureGrid from '../components/landing/FeatureGrid';
import Testimonials from '../components/landing/Testimonials';
import DashboardPreview from '../components/landing/DashboardPreview';
import GoogleSignInButton from '../components/auth/GoogleSignInButton';
import Navbar from '../components/navigation/Navbar';

export default function LandingPage() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      <br /><br />
      <HeroSection onLearnMore={handleLearnMore} />
      
      <main className="container mx-auto px-4 py-12 space-y-24">
        <FeatureGrid />
        <DashboardPreview />
        <Testimonials />
        
        <section className="text-center py-16">
          <h2 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Ready to boost your academic success?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoogleSignInButton />
            <button
              onClick={handleLearnMore}
              className={`group px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                isDark
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}