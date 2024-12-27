import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const testimonials = [
  {
    quote: "Prodwiz has completely transformed how I manage my coursework. The Google Classroom integration is seamless!",
    author: "Sarah J.",
    role: "Computer Science Student",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256"
  },
  {
    quote: "The calendar integration helps me stay on top of all my assignments and never miss a deadline.",
    author: "Michael R.",
    role: "Engineering Student",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256"
  },
  {
    quote: "Finally, a tool that understands what students actually need. The interface is intuitive and beautiful.",
    author: "Emily L.",
    role: "Business Student",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256"
  }
];

export default function Testimonials() {
  const { isDark } = useTheme();

  return (
    <section className="py-12">
      <h2 className={`text-3xl font-bold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        What Students Say
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {testimonial.author}
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p className={`italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              "{testimonial.quote}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}