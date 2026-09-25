import Link from "next/link";
import { Camera, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-purple-900 border-t border-luxury-gold/10 pt-12 md:pt-16 pb-8 text-luxury-ivory/80 text-sm">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-12 mb-10 md:mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 space-y-4 text-center md:text-left">
          <h2 className="font-serif text-2xl tracking-widest text-luxury-gold uppercase font-semibold">
            Aura
          </h2>
          <p className="leading-relaxed text-sm md:text-base">
            Discover timeless luxury sarees crafted for moments that deserve to be remembered. Elegance woven into every story.
          </p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <h3 className="font-serif text-base md:text-lg text-luxury-ivory mb-4 md:mb-6 tracking-wide">Quick Links</h3>
          <ul className="space-y-2 md:space-y-3">
            {["Home", "Collections", "Sarees", "New Arrivals", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-luxury-gold transition-colors block py-1 md:py-0">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div className="col-span-1">
          <h3 className="font-serif text-base md:text-lg text-luxury-ivory mb-4 md:mb-6 tracking-wide">Support</h3>
          <ul className="space-y-2 md:space-y-3">
            {["Shipping", "Returns", "FAQs", "Size Guide", "Privacy"].map((item) => (
              <li key={item}>
                <Link href="#" className="hover:text-luxury-gold transition-colors block py-1 md:py-0">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="col-span-2 md:col-span-1 border-t border-luxury-gold/10 pt-8 md:border-0 md:pt-0 text-center md:text-left">
          <h3 className="font-serif text-base md:text-lg text-luxury-ivory mb-4 md:mb-6 tracking-wide">Contact</h3>
          <ul className="space-y-2 md:space-y-3 mb-6">
            <li>+91 98765 43210</li>
            <li>hello@aurasarees.com</li>
            <li>123 Heritage Lane, Mumbai</li>
          </ul>
          <div className="flex space-x-6 justify-center md:justify-start">
            <Link href="#" className="hover:text-luxury-gold transition-colors p-2 -ml-2">
              <Camera className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-luxury-gold transition-colors p-2">
              <Globe className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-luxury-gold transition-colors p-2">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 border-t border-luxury-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-wider">
        <p>&copy; {new Date().getFullYear()} Aura Luxury Sarees. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for Elegance.</p>
      </div>
    </footer>
  );
}
