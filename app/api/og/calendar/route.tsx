import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

function formatDate(date: string): string {
  if (!date) return '';
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function formatTimeRange(time: string, duration: number): string {
  if (!time) return '';
  const [h, min] = time.split(':').map(Number);
  const endTotal = h * 60 + min + duration;
  const fmt = (hh: number, mm: number) => {
    const ampm = hh >= 12 ? 'PM' : 'AM';
    return `${hh % 12 || 12}:${String(mm).padStart(2, '0')} ${ampm}`;
  };
  return `${fmt(h, min)} – ${fmt(Math.floor(endTotal / 60), endTotal % 60)}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const service = searchParams.get('service') || 'Cleaning Service';
  const date = searchParams.get('date') || '';
  const time = searchParams.get('time') || '09:00';
  const location = searchParams.get('location') || '';
  const name = searchParams.get('name') || '';
  const duration = parseInt(searchParams.get('duration') || '120');

  const displayDate = formatDate(date);
  const timeRange = formatTimeRange(time, duration);

  const logoUrl = 'https://www.livingreen.life/images/icon-512x512.png';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          background: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: 'relative',
        }}
      >
        {/* Left green sidebar — Google Calendar color strip */}
        <div style={{ display: 'flex', width: 16, background: '#16a34a', flexShrink: 0 }} />

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '0 64px' }}>

          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 48,
            paddingBottom: 32,
            borderBottom: '1px solid #e8eaed',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} width={48} height={48} style={{ borderRadius: 12 }} alt="" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 20, fontWeight: 600, color: '#3c4043' }}>LivinGreen Cleaning</div>
                <div style={{ fontSize: 15, color: '#80868b' }}>livingreen.life</div>
              </div>
            </div>

            {/* Confirmed badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#e6f4ea', borderRadius: 100, padding: '10px 22px',
            }}>
              <div style={{
                display: 'flex', width: 22, height: 22, borderRadius: '50%',
                background: '#16a34a', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 14, fontWeight: 700,
              }}>✓</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#137333' }}>Appointment confirmed</div>
            </div>
          </div>

          {/* Event title */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, paddingTop: 40, paddingBottom: 32 }}>
            <div style={{
              display: 'flex', width: 20, height: 20, borderRadius: '50%',
              background: '#16a34a', marginTop: 10, flexShrink: 0,
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 48, fontWeight: 400, color: '#202124', lineHeight: 1.15 }}>{service}</div>
              {name && <div style={{ fontSize: 22, color: '#5f6368' }}>{name}</div>}
            </div>
          </div>

          {/* Detail rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {displayDate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{
                  display: 'flex', width: 44, height: 44, background: '#f1f3f4',
                  borderRadius: 8, alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
                }}>📅</div>
                <div style={{ fontSize: 28, color: '#3c4043' }}>{displayDate}</div>
              </div>
            )}
            {timeRange && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{
                  display: 'flex', width: 44, height: 44, background: '#f1f3f4',
                  borderRadius: 8, alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
                }}>🕐</div>
                <div style={{ fontSize: 28, color: '#3c4043' }}>{timeRange}</div>
              </div>
            )}
            {location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={{
                  display: 'flex', width: 44, height: 44, background: '#f1f3f4',
                  borderRadius: 8, alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
                }}>📍</div>
                <div style={{ fontSize: 28, color: '#3c4043' }}>{location}</div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          position: 'absolute', bottom: 0, left: 16, right: 0, height: 60,
          background: '#f8fdf9', borderTop: '1px solid #e8eaed',
          display: 'flex', alignItems: 'center', paddingLeft: 64, gap: 10,
        }}>
          <div style={{ fontSize: 18, color: '#16a34a', fontWeight: 600 }}>Tap to add to your calendar</div>
          <div style={{ fontSize: 18, color: '#16a34a' }}>→</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
