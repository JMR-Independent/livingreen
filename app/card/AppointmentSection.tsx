'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function normalizeService(raw: string): string {
  const s = raw.trim().toLowerCase();
  if (/alfombra|carpet/.test(s)) return 'Carpet Cleaning';
  if (/sill[oó]n|sillones|sof[aá]|couch/.test(s)) return 'Couch Cleaning';
  if (/deep|profunda/.test(s)) return 'Deep Cleaning';
  if (/move.?(in|out)|mudanza/.test(s)) return 'Move-in / Move-out Cleaning';
  if (/window|ventana/.test(s)) return 'Window Cleaning';
  if (/office|oficina/.test(s)) return 'Office Cleaning';
  if (/post.?construct|obra/.test(s)) return 'Post-Construction Cleaning';
  if (/apartment|apartamento|depa/.test(s)) return 'Apartment Cleaning';
  if (/house|casa|hogar/.test(s)) return 'House Cleaning';
  if (/commercial|comercial/.test(s)) return 'Commercial Cleaning';
  return raw.trim().replace(/\b\w/g, c => c.toUpperCase());
}

type Platform = 'ios-safari' | 'ios-other' | 'android' | 'desktop';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) {
    const isSafari = !/CriOS|FxiOS|EdgiOS|OPiOS|GSA/.test(ua);
    return isSafari ? 'ios-safari' : 'ios-other';
  }
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

