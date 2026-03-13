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

// Normalize service name to English
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
  // Already in English or unknown — return as-is with proper casing
  return raw.trim().replace(/\b\w/g, c => c.toUpperCase());
}

export default function CalendarCard({ clientName, service, date, time, location, duration, googleUrl, icsContent, icsUrl }: Props) {
  const [platform, setPlatform] = useState<Platform>('desktop');
  const [showOther, setShowOther] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const displayService = normalizeService(service);

  const [y, m, d] = date.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const displayDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const [h, min] = time.split(':').map(Number);
  const endH = Math.floor((h * 60 + min + duration) / 60);
  const endMin = (h * 60 + min + duration) % 60;
  const fmt = (hh: number, mm: number) => {
    const ampm = hh >= 12 ? 'PM' : 'AM';
    return `${hh % 12 || 12}:${String(mm).padStart(2, '0')} ${ampm}`;
  };
  const timeDisplay = `${fmt(h, min)} – ${fmt(endH, endMin)}`;

  function downloadIcs() {
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'livingreen-appointment.ics';
    a.click();
    URL.revokeObjectURL(url);
  }

  function openIcs() {
    window.location.href = icsUrl;
  }

  const primaryAction = platform === 'android'
    ? () => window.open(googleUrl, '_blank')
    : platform === 'ios' ? openIcs : downloadIcs;

  const primaryLabel = platform === 'android'
    ? 'Add to Google Calendar'
    : platform === 'ios' ? 'Add to Apple Calendar' : 'Add to Calendar';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        maxWidth: '400px',
        width: '100%',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          background: '#16a34a',
          padding: '28px 24px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}>
          <Image
            src="/images/icon-512x512.png"
            alt="LivinGreen"
            width={44}
            height={44}
            style={{ borderRadius: '10px', flexShrink: 0 }}
          />
          <div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
              LivinGreen Cleaning
            </div>
            <div style={{ color: '#ffffff', fontSize: '17px', fontWeight: 600, marginTop: '2px' }}>
              Appointment confirmed
            </div>
          </div>
        </div>

        {/* Service title block */}
        <div style={{ padding: '24px 24px 0' }}>
          {clientName && (
            <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500, marginBottom: '4px' }}>
              For {clientName}
            </div>
          )}
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
            {displayService}
          </div>
        </div>

        {/* Detail rows */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '0' }}>
          <DetailRow label="Date" value={displayDate} border />
          <DetailRow label="Time" value={timeDisplay} border={!!location} />
          {location && <DetailRow label="Location" value={location} border={false} />}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#f1f5f9', margin: '0 24px' }} />

        {/* Buttons */}
        <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {/* Primary */}
          <button
            onClick={primaryAction}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              background: '#16a34a',
              color: '#ffffff',
              borderRadius: '12px',
              padding: '15px',
              fontSize: '15px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <CalendarIcon platform={platform} />
            {primaryLabel}
          </button>

          {/* Other options toggle */}
          <button
            onClick={() => setShowOther(v => !v)}
            style={{
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              fontSize: '12px',
              cursor: 'pointer',
              padding: '2px',
              textAlign: 'center',
            }}
          >
            {showOther ? 'Hide other options ▲' : 'Other calendar options ▼'}
          </button>

          {showOther && (
            <>
              <a href={googleUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: '#f8fafc', color: '#334155', borderRadius: '12px', padding: '13px',
                fontSize: '14px', fontWeight: 600, border: '1.5px solid #e2e8f0', textDecoration: 'none',
              }}>
                <GoogleCalIcon />
                Google Calendar
              </a>
              <button onClick={platform === 'ios' ? openIcs : downloadIcs} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: '#f8fafc', color: '#334155', borderRadius: '12px', padding: '13px',
                fontSize: '14px', fontWeight: 600, border: '1.5px solid #e2e8f0', cursor: 'pointer', width: '100%',
              }}>
                <AppleCalIcon />
                Apple Calendar / iCal
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid #f1f5f9',
          padding: '14px 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Questions? Call or text</div>
          <a href="tel:+13854825694" style={{ fontSize: '15px', fontWeight: 700, color: '#16a34a', textDecoration: 'none' }}>
            +1 (385) 482-5694
          </a>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value, border }: { label: string; value: string; border: boolean }) {
  return (
    <div style={{
      paddingTop: '14px',
      paddingBottom: '14px',
      borderBottom: border ? '1px solid #f1f5f9' : 'none',
    }}>
      <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '3px' }}>
        {label}
      </div>
      <div style={{ fontSize: '15px', fontWeight: 500, color: '#1e293b' }}>
        {value}
      </div>
    </div>
  );
}

function CalendarIcon({ platform }: { platform: Platform }) {
  if (platform === 'android') return <GoogleCalIcon color="#fff" />;
  return <AppleCalIcon color="#fff" />;
}

function GoogleCalIcon({ color = '#64748b' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
    </svg>
  );
}

function AppleCalIcon({ color = '#64748b' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}
