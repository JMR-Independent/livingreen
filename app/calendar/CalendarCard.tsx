'use client';

import Image from 'next/image';

interface Props {
  clientName: string;
  service: string;
  date: string;      // YYYY-MM-DD
  time: string;      // HH:MM
  location: string;
  duration: number;  // minutos
  googleUrl: string;
  icsContent: string;
}

export default function CalendarCard({ clientName, service, date, time, location, duration, googleUrl, icsContent }: Props) {
  const [y, m, d] = date.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const displayDate = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const [h, min] = time.split(':').map(Number);
  const endH = Math.floor((h * 60 + min + duration) / 60);
  const endMin = (h * 60 + min + duration) % 60;
  const fmt = (hh: number, mm: number) => {
    const ampm = hh >= 12 ? 'PM' : 'AM';
    const h12 = hh % 12 || 12;
    return `${h12}:${String(mm).padStart(2, '0')} ${ampm}`;
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
    }}>

      {/* Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
        maxWidth: '420px',
        width: '100%',
        overflow: 'hidden',
      }}>

        {/* Header verde */}
        <div style={{
          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
          padding: '32px 24px 28px',
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: '12px' }}>
            <Image src="/images/icon-512x512.png" alt="LivinGreen" width={56} height={56}
              style={{ borderRadius: '14px', border: '3px solid rgba(255,255,255,0.3)' }} />
          </div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>
            LivinGreen Cleaning
          </div>
          <div style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700, lineHeight: 1.2 }}>
            Your appointment is confirmed!
          </div>
          <div style={{ marginTop: '10px', fontSize: '28px' }}>🎉</div>
        </div>

        {/* Detalles */}
        <div style={{ padding: '28px 24px 8px' }}>

          {clientName && (
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Client</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{clientName}</div>
            </div>
          )}

          <Row icon="🧹" label="Service" value={service} />
          <Row icon="📅" label="Date" value={displayDate} />
          <Row icon="🕐" label="Time" value={timeDisplay} />
          {location && <Row icon="📍" label="Location" value={location} last />}
        </div>

        {/* Botones */}
        <div style={{ padding: '20px 24px 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {/* Google Calendar */}
          <a href={googleUrl} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: '#16a34a',
            color: '#ffffff',
            borderRadius: '14px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
            transition: 'opacity 0.15s',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
            Add to Google Calendar
          </a>

          {/* Apple / iCal */}
          <button onClick={downloadIcs} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: '#f8fafc',
            color: '#334155',
            borderRadius: '14px',
            padding: '14px',
            fontSize: '15px',
            fontWeight: 600,
            border: '1.5px solid #e2e8f0',
            cursor: 'pointer',
            width: '100%',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#64748b' }}>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Add to Apple Calendar
          </button>
        </div>

        {/* Footer */}
        <div style={{
          background: '#f8fafc',
          borderTop: '1px solid #f1f5f9',
          padding: '16px 24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '13px', color: '#94a3b8' }}>Questions? Call or text us</div>
          <a href="tel:+13854825694" style={{ fontSize: '15px', fontWeight: 700, color: '#16a34a', textDecoration: 'none' }}>
            +1 (385) 482-5694
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value, last }: { icon: string; label: string; value: string; last?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: last ? '0' : '16px', paddingBottom: last ? '0' : '16px', borderBottom: last ? 'none' : '1px solid #f1f5f9' }}>
      <span style={{ fontSize: '20px', lineHeight: 1.4, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{label}</div>
        <div style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>{value}</div>
      </div>
    </div>
  );
}