export default function AppointmentSection() {
  const searchParams = useSearchParams();
  const [platform, setPlatform] = useState<Platform>('desktop');

  useEffect(() => { setPlatform(detectPlatform()); }, []);

  const date     = searchParams.get('date') || '';
  const time     = searchParams.get('time') || '09:00';
  const service  = searchParams.get('service') || '';
  const name     = searchParams.get('name') || '';
  const location = searchParams.get('location') || '';
  const duration = parseInt(searchParams.get('duration') || '120');

  // Only render if there's an appointment
  if (!date) return null;

  const displayService = normalizeService(service || 'Cleaning Service');

  const [y, m, d] = date.split('-').map(Number);
  const dateObj    = new Date(y, m - 1, d);
  const displayDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const shortDate   = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const monthAbbr   = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  const [h, min] = time.split(':').map(Number);
  const endH   = Math.floor((h * 60 + min + duration) / 60);
  const endMin = (h * 60 + min + duration) % 60;
  const fmt = (hh: number, mm: number) => {
    const ampm = hh >= 12 ? 'PM' : 'AM';
    return `${hh % 12 || 12}:${String(mm).padStart(2, '0')} ${ampm}`;
  };
  const timeRange = `${fmt(h, min)} – ${fmt(endH, endMin)}`;

  // Google Calendar URL
  function toGoogleDate(dt: string, t: string) {
    const [gy, gm, gd] = dt.split('-');
    const [gh, gmn] = t.split(':');
    return `${gy}${gm}${gd}T${gh}${gmn}00`;
  }
  function addMinutes(gDate: string, mins: number) {
    const dt = new Date(
      parseInt(gDate.slice(0,4)), parseInt(gDate.slice(4,6))-1, parseInt(gDate.slice(6,8)),
      parseInt(gDate.slice(9,11)), parseInt(gDate.slice(11,13)) + mins
    );
    const p = (n: number) => String(n).padStart(2,'0');
    return `${dt.getFullYear()}${p(dt.getMonth()+1)}${p(dt.getDate())}T${p(dt.getHours())}${p(dt.getMinutes())}00`;
  }
  const start     = toGoogleDate(date, time);
  const end       = addMinutes(start, duration);
  const googleUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({
    action: 'TEMPLATE',
    text: `LivinGreen - ${displayService}`,
    dates: `${start}/${end}`,
    details: `Professional cleaning service by LivinGreen.\n\nService: ${displayService}${name ? '\nClient: ' + name : ''}\n\nContact: +1 (385) 482-5694\nWebsite: livingreen.life`,
    location: location || 'Utah, USA',
  }).toString()}`;

  const icsParams = new URLSearchParams({ service: displayService, date, time, duration: String(duration) });
  if (name)     icsParams.set('name', name);
  if (location) icsParams.set('location', location);
  const icsUrl = `https://www.livingreen.life/api/ics/calendar?${icsParams.toString()}`;

  // Build ICS content inline for Web Share API (needs the file object, not a URL)
  function buildIcsContent() {
    function toGDate(dt: string, t: string) {
      const [gy,gm,gd] = dt.split('-'); const [gh,gmn] = t.split(':');
      return `${gy}${gm}${gd}T${gh}${gmn}00`;
    }
    function addMins(gDate: string, mins: number) {
      const dt2 = new Date(parseInt(gDate.slice(0,4)),parseInt(gDate.slice(4,6))-1,parseInt(gDate.slice(6,8)),parseInt(gDate.slice(9,11)),parseInt(gDate.slice(11,13))+mins);
      const p=(n:number)=>String(n).padStart(2,'0');
      return `${dt2.getFullYear()}${p(dt2.getMonth()+1)}${p(dt2.getDate())}T${p(dt2.getHours())}${p(dt2.getMinutes())}00`;
    }
    const s = toGDate(date, time); const e = addMins(s, duration);
    const now = new Date().toISOString().replace(/[-:.]/g,'').slice(0,15)+'Z';
    return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//LivinGreen//Appointment//EN','METHOD:PUBLISH',
      'BEGIN:VEVENT',`UID:${now}@livingreen.life`,`DTSTAMP:${now}`,`DTSTART:${s}`,`DTEND:${e}`,
      `SUMMARY:LivinGreen - ${displayService}`,`DESCRIPTION:Professional cleaning by LivinGreen\\nService: ${displayService}${name?'\\nClient: '+name:''}`,
      `LOCATION:${location}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
  }

  async function addToCalendar() {
    if (platform === 'ios-safari') {
      window.location.href = icsUrl;
    } else if (platform === 'ios-other') {
      // Web Share API → iOS system share sheet → user picks Calendar
      const file = new File([buildIcsContent()], 'livingreen-appointment.ics', { type: 'text/calendar' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try { await navigator.share({ files: [file] }); return; } catch { return; }
      }
      window.open(googleUrl, '_blank');
    } else if (platform === 'android') {
      window.open(googleUrl, '_blank');
    } else {
      window.location.href = icsUrl;
    }
  }

  const calLabel =
    platform === 'ios-safari' ? 'Add to Apple Calendar'
    : platform === 'ios-other' ? 'Add to Apple Calendar'
    : platform === 'android'   ? 'Add to Google Calendar'
    : 'Add to Calendar';

  return (
    <section style={{ marginBottom: '32px' }}>
      {/* Appointment confirmed label */}
      <p style={{
        fontSize: '11px', fontWeight: 700, letterSpacing: '0.6px',
        textTransform: 'uppercase', color: '#16a34a',
        marginBottom: '10px', textAlign: 'center',
      }}>
        ✓ Appointment confirmed
      </p>

      {/* Card — always light theme matching the /card page */}
      <div style={{
        background: '#eaf0f8',
        borderRadius: '16px',
        padding: '20px',
        fontFamily: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>

        {/* Top row: date·time + calendar icon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div style={{ fontSize: '13px', color: '#5f6368' }}>
            {shortDate} · {timeRange}
          </div>
          {/* Calendar icon */}
          <div style={{
            width: 52, height: 52, borderRadius: '12px',
            background: '#dce6f0', border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0,
          }}>
            <div style={{ background: '#16a34a', height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '7.5px', color: '#fff', fontWeight: 700, letterSpacing: '0.5px' }}>{monthAbbr}</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#1f1f1f', lineHeight: 1 }}>{d}</span>
            </div>
          </div>
        </div>

        {/* Service title */}
        <div style={{ fontSize: '26px', fontWeight: 600, color: '#1f1f1f', lineHeight: 1.2, marginBottom: '18px' }}>
          {displayService}
        </div>

        {/* Detail rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
          <DetailRow icon={<IconClock />} text={`${displayDate} · ${timeRange}`} />
          {location && <DetailRow icon={<IconPin />} text={location} />}
          {name     && <DetailRow icon={<IconPerson />} text={name} />}
          <DetailRow icon={<IconPeople />} text="LivinGreen" muted />
        </div>

        {/* Button */}
        <button
          onClick={addToCalendar}
          style={{
            width: '100%', background: '#4285f4', color: '#fff',
            border: 'none', borderRadius: '100px', padding: '12px 16px',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          {calLabel}
        </button>
      </div>
    </section>
  );
}

function DetailRow({ icon, text, muted }: { icon: React.ReactNode; text: string; muted?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <div style={{ marginTop: '1px', flexShrink: 0, opacity: muted ? 0.5 : 0.7 }}>{icon}</div>
      <div style={{ fontSize: '13px', color: muted ? '#5f6368' : '#1f1f1f', lineHeight: 1.5 }}>{text}</div>
    </div>
  );
}

function IconClock() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 15.5"/></svg>;
}
function IconPin() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
}
function IconPerson() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><circle cx="12" cy="8" r="3.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
}
function IconPeople() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.8"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/><path d="M16 6c1.7 0 3 1.3 3 3s-1.3 3-3 3"/><path d="M22 20c0-3-2-5.3-4.5-6"/></svg>;
}
