"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    review: "The Kanjeevaram silk saree I purchased for my wedding was breathtaking. The attention to detail and the quality of the fabric is unmatched. Truly felt like royalty.",
    rating: 5,
  },
  {
    name: "Anjali Desai",
    review: "Aura's collection is a beautiful blend of tradition and modern elegance. The organza saree is incredibly lightweight yet looks absolutely regal.",
    rating: 5,
  },
  {
    name: "Meera Reddy",
    review: "Exceptional craftsmanship. The Banarasi saree exceeded my expectations. The packaging was luxurious, making the whole unboxing experience very special.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-luxury-purple-900 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-luxury-gold/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-ivory mb-4">
            Loved By Women Who <br className="hidden md:block" /> Love Timeless Elegance
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative h-[300px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 glass-effect rounded-2xl border border-luxury-gold/20"
            >
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-luxury-gold text-luxury-gold" />
                ))}
              </div>
              <p className="font-serif text-xl md:text-2xl text-luxury-ivory leading-relaxed mb-8 font-light italic">
                &quot;{testimonials[currentIndex].review}&quot;
              </p>
              <p className="text-luxury-gold tracking-widest uppercase text-sm font-medium">
                — {testimonials[currentIndex].name}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
            <button onClick={prev} className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-purple-900 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
            <button onClick={next} className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-luxury-gold hover:bg-luxury-gold hover:text-luxury-purple-900 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
