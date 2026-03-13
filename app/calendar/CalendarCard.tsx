'use client';

import Image from 'next/image';
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

type Platform = 'ios' | 'android' | 'desktop';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
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

export default function CalendarCard({ clientName, service, date, time, location, duration, googleUrl, icsContent, icsUrl }: Props) {
  const [platform, setPlatform] = useState<Platform>('desktop');

  useEffect(() => { setPlatform(detectPlatform()); }, []);

  const displayService = normalizeService(service);

  const [y, m, d] = date.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const displayDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const shortDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

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

  function openIcs() { window.location.href = icsUrl; }

  const addToCalendar = platform === 'android'
    ? () => window.open(googleUrl, '_blank')
    : platform === 'ios' ? openIcs : downloadIcs;

  const calLabel = platform === 'android' ? 'Add to Google Calendar'
    : platform === 'ios' ? 'Add to Apple Calendar' : 'Add to Calendar';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '"Google Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <div style={{
        background: '#2a2a2a',
        borderRadius: '16px',
        maxWidth: '400px',
        width: '100%',
        overflow: 'hidden',
        padding: '20px',
      }}>

        {/* Top: date·time + LivinGreen icon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div style={{ fontSize: '13px', color: '#9aa0a6' }}>
            {shortDate} · {timeRange}
          </div>
          {/* LivinGreen calendar-style icon */}
          <div style={{
            width: 52, height: 52, borderRadius: '12px',
            background: '#1e1e1e', border: '1px solid #3c3c3c',
            display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0,
          }}>
            <div style={{
              background: '#16a34a', height: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '8px', color: '#fff', fontWeight: 700, letterSpacing: '0.3px' }}>LIVINGREEN</span>
            </div>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                {d}
              </span>
            </div>
          </div>
        </div>

        {/* Event title */}
        <div style={{ fontSize: '28px', fontWeight: 600, color: '#e8eaed', lineHeight: 1.2, marginBottom: '20px' }}>
          {displayService}
        </div>

        {/* Detail rows — Google Calendar style with Material icons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>

          {/* Date & time */}
          <Row icon={<IconClock />} text={`${displayDate} · ${timeRange}`} />

          {/* Location */}
          {location && <Row icon={<IconPin />} text={location} />}

          {/* Client */}
          {clientName && <Row icon={<IconPerson />} text={clientName} />}

          {/* Organizer */}
          <Row icon={<IconPeople />} text="LivinGreen" sub />

        </div>

        {/* Button — pill style like Google Calendar email */}
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
      </div>
    </div>
  );
}

function Row({ icon, text, sub }: { icon: React.ReactNode; text: string; sub?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
      <div style={{ marginTop: '1px', flexShrink: 0, opacity: sub ? 0.5 : 0.75 }}>
        {icon}
      </div>
      <div style={{ fontSize: '14px', color: sub ? '#9aa0a6' : '#e8eaed', lineHeight: 1.5 }}>
        {text}
      </div>
    </div>
  );
}

// Material Design outline icons — same style as Google Calendar
function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 15.5" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="1.8">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function IconPerson() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="1.8">
      <circle cx="9" cy="8" r="3" />
      <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
      <path d="M16 6c1.7 0 3 1.3 3 3s-1.3 3-3 3" />
      <path d="M22 20c0-3-2-5.3-4.5-6" />
    </svg>
  );
}

function IconLines() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9aa0a6" strokeWidth="1.8">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="14" y2="17" />
    </svg>
  );
}
