"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import CartDrawer from "@/components/ui/CartDrawer";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCartStore();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isCartOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "New Arrivals", href: "/collections?filter=new-arrivals" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? "glass-effect py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo (Left on all screens) */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10">
              <Image 
                src="/deepus-logo-new.webp"
                alt="Deepu&apos;s Collection Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-serif text-[17px] sm:text-xl md:text-2xl text-luxury-gold font-bold uppercase tracking-wider whitespace-nowrap">
              DEEPU&apos;S COLLECTION
            </h1>
          </Link>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-luxury-ivory hover:text-luxury-gold transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Icons (Right) */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button 
              aria-label="Search products"
              className="text-luxury-ivory hover:text-luxury-gold transition-colors p-1"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              aria-label="Wishlist"
              className="hidden md:block text-luxury-ivory hover:text-luxury-gold transition-colors p-1"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping cart${cartItemCount > 0 ? `, ${cartItemCount} items` : ''}`}
              className="text-luxury-ivory hover:text-luxury-gold transition-colors relative p-1"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-purple-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle (Right) */}
            <button
              className="md:hidden text-luxury-ivory hover:text-luxury-gold transition-colors ml-2 p-1"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-luxury-purple-900 flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
          >
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8">
                  <Image 
                    src="/deepus-logo-new.webp"
                    alt="Deepu&apos;s Collection Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h1 className="font-serif text-[17px] sm:text-xl text-luxury-gold font-bold uppercase tracking-wider">
                  DEEPU&apos;S COLLECTION
                </h1>
              </div>
              <button
                className="text-luxury-ivory hover:text-luxury-gold transition-colors p-2 -mr-2"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6 flex-grow justify-center overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-2xl md:text-3xl text-luxury-ivory hover:text-luxury-gold transition-colors block py-2"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="p-6 border-t border-white/10 flex justify-center">
               <span className="text-sm text-white/50 tracking-widest uppercase">Elegance Woven</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
