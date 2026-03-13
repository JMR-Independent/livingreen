import type { Metadata } from 'next';
import CalendarCard from './CalendarCard';

interface SearchParams {
  name?: string;
  service?: string;
  date?: string;
  time?: string;
  location?: string;
  duration?: string;
}

// Convierte YYYY-MM-DD + HH:MM a formato Google Calendar: 20260320T100000
function toGoogleDate(date: string, time: string): string {
  const [y, m, d] = date.split('-');
  const [h, min] = time.split(':');
  return `${y}${m}${d}T${h}${min}00`;
}

// Suma minutos a un datetime string de Google
function addMinutes(googleDate: string, minutes: number): string {
  const year = parseInt(googleDate.slice(0, 4));
  const month = parseInt(googleDate.slice(4, 6)) - 1;
  const day = parseInt(googleDate.slice(6, 8));
  const hour = parseInt(googleDate.slice(9, 11));
  const min = parseInt(googleDate.slice(11, 13));
  const dt = new Date(year, month, day, hour, min + minutes);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
}

// Genera contenido ICS para Apple/Outlook
function buildIcsContent(params: SearchParams): string {
  const dur = parseInt(params.duration || '120');
  const start = toGoogleDate(params.date!, params.time!);
  const end = addMinutes(start, dur);
  const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
  const desc = `Professional cleaning service by LivinGreen\\nService: ${params.service}\\nContact: +1 (385) 482-5694`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LivinGreen//Appointment//EN',
    'BEGIN:VEVENT',
    `UID:${now}@livingreen.life`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:LivinGreen - ${params.service || 'Cleaning Service'}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${params.location || ''}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const params = await searchParams;
  const service = params.service || 'Cleaning Service';
  const date = params.date || '';
  const time = params.time || '';
  const name = params.name || '';
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

  // Build OG image URL with appointment params
  const ogParams = new URLSearchParams({ service, date, time, duration });
  if (name) ogParams.set('name', name);
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

export default async function CalendarPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;

  // Valores con defaults
  const clientName = params.name || '';
  const service = params.service || 'Cleaning Service';
  const date = params.date || '';
  const time = params.time || '09:00';
  const location = params.location || '';
  const duration = parseInt(params.duration || '120');

  if (!date) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#64748b' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
          <div style={{ fontSize: '18px', fontWeight: 600 }}>No appointment details found.</div>
          <div style={{ fontSize: '14px', marginTop: '8px' }}>Please use the link provided by LivinGreen.</div>
        </div>
      </div>
    );
  }

  // Construir URL Google Calendar
  const start = toGoogleDate(date, time);
  const end = addMinutes(start, duration);
  const googleParams = new URLSearchParams({
    action: 'TEMPLATE',
    text: `LivinGreen - ${service}`,
    dates: `${start}/${end}`,
    details: `Professional cleaning service by LivinGreen.\n\nService: ${service}${clientName ? '\nClient: ' + clientName : ''}\n\nContact: +1 (385) 482-5694\nWebsite: livingreen.life`,
    location: location || 'Utah, USA',
  });
  const googleUrl = `https://calendar.google.com/calendar/render?${googleParams.toString()}`;
  const icsContent = buildIcsContent(params);

  // API route que sirve el .ics con Content-Type correcto (necesario en iOS para abrir Calendar)
  const icsApiParams = new URLSearchParams({ service, date, time, duration: String(duration) });
  if (clientName) icsApiParams.set('name', clientName);
  if (location) icsApiParams.set('location', location);
  const icsUrl = `https://www.livingreen.life/api/ics/calendar?${icsApiParams.toString()}`;

  return (
    <CalendarCard
      clientName={clientName}
      service={service}
      date={date}
      time={time}
      location={location}
      duration={duration}
      googleUrl={googleUrl}
      icsContent={icsContent}
      icsUrl={icsUrl}
    />
  );
}
