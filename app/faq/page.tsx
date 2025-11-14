import FAQSection from '@/components/FAQSection';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about our professional cleaning services, pricing, process, and more.',
};

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Frequently Asked"
        titleHighlight="Questions"
        description="Everything you need to know about our cleaning services"
        backgroundImage="/images/2020/04/Header5-2.jpg"
      />

      <FAQSection />
    </>
  );
}
