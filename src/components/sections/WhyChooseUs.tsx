"use client";

import { motion } from "framer-motion";
import { Sparkles, Scissors, Gem, Infinity } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Handcrafted Excellence",
    desc: "Carefully selected sarees inspired by India's rich textile traditions.",
  },
  {
    icon: Gem,
    title: "Premium Fabrics",
    desc: "Quality fabrics chosen for comfort, elegance, and longevity.",
  },
  {
    icon: Scissors,
    title: "Authentic Craftsmanship",
    desc: "Celebrating skilled artisans and traditional weaving techniques.",
  },
  {
    icon: Infinity,
    title: "Timeless Designs",
    desc: "Classic Indian aesthetics combined with modern sophisticated styling.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-luxury-purple-800 border-y border-luxury-gold/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full border border-luxury-gold/30 flex items-center justify-center mb-6 group-hover:bg-luxury-gold/10 transition-colors">
                  <Icon className="w-6 h-6 text-luxury-gold group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-luxury-ivory mb-3">{feature.title}</h3>
                <p className="text-luxury-ivory/70 font-light text-sm leading-relaxed max-w-[250px]">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
