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
  const description = name
    ? `${name}, your LivinGreen appointment is confirmed for ${displayDate} at ${time}. Tap to add it to your calendar.`
    : `Your LivinGreen appointment is confirmed for ${displayDate} at ${time}. Tap to add it to your calendar.`;

  const ogParams = new URLSearchParams({ service, date, time, duration });
  if (name)     ogParams.set('name', name);
  if (location) ogParams.set('location', location);
  const ogImageUrl = `https://www.livingreen.life/api/og/calendar?${ogParams.toString()}`;

  return {
    title,
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

export default function CalendarPage() {
  // Renders the full business card page — AppointmentSection inside CardContent
  // automatically reads URL params and shows the appointment card at top
  return (
    <Suspense>
      <CardContent />
    </Suspense>
  );
}
