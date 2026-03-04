import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'LivinGreen Digital Business Card';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoUrl = 'https://www.livingreen.life/images/logo.png';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0d1526 0%, #112038 50%, #0d1526 100%)',
          position: 'relative',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        {/* Top green accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 8,
          background: 'linear-gradient(90deg, #059669, #10a37f, #059669)',
          display: 'flex',
        }} />

        {/* Subtle grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          display: 'flex',
        }} />

        {/* Logo circle */}
        <div style={{
          position: 'absolute',
          left: 90,
          top: '50%',
          marginTop: -95,
          width: 190,
          height: 190,
          borderRadius: '50%',
          border: '4px solid rgba(16,163,127,0.6)',
          background: 'rgba(16,163,127,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl}
            width={190}
            height={190}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            alt=""
          />
        </div>

        {/* Content area */}
        <div style={{
          position: 'absolute',
          left: 320,
          top: 100,
          right: 60,
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Business name */}
          <div style={{
            fontSize: 80,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.97)',
            lineHeight: 1,
            marginBottom: 24,
            display: 'flex',
          }}>
            LivinGreen
          </div>

          {/* Divider */}
          <div style={{
            height: 2,
            background: 'linear-gradient(90deg, rgba(16,163,127,0.7), rgba(16,163,127,0))',
            marginBottom: 36,
            display: 'flex',
          }} />

          {/* Contact grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ display: 'flex', gap: 60 }}>
              <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.85)', display: 'flex', gap: 12 }}>
                <span>📞</span><span>+1 (385) 482-5694</span>
              </div>
              <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.85)', display: 'flex', gap: 12 }}>
                <span>✉️</span><span>info@livingreen.com</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 60 }}>
              <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.85)', display: 'flex', gap: 12 }}>
                <span>🌐</span><span>livingreen.life</span>
              </div>
              <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.85)', display: 'flex', gap: 12 }}>
                <span>📸</span><span>@livingreen_life</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: 56,
          background: 'rgba(16,163,127,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.4)', display: 'flex' }}>
            🌐 www.livingreen.life/card
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
