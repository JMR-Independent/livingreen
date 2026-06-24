'use client';

import { useEffect } from 'react';

const REVIEW_URL = 'https://g.page/r/CfJBJ2SxcNbXEBM/review';

// Full-screen branded splash that covers the site chrome, then bounces the
// visitor to the Google review page. Renders instantly; redirects on mount.
export default function ReviewRedirect() {
  useEffect(() => {
    const t = setTimeout(() => {
      window.location.href = REVIEW_URL;
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(160deg,#0a140f,#102a1f)',
        color: '#fff',
        textAlign: 'center',
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 420 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="LivinGreen" style={{ height: 60, marginBottom: 28 }} />
        <h1 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.2, margin: '0 0 12px' }}>
          Loved your clean couch?
        </h1>
        <p style={{ fontSize: 34, color: '#7fb539', letterSpacing: 4, margin: '0 0 16px' }}>★★★★★</p>
        <p style={{ fontSize: 17, opacity: 0.85, margin: '0 0 32px' }}>
          Leave us a quick Google review. It really helps our small business. Thank you!
        </p>
        <a
          href={REVIEW_URL}
          style={{
            display: 'inline-block',
            background: '#7fb539',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 18,
            padding: '16px 40px',
            borderRadius: 999,
          }}
        >
          Leave a Review →
        </a>
        <p style={{ fontSize: 13, opacity: 0.5, marginTop: 24 }}>Redirecting you to Google…</p>
      </div>
    </div>
  );
}
