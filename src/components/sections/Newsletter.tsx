"use client";

import { motion } from "framer-motion";

export default function Newsletter() {
  return (
    <section className="py-24 bg-gradient-to-b from-luxury-purple-900 to-[#0D0612] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-block mb-6">
            <span className="text-luxury-gold text-2xl font-serif">✧</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-ivory mb-6">
            Stay Draped In Elegance
          </h2>
          <p className="text-luxury-ivory/70 font-light mb-10 text-lg leading-relaxed">
            Be the first to discover new collections, exclusive pieces, and stories from our world of Indian craftsmanship.
          </p>
          
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="flex-grow bg-transparent border-b border-luxury-gold/40 text-luxury-ivory px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-ivory/30 font-light"
              required
            />
            <button 
              type="submit" 
              className="mt-4 sm:mt-0 sm:ml-4 px-8 py-3 bg-luxury-gold text-luxury-purple-900 font-semibold uppercase tracking-wider text-sm transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
