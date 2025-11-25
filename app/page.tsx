import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import ScrollingBanner from '@/components/ScrollingBanner';
import Gallery from '@/components/Gallery';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ScrollingBanner />
      <Gallery />
      <ReviewsSection />
      <FAQSection />
    </>
  );
}
