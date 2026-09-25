import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedCollections from "@/components/sections/FeaturedCollections";
import SignatureSarees from "@/components/sections/SignatureSarees";
import BrandStory from "@/components/sections/BrandStory";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import NewArrivals from "@/components/sections/NewArrivals";
import EditorialLookbook from "@/components/sections/EditorialLookbook";
import Testimonials from "@/components/sections/Testimonials";
import SocialGrid from "@/components/sections/SocialGrid";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0D0612]">
        <Hero />
        <FeaturedCollections />
        <SignatureSarees />
        <BrandStory />
        <WhyChooseUs />
        <NewArrivals />
        <EditorialLookbook />
        <Testimonials />
        <SocialGrid />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
