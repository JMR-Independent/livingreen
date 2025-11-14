import Gallery from '@/components/Gallery';
import PageHero from '@/components/PageHero';

export const metadata = {
  title: 'Gallery',
  description: 'See the results of our professional cleaning services. Before and after photos of carpet, upholstery, and mattress cleaning.',
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero Section */}
      <PageHero
        title="Our Work"
        titleHighlight="Gallery"
        description="See the transformations we've achieved for our customers"
        backgroundImage="/images/2020/04/6.jpg"
      />

      <Gallery />
    </>
  );
}
