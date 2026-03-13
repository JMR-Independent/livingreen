import type { Metadata } from 'next';
import { Suspense } from 'react';
import CardContent from '../card/CardContent';

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
  const service  = params.service  || 'Cleaning Service';
  const date     = params.date     || '';
  const time     = params.time     || '';
  const name     = params.name     || '';
  const location = params.location || '';
  const duration = params.duration || '120';

  let displayDate = date;
  if (date) {
    const [y, m, d] = date.split('-').map(Number);
    displayDate = new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  const title = `${service} — ${displayDate} ${time}`;

  const ogParams = new URLSearchParams({ service, date, time, duration, v: '2' });
  if (name)     ogParams.set('name', name);
  if (location) ogParams.set('location', location);
  const ogImageUrl = `https://www.livingreen.life/api/og/calendar?${ogParams.toString()}`;

  // Canonical page URL — must include all query params (including v) so Facebook
  // caches each appointment separately and picks up new image versions.
  const pageParams = new URLSearchParams({ service, date, time, duration, v: '2' });
  if (name)     pageParams.set('name', name);
  if (location) pageParams.set('location', location);
  const canonicalUrl = `https://www.livingreen.life/calendar?${pageParams.toString()}`;

  return {
    title,
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: `✅ Appointment Confirmed — LivinGreen`,
      siteName: 'LivinGreen Cleaning',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `${service} appointment confirmed` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `✅ Appointment Confirmed — LivinGreen`,
      images: [ogImageUrl],
    },
  };
}

export default function CalendarPage() {
  // Renders the full business card page — AppointmentSection inside CardContent
  // automatically reads URL params and shows the appointment card at top
  return (
    <Suspense>
      <CardContent />
    </Suspense>
  );
}
