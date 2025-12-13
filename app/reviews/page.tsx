import ReviewsSection from '@/components/ReviewsSection';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Customer Reviews',
  description: 'Read what our satisfied customers have to say about our professional cleaning services in Utah.',
};

export default function ReviewsPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Customer"
        titleHighlight="Reviews"
        description="Hear from our 5,000+ satisfied customers across Utah"
        backgroundImage="/images/gallery/gallery-20.jpg"
      />

      <ReviewsSection />
    </>
  );
}
