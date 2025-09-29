'use client';

import { Star, Quote, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function TestimonialsSection() {
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

    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'San Francisco, CA',
      pet: 'Luna (Golden Retriever)',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
      petImage: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
      text: 'Finding Luna through PawsConnect was the best decision we ever made. The process was smooth, and the team was incredibly supportive. Luna has brought so much joy to our family!',
      rating: 5,
      delay: '0s'
    },
    {
      name: 'Michael Chen',
      location: 'Austin, TX',
      pet: 'Whiskers (Maine Coon)',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      petImage: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
      text: 'The detailed profiles and honest descriptions helped us find the perfect match. Whiskers settled in immediately and has become the king of our household. Thank you PawsConnect!',
      rating: 5,
      delay: '0.2s'
    },
    {
      name: 'Emily Rodriguez',
      location: 'Miami, FL',
      pet: 'Charlie (Beagle Mix)',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      petImage: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg',
      text: 'As a first-time pet owner, I was nervous about adoption. The team guided me through everything and matched me with Charlie, who is now my adventure buddy. Couldn\'t be happier!',
      rating: 5,
      delay: '0.4s'
    }
  ];

  return (
    <section id="testimonials-section" className="py-20 bg-gradient-to-br from-orange-50 to-pink-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full opacity-20 animate-floatReverse"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-20 animate-float animate-delay-500"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className={`flex items-center justify-center space-x-2 mb-4 ${
            isVisible ? 'animate-bounceIn' : 'opacity-0'
          }`}>
            <Heart className="h-8 w-8 text-orange-500 fill-orange-500 animate-heartbeat" />
            <span className="text-orange-600 font-semibold text-lg">Success Stories</span>
            <Heart className="h-8 w-8 text-orange-500 fill-orange-500 animate-heartbeat animate-delay-200" />
          </div>
          
          <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4 ${
            isVisible ? 'animate-slideInDown animate-delay-200' : 'opacity-0'
          }`}>
            Happy Families, Happy Pets
          </h2>
          
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${
            isVisible ? 'animate-fadeInUp animate-delay-400' : 'opacity-0'
          }`}>
            Read heartwarming stories from families who found their perfect companions through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative group ${
                isVisible ? 'animate-slideInUp' : 'opacity-0'
              }`}
              style={{ animationDelay: testimonial.delay }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 group-hover:scale-105 hover-glow">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center group-hover:animate-wiggle">
                  <Quote className="h-6 w-6 text-white" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 text-yellow-400 fill-yellow-400 animate-zoomIn`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden border-2 border-white">
                      <img
                        src={testimonial.petImage}
                        alt={testimonial.pet}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                      {testimonial.location}
                    </p>
                    <p className="text-xs text-orange-600 font-medium">
                      Adopted {testimonial.pet}
                    </p>
                  </div>
                </div>

                {/* Floating Hearts */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <Heart
                      key={i}
                      className={`absolute w-4 h-4 text-pink-300 fill-pink-300 opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-float`}
                      style={{
                        left: `${20 + i * 25}%`,
                        top: `${15 + i * 20}%`,
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 ${
          isVisible ? 'animate-bounceIn animate-delay-1000' : 'opacity-0'
        }`}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 max-w-2xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-500 hover-lift">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-orange-600 transition-colors duration-300">
              Ready to Write Your Own Success Story?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of happy families who found their perfect pet companion through PawsConnect.
            </p>
            <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl btn-animate hover-bounce">
              <Heart className="h-5 w-5 mr-2 inline animate-heartbeat" />
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}