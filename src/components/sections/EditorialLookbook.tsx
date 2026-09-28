"use client";

import { motion } from "framer-motion";

export default function EditorialLookbook() {
  return (
    <section className="py-24 bg-[#0D0612]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl text-luxury-gold mb-4"
          >
            The Art of Draping
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-luxury-ivory/70 max-w-2xl mx-auto font-light"
          >
            An editorial journey through our most exquisite pieces, styled for the modern aesthete.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
          {/* Large Featured Image - Replaced with CSS Design */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-span-1 md:col-span-8 md:row-span-2 relative group overflow-hidden bg-gradient-to-br from-[#1A0C22] to-[#0A050D] flex items-center justify-center p-8 border border-luxury-gold/10"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjRDhCMjNEIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTAgNDBsNDAgTTAgMjBsMjAgMjBNMjAgMGwyMCAyME00MCAwbC00MCA0ME0yMCAwbC0yMCAyME00MCAyMGwtMjAgMjAiLz48L2c+PC9zdmc+')] opacity-50" />
            <div className="absolute inset-4 border border-luxury-gold/20 flex flex-col items-center justify-center text-center p-6 bg-black/20 backdrop-blur-sm group-hover:bg-black/10 transition-colors duration-500">
              <h3 className="font-serif text-4xl md:text-6xl text-luxury-gold mb-2 tracking-wide">
                Handcrafted Elegance
              </h3>
              <p className="text-luxury-ivory/60 uppercase tracking-[0.3em] text-xs mt-4">
                A Symphony of Threads
              </p>
            </div>
          </motion.div>

          {/* Top Right Image - Replaced with CSS Design */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="col-span-1 md:col-span-4 md:row-span-1 relative group overflow-hidden bg-gradient-to-tr from-[#251025] to-[#120716] flex items-center justify-center p-6 border border-luxury-gold/10"
          >
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]" />
             <div className="relative text-center border-y border-luxury-gold/30 py-4 w-4/5 group-hover:scale-105 transition-transform duration-700">
               <h4 className="font-serif text-2xl text-luxury-ivory/90">
                 Traditional<br/>Artistry
               </h4>
             </div>
          </motion.div>

          {/* Bottom Right — Text Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="col-span-1 md:col-span-4 md:row-span-1 relative group overflow-hidden bg-luxury-purple-800 flex items-center justify-center p-6 md:p-8 text-center"
          >
            <div>
              <p className="text-luxury-gold tracking-[0.2em] uppercase text-xs mb-3">SS 2024</p>
              <h3 className="font-serif text-xl md:text-2xl text-luxury-ivory mb-4">The Regal <br/> Collection</h3>
              <button className="text-xs uppercase tracking-widest border-b border-luxury-gold pb-1 hover:text-luxury-gold transition-colors">
                View Lookbook
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
