import type { Metadata } from 'next';
import { Suspense } from 'react';
import CardContent from './CardContent';

interface SearchParams {
  name?: string;
  service?: string;
  date?: string;
  time?: string;
  location?: string;
  duration?: string;
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const params = await searchParams;

  // If appointment params present → use appointment OG image
  if (params.date) {
    const service = params.service || 'Cleaning Service';
    const date    = params.date;
    const time    = params.time || '09:00';
    const name    = params.name || '';
    const location = params.location || '';
    const duration = params.duration || '120';

    const [y, m, d] = date.split('-').map(Number);
    const displayDate = new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    const description = name
      ? `${name}, your LivinGreen appointment is confirmed for ${displayDate} at ${time}. Tap to add it to your calendar.`
      : `Your LivinGreen appointment is confirmed for ${displayDate} at ${time}. Tap to add it to your calendar.`;

    const ogParams = new URLSearchParams({ service, date, time, duration });
    if (name)     ogParams.set('name', name);
    if (location) ogParams.set('location', location);
    const ogImageUrl = `https://www.livingreen.life/api/og/calendar?${ogParams.toString()}`;

    return {
      title: `${service} — ${displayDate} ${time}`,
      description,
      openGraph: {
        type: 'website',
        title: `✅ Appointment Confirmed — LivinGreen`,
        description,
        siteName: 'LivinGreen Cleaning',
        images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${service} appointment confirmed` }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `✅ Appointment Confirmed — LivinGreen`,
        description,
        images: [ogImageUrl],
      },
    };
  }

  // No appointment params → default business card metadata (opengraph-image.tsx handles the image)
  return {
    title: 'LivinGreen — Professional Cleaning Services',
    description: 'Professional cleaning services in Utah. Carpet, upholstery, deep cleaning and more.',
    openGraph: {
      type: 'website',
      title: 'LivinGreen Cleaning',
      description: 'Professional cleaning services in Utah.',
      siteName: 'LivinGreen Cleaning',
    },
  };
}

export default async function CardPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  // searchParams passed down so CardContent can read them via useSearchParams on client
  void searchParams; // server component just renders the client component
  return (
    <Suspense>
      <CardContent />
    </Suspense>
  );
}
