import React from 'react';
import { Calendar, BookOpen, Clock, Users } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const features = [
  {
    icon: Calendar,
    title: 'Smart Calendar Integration',
    description: 'Automatically sync your class schedule, assignments, and study sessions.'
  },
  {
    icon: BookOpen,
    title: 'Google Classroom Sync',
    description: 'Access all your courses, assignments, and materials in one place.'
  },
  {
    icon: Clock,
    title: 'Time Management',
    description: 'Track study time, set reminders, and optimize your productivity.'
  },
  {
    icon: Users,
    title: 'Collaborative Tools',
    description: 'Work together with classmates on group projects and assignments.'
  }
];

export default function FeatureGrid() {
  const { isDark } = useTheme();

  return (
    <section id="features" className="py-12">
      <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Everything You Need to Succeed
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } transition-transform hover:scale-105`}
          >
            <feature.icon className={`w-12 h-12 mb-4 ${isDark ? 'text-cyan-400' : 'text-cyan-500'}`} />
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {feature.title}
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}