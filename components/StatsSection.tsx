'use client';

import { Heart, Users, Home, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: Heart,
      number: 2500,
      label: 'Pets Adopted',
      color: 'from-pink-500 to-red-500',
      delay: '0s'
    },
    {
      icon: Users,
      number: 1200,
      label: 'Happy Families',
      color: 'from-blue-500 to-purple-500',
      delay: '0.2s'
    },
    {
      icon: Home,
      number: 150,
      label: 'Partner Shelters',
      color: 'from-green-500 to-teal-500',
      delay: '0.4s'
    },
    {
      icon: Award,
      number: 98,
      label: 'Success Rate %',
      color: 'from-yellow-500 to-orange-500',
      delay: '0.6s'
    }
  ];

  return (
    <section id="stats-section" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full opacity-30 animate-float"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full opacity-30 animate-floatReverse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 ${
            isVisible ? 'animate-slideInDown' : 'opacity-0'
          }`}>
            Our Impact in Numbers
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${
            isVisible ? 'animate-fadeInUp animate-delay-300' : 'opacity-0'
          }`}>
            Every number represents a life changed, a family completed, and a pet finding their forever home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`relative group ${
                isVisible ? 'animate-bounceIn' : 'opacity-0'
              }`}
              style={{ animationDelay: stat.delay }}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 group-hover:scale-105">
                {/* Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-wiggle`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:animate-rubberBand`}>
                    {isVisible ? (
                      <CountUpAnimation target={stat.number} duration={2000} delay={index * 200} />
                    ) : (
                      '0'
                    )}
                    {stat.label.includes('%') && '%'}
                    {stat.label.includes('Pets') && '+'}
                    {stat.label.includes('Families') && '+'}
                    {stat.label.includes('Shelters') && '+'}
                  </div>
                  
                  <p className="text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-float`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${20 + i * 10}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUpAnimation({ target, duration, delay }: { target: number; duration: number; delay: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const increment = target / (duration / 16);
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, duration, delay]);

  return <span>{count}</span>;
}