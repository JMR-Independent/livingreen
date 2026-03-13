'use client';

import { useEffect, useState } from 'react';

interface Props {
  clientName: string;
  service: string;
  date: string;
  time: string;
  location: string;
  duration: number;
  googleUrl: string;
  icsContent: string;
  icsUrl: string;
}

type Platform = 'ios-safari' | 'ios-other' | 'android' | 'desktop';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) {
    // Only Safari on iOS handles .ics natively — detect it positively.
    // Chrome (CriOS), Firefox (FxiOS), Edge (EdgiOS), Opera (OPiOS), Google App (GSA) do NOT.
    const isSafari = !/CriOS|FxiOS|EdgiOS|OPiOS|GSA/.test(ua);
    return isSafari ? 'ios-safari' : 'ios-other';
  }
  if (/Android/.test(ua)) return 'android';
  return 'desktop';
}

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

// Theme tokens
const dark = {
  pageBg:    '#111111',
  cardBg:    '#2a2a2a',
  calIconBg: '#1e1e1e',
  calBorder: '#3c3c3c',
  title:     '#e8eaed',
  text:      '#e8eaed',
  subtext:   '#9aa0a6',
  icon:      '#9aa0a6',
  divider:   '#3c3c3c',
  btnSecBg:  '#3c4043',
  btnSecText:'#e8eaed',
};

const light = {
  pageBg:    '#f5f5f5',
  cardBg:    '#eaf0f8',       // Google Calendar blue-gray
  calIconBg: '#dce6f0',
  calBorder: 'rgba(0,0,0,0.08)',
  title:     '#1f1f1f',
  text:      '#1f1f1f',
  subtext:   '#5f6368',
  icon:      '#5f6368',
  divider:   'rgba(0,0,0,0.1)',
  btnSecBg:  'rgba(0,0,0,0.07)',
  btnSecText:'#1f1f1f',
};

export default function CalendarCard({ clientName, service, date, time, location, duration, googleUrl, icsContent, icsUrl }: Props) {
  const [platform, setPlatform] = useState<Platform>('desktop');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setPlatform(detectPlatform());
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const t = isDark ? dark : light;

  const displayService = normalizeService(service);

  const [y, m, d] = date.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const displayDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const shortDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const monthAbbr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  const [h, min] = time.split(':').map(Number);
  const endH = Math.floor((h * 60 + min + duration) / 60);
  const endMin = (h * 60 + min + duration) % 60;
  const fmt = (hh: number, mm: number) => {
    const ampm = hh >= 12 ? 'PM' : 'AM';
    return `${hh % 12 || 12}:${String(mm).padStart(2, '0')} ${ampm}`;
  };
  const timeRange = `${fmt(h, min)} – ${fmt(endH, endMin)}`;

  function downloadIcs() {
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'livingreen-appointment.ics'; a.click();
    URL.revokeObjectURL(url);
  }

  // Safari on iOS intercepts .ics natively
  function openIcs() { window.location.href = icsUrl; }

  const addToCalendar =
    platform === 'ios-safari' ? openIcs
    : platform === 'desktop'  ? downloadIcs
    : () => window.open(googleUrl, '_blank'); // android + ios-other → Google Calendar

  const calLabel =
    platform === 'ios-safari' ? 'Add to Apple Calendar'
    : (platform === 'android' || platform === 'ios-other') ? 'Add to Google Calendar'
    : 'Add to Calendar';

  return (
    <div style={{
      minHeight: '100vh',
      background: t.pageBg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      transition: 'background 0.3s',
    }}>
      <div style={{
        background: t.cardBg,
        borderRadius: '16px',
        maxWidth: '400px',
        width: '100%',
        overflow: 'hidden',
        padding: '20px',
        transition: 'background 0.3s',
      }}>

        {/* Top: date·time + calendar icon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div style={{ fontSize: '13px', color: t.subtext }}>
            {shortDate} · {timeRange}
          </div>

          {/* Calendar icon */}
          <div style={{
            width: 52, height: 52, borderRadius: '12px',
            background: t.calIconBg, border: `1px solid ${t.calBorder}`,
            display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0,
          }}>
            <div style={{
              background: '#16a34a', height: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '7.5px', color: '#fff', fontWeight: 700, letterSpacing: '0.5px' }}>
                {monthAbbr}
              </span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: isDark ? '#fff' : '#1f1f1f', lineHeight: 1 }}>
                {d}
              </span>
            </div>
          </div>
        </div>

        {/* Event title */}
        <div style={{ fontSize: '28px', fontWeight: 600, color: t.title, lineHeight: 1.2, marginBottom: '20px' }}>
          {displayService}
        </div>

        {/* Detail rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          <Row icon={<IconClock color={t.icon} />} text={`${displayDate} · ${timeRange}`} color={t.text} />
          {location && <Row icon={<IconPin color={t.icon} />} text={location} color={t.text} />}
          {clientName && <Row icon={<IconPerson color={t.icon} />} text={clientName} color={t.text} />}
          <Row icon={<IconPeople color={t.icon} />} text="LivinGreen" color={t.subtext} />
        </div>

        {/* Button */}
        <button
          onClick={addToCalendar}
          style={{
            width: '100%',
            background: '#4285f4',
            color: '#fff',
            border: 'none',
            borderRadius: '100px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {calLabel}
        </button>

        {/* iOS Chrome hint */}
        {platform === 'ios-other' && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <a
              href={icsUrl}
              style={{ fontSize: '12px', color: t.subtext, textDecoration: 'underline' }}
            >
              Prefer Apple Calendar? Open this page in Safari
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ icon, text, color }: { icon: React.ReactNode; text: string; color: string }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
      <div style={{ marginTop: '1px', flexShrink: 0 }}>{icon}</div>
      <div style={{ fontSize: '14px', color, lineHeight: 1.5 }}>{text}</div>
    </div>
  );
}

function IconClock({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 15.5" />
    </svg>
  );
}
function IconPin({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
function IconPerson({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}
function IconPeople({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      <path d="M16 6c1.7 0 3 1.3 3 3s-1.3 3-3 3" /><path d="M22 20c0-3-2-5.3-4.5-6" />
    </svg>
  );
}
