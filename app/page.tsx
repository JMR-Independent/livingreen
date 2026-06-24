import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import ScrollingBanner from '@/components/ScrollingBanner';
import BentoGallery from '@/components/BentoGallery';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ScrollingBanner />
      <BentoGallery />
      <ReviewsSection />
      <ServiceAreaMap />
      <FAQSection />
    </>
  );
}
