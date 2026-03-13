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

function formatShortDate(date: string): string {
  if (!date) return '';
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getMonthAbbr(date: string): string {
  if (!date) return '';
  const [y, m, d] = date.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
}

function getDay(date: string): number {
  if (!date) return 1;
  const [, , d] = date.split('-').map(Number);
  return d;
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const service  = normalizeService(searchParams.get('service') || 'Cleaning Service');
  const date     = searchParams.get('date') || '';
  const time     = searchParams.get('time') || '09:00';
  const location = searchParams.get('location') || '';
  const name     = searchParams.get('name') || '';
  const duration = parseInt(searchParams.get('duration') || '120');

  const displayDate = formatDate(date);
  const shortDate   = formatShortDate(date);
  const monthAbbr   = getMonthAbbr(date);
  const dayNum      = getDay(date);
  const timeRange   = formatTimeRange(time, duration);

  // Card colors — matches AppointmentSection light theme
  const cardBg   = '#eaf0f8';
  const iconBg   = '#dce6f0';
  const textMain = '#1f1f1f';
  const textSub  = '#5f6368';
  const green    = '#16a34a';
  const blue     = '#4285f4';

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        background: cardBg,
        padding: '56px 72px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}>

          {/* Top row: short date·time + calendar icon */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div style={{ fontSize: '26px', color: textSub, display: 'flex' }}>
              {shortDate} · {timeRange}
            </div>

            {/* Calendar icon */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              width: '80px', height: '80px',
              borderRadius: '16px',
              background: iconBg,
              border: '1px solid rgba(0,0,0,0.08)',
              overflow: 'hidden',
              flexShrink: 0,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: green, height: '28px',
              }}>
                <span style={{ fontSize: '11px', color: '#fff', fontWeight: 700, letterSpacing: '0.5px' }}>
                  {monthAbbr}
                </span>
              </div>
              <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '32px', fontWeight: 700, color: textMain, lineHeight: 1 }}>
                  {dayNum}
                </span>
              </div>
            </div>
          </div>

          {/* Service title */}
          <div style={{ fontSize: '64px', fontWeight: 700, color: textMain, lineHeight: 1.1, marginBottom: '36px', display: 'flex' }}>
            {service}
          </div>

          {/* Detail rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Date & time */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', width: '32px', height: '32px', marginRight: '20px', flexShrink: 0 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={textSub} strokeWidth="1.8">
                  <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 15.5"/>
                </svg>
              </div>
              <div style={{ fontSize: '26px', color: textMain, display: 'flex' }}>
                {displayDate} · {timeRange}
              </div>
            </div>

            {/* Location */}
            {location && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', width: '32px', height: '32px', marginRight: '20px', flexShrink: 0 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={textSub} strokeWidth="1.8">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                </div>
                <div style={{ fontSize: '26px', color: textMain, display: 'flex' }}>{location}</div>
              </div>
            )}

            {/* Client */}
            {name && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', width: '32px', height: '32px', marginRight: '20px', flexShrink: 0 }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={textSub} strokeWidth="1.8">
                    <circle cx="12" cy="8" r="3.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                  </svg>
                </div>
                <div style={{ fontSize: '26px', color: textMain, display: 'flex' }}>{name}</div>
              </div>
            )}

            {/* Organizer */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', width: '32px', height: '32px', marginRight: '20px', flexShrink: 0 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={textSub} strokeWidth="1.8">
                  <circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/>
                  <path d="M16 6c1.7 0 3 1.3 3 3s-1.3 3-3 3"/><path d="M22 20c0-3-2-5.3-4.5-6"/>
                </svg>
              </div>
              <div style={{ fontSize: '26px', color: textSub, display: 'flex' }}>LivinGreen</div>
            </div>
          </div>

          {/* Button */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginTop: '36px',
            background: blue,
            borderRadius: '100px',
            padding: '18px 32px',
          }}>
            <span style={{ fontSize: '26px', fontWeight: 700, color: '#fff', display: 'flex' }}>
              Add to Calendar
            </span>
          </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
