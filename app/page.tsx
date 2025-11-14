import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import ClientCarousel from '@/components/ClientCarousel';
import Gallery from '@/components/Gallery';
import ReviewsSection from '@/components/ReviewsSection';
import FAQSection from '@/components/FAQSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ClientCarousel />
      <Gallery />
      <ReviewsSection />
      <FAQSection />
    </>
  );
}
