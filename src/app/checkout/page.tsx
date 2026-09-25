"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Lock } from "lucide-react";

export default function Checkout() {
  return (
    <main className="min-h-screen bg-[#0D0612] flex flex-col md:flex-row">
      
      {/* Left Form Area */}
      <div className="w-full md:w-[55%] p-8 md:p-16 lg:p-24 overflow-y-auto">
        <div className="max-w-xl ml-auto">
          
          <Link href="/" className="inline-block mb-10">
            <h1 className="font-serif text-3xl tracking-widest text-luxury-gold uppercase font-semibold">
              Aura
            </h1>
          </Link>
          
          <div className="flex items-center space-x-2 text-sm text-luxury-ivory/50 uppercase tracking-widest mb-10">
            <Link href="/cart" className="hover:text-luxury-gold transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-luxury-ivory">Information</span>
            <span>/</span>
            <span>Shipping</span>
            <span>/</span>
            <span>Payment</span>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-8 text-luxury-ivory">
            
            {/* Contact */}
            <section>
              <h2 className="font-serif text-xl mb-4 text-luxury-gold">Contact Information</h2>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-luxury-purple-900 border border-luxury-gold/30 p-4 focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-ivory/40 font-light"
              />
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="font-serif text-xl mb-4 text-luxury-gold">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="First Name" 
                    className="w-full bg-luxury-purple-900 border border-luxury-gold/30 p-4 focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-ivory/40 font-light"
                  />
                  <input 
                    type="text" 
                    placeholder="Last Name" 
                    className="w-full bg-luxury-purple-900 border border-luxury-gold/30 p-4 focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-ivory/40 font-light"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Address" 
                  className="w-full bg-luxury-purple-900 border border-luxury-gold/30 p-4 focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-ivory/40 font-light"
                />
                <input 
                  type="text" 
                  placeholder="Apartment, suite, etc. (optional)" 
                  className="w-full bg-luxury-purple-900 border border-luxury-gold/30 p-4 focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-ivory/40 font-light"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="City" 
                    className="col-span-1 w-full bg-luxury-purple-900 border border-luxury-gold/30 p-4 focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-ivory/40 font-light"
                  />
                  <input 
                    type="text" 
                    placeholder="State" 
                    className="col-span-1 w-full bg-luxury-purple-900 border border-luxury-gold/30 p-4 focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-ivory/40 font-light"
                  />
                  <input 
                    type="text" 
                    placeholder="PIN Code" 
                    className="col-span-1 w-full bg-luxury-purple-900 border border-luxury-gold/30 p-4 focus:outline-none focus:border-luxury-gold transition-colors placeholder:text-luxury-ivory/40 font-light"
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center pt-8 border-t border-luxury-gold/20 gap-6 sm:gap-0">
              <Link href="/collections" className="text-luxury-gold flex items-center justify-center sm:justify-start space-x-2 text-sm uppercase tracking-widest hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span>Return to Shop</span>
              </Link>
              <button className="w-full sm:w-auto px-8 py-4 bg-luxury-gold text-luxury-purple-900 font-semibold uppercase tracking-wider text-sm transition-all hover:bg-white hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                Continue to Shipping
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Summary Area */}
      <div className="w-full md:w-[45%] bg-luxury-purple-900 p-8 md:p-16 lg:p-24 border-l border-luxury-gold/20">
        <div className="max-w-md mr-auto">
          
          <div className="space-y-6 mb-8">
            {/* Item 1 */}
            <div className="flex space-x-4 items-center">
              <div className="relative w-16 h-24 border border-luxury-gold/30 flex-shrink-0 bg-[#0D0612]">
                <Image 
                  src="https://images.unsplash.com/photo-1610030469983-98e550d615ef?auto=format&fit=crop&q=80&w=400" 
                  alt="Royal Banarasi Silk" 
                  fill 
                  className="object-cover opacity-80"
                />
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-purple-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  1
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-luxury-ivory text-lg">Royal Banarasi Silk</h3>
                <p className="text-luxury-ivory/50 text-xs uppercase tracking-widest">Banarasi</p>
              </div>
              <span className="text-luxury-gold font-light">₹24,500</span>
            </div>

            {/* Item 2 */}
            <div className="flex space-x-4 items-center">
              <div className="relative w-16 h-24 border border-luxury-gold/30 flex-shrink-0 bg-[#0D0612]">
                <Image 
                  src="https://images.unsplash.com/photo-1584282862083-d021c1762145?auto=format&fit=crop&q=80&w=400" 
                  alt="Lavender Organza" 
                  fill 
                  className="object-cover opacity-80"
                />
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-purple-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  1
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-luxury-ivory text-lg">Lavender Organza</h3>
                <p className="text-luxury-ivory/50 text-xs uppercase tracking-widest">Organza</p>
              </div>
              <span className="text-luxury-gold font-light">₹18,900</span>
            </div>
          </div>

          <div className="border-t border-luxury-gold/20 pt-6 space-y-4 text-sm font-light text-luxury-ivory/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-luxury-ivory">₹43,400</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-luxury-gold uppercase tracking-widest text-xs">Calculated next step</span>
            </div>
          </div>

          <div className="border-t border-luxury-gold/20 pt-6 mt-6 flex justify-between items-end">
            <span className="text-lg text-luxury-ivory uppercase tracking-widest">Total</span>
            <div className="text-right">
              <span className="text-luxury-ivory/50 text-xs mr-2">INR</span>
              <span className="font-serif text-3xl text-luxury-gold">₹43,400</span>
            </div>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-2 text-luxury-ivory/40 text-xs">
            <Lock className="w-3 h-3" />
            <span>Secure 256-bit SSL encryption.</span>
          </div>

        </div>
      </div>

    </main>
  );
}
