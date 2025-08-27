import React, { useState, useEffect } from 'react';
import TestimonialCard from '../cards/TestimonialCard';
import CarouselButton from '../ui/CarouselButton';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Example of using Lucide icons
import { testimonials } from '../../data/testimonial';

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const isDesktop = width >= 768;
  const maxSlides = isDesktop ? testimonials.length - 2 : testimonials.length - 1;

  const nextSlide = () => setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev <= 0 ? maxSlides : prev - 1));

  return (
    <section className="px-4 sm:px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Trusted by Educators and Learners</h2>
            </div>
            <div className="relative">
                <div className="overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${isDesktop ? currentSlide * 50 : currentSlide * 100}%)` }}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="w-full md:w-1/2 flex-shrink-0 px-4 pb-4">
                                <TestimonialCard {...testimonial} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center space-x-4 mt-8">
                    <CarouselButton onClick={prevSlide}><ChevronLeft size={20} className="text-gray-600" /></CarouselButton>
                    <CarouselButton onClick={nextSlide}><ChevronRight size={20} className="text-gray-600" /></CarouselButton>
                </div>
            </div>
        </div>
    </section>
  );
};

export default TestimonialsSection;
