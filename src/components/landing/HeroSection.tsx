import React from 'react';
import { Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import GoogleSignInButton from '../auth/GoogleSignInButton';

interface HeroSectionProps {
  onLearnMore: () => void;
}

export default function HeroSection({ onLearnMore }: HeroSectionProps) {
  const { isDark } = useTheme();

  return (
    <section className={`relative overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Your Academic Life, Simplified
          </h1>
          <p className={`text-xl mb-12 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Seamlessly integrate your Google Classroom, Calendar, and productivity tools
            in one powerful platform designed for student success.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoogleSignInButton />
            <button
              onClick={onLearnMore}
              className={`group px-6 py-3 rounded-lg flex items-center gap-2 transition-colors ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}