import Link from "next/link";
import { Camera, Globe, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-luxury-purple-900 border-t border-luxury-gold/10 pt-12 md:pt-16 pb-8 text-luxury-ivory/80 text-sm">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-12 mb-10 md:mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 space-y-4 text-center md:text-left">
          <h2 className="font-serif text-xl md:text-2xl tracking-widest text-luxury-gold uppercase font-semibold">
            Deepu&apos;s Collection
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
                <Link href="#" className="hover:text-luxury-gold transition-colors block py-1 md:py-0 min-h-[40px] md:min-h-0 flex items-center md:block">
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
                <Link href="#" className="hover:text-luxury-gold transition-colors block py-1 md:py-0 min-h-[40px] md:min-h-0 flex items-center md:block">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="col-span-2 md:col-span-1 border-t border-luxury-gold/10 pt-8 md:border-0 md:pt-0 text-center md:text-left">
          <h3 className="font-serif text-base md:text-lg text-luxury-ivory mb-4 md:mb-6 tracking-wide">Contact</h3>
          <ul className="space-y-2 md:space-y-3 mb-6 text-sm">
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+919182319328" className="hover:text-luxury-gold transition-colors">+91 91823 19328</a>
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:+919182745115" className="hover:text-luxury-gold transition-colors">+91 91827 45115</a>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:deepu4dh@gmail.com" className="hover:text-luxury-gold transition-colors">deepu4dh@gmail.com</a>
            </li>
            <li className="flex items-start gap-2 mt-1">
              <span className="mt-0.5">📍</span>
              <span>Kapavaram, Korukonda Mandalam,<br />Near Rajahmundry, East Godavari Dist,<br />Andhra Pradesh — 533289</span>
            </li>
          </ul>
          <div className="flex space-x-6 justify-center md:justify-start">
            <Link href="#" aria-label="Instagram" className="hover:text-luxury-gold transition-colors p-2 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center md:inline-flex">
              <Camera className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Website" className="hover:text-luxury-gold transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center md:inline-flex">
              <Globe className="w-5 h-5" />
            </Link>
            <Link href="#" aria-label="Email" className="hover:text-luxury-gold transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center md:inline-flex">
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 border-t border-luxury-gold/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-wider">
        <p>&copy; {new Date().getFullYear()} Deepu&apos;s Collection. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Designed for Elegance.</p>
      </div>
    </footer>
  );
}

