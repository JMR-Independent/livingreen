import { NextRequest, NextResponse } from 'next/server';

function toGoogleDate(date: string, time: string): string {
  const [y, m, d] = date.split('-');
  const [h, min] = time.split(':');
  return `${y}${m}${d}T${h}${min}00`;
}

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const service = searchParams.get('service') || 'Cleaning Service';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '09:00';
  const location = searchParams.get('location') || '';
  const name = searchParams.get('name') || '';
  const duration = parseInt(searchParams.get('duration') || '120');

  if (!date) {
    return new NextResponse('Missing date', { status: 400 });
  }

  const start = toGoogleDate(date, time);
  const end = addMinutes(start, duration);
  const now = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';
  const uid = `${now}@livingreen.life`;

  const desc = `Professional cleaning service by LivinGreen\\nService: ${service}${name ? '\\nClient: ' + name : ''}\\nContact: +1 (385) 482-5694`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//LivinGreen//Appointment//EN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:LivinGreen - ${service}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return new NextResponse(ics, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="livingreen-appointment.ics"',
      'Cache-Control': 'no-store',
    },
  });
}
