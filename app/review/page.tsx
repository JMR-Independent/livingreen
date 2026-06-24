import type { Metadata } from 'next';
import { COMPANY_INFO } from '@/lib/constants';
import ReviewRedirect from './ReviewRedirect';

const OG_IMAGE = `${COMPANY_INFO.url}/review-og.jpg`;

// Branded review landing page. WhatsApp / iMessage scrape these Open Graph tags,
// so the shared link shows a nice couch banner instead of Google's plain card.
// A client-side redirect then sends real visitors to the Google review form
// (scrapers don't run JS, so they still read the OG image above).
export const metadata: Metadata = {
  title: 'Leave LivinGreen a Review',
  description: 'Loved your clean couch? Leave LivinGreen a quick Google review — it really helps our small business.',
  alternates: { canonical: `${COMPANY_INFO.url}/review` },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Loved your clean couch? Leave LivinGreen a review',
    description: 'Tap to leave a quick Google review for LivinGreen. It really helps our small business.',
    url: `${COMPANY_INFO.url}/review`,
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Leave LivinGreen a review' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loved your clean couch? Leave LivinGreen a review',
    description: 'Tap to leave a quick Google review for LivinGreen.',
    images: [OG_IMAGE],
  },
};

export default function ReviewPage() {
  return <ReviewRedirect />;
}
