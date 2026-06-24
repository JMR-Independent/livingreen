'use client';

const PLACE_ID = 'ChIJhT4mvLUncCsR8kEnZLFw1tc';
// Canonical "write a review" web link (works in any browser; one tap to the form).
const WEB_REVIEW = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;
// Universal link to the business in Google Maps — opens the Google Maps app when
// installed, where the customer is already signed in (no Safari login friction).
const APP_REVIEW = `https://www.google.com/maps/search/?api=1&query=LivinGreen&query_place_id=${PLACE_ID}`;

// Branded review chooser. We do NOT auto-redirect, so customers who are not signed
// into Google in Safari can instead open the Google Maps app where they are signed in.
export default function ReviewRedirect() {
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
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: 440, width: '100%' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="LivinGreen" style={{ height: 56, marginBottom: 24 }} />
        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2, margin: '0 0 10px' }}>
          Loved your clean couch?
        </h1>
        <p style={{ fontSize: 32, color: '#7fb539', letterSpacing: 4, margin: '0 0 14px' }}>★★★★★</p>
        <p style={{ fontSize: 16, opacity: 0.85, margin: '0 0 30px' }}>
          A quick Google review really helps our small business. Thank you!
        </p>

        <a
          href={WEB_REVIEW}
          style={{
            display: 'block',
            background: '#7fb539',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 18,
            padding: '16px 28px',
            borderRadius: 999,
            marginBottom: 14,
          }}
        >
          Leave a Review ⭐
        </a>

        <a
          href={APP_REVIEW}
          style={{
            display: 'block',
            background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: 16,
            padding: '14px 28px',
            borderRadius: 999,
          }}
        >
          Open in the Google Maps app
        </a>

        <p style={{ fontSize: 13, opacity: 0.55, marginTop: 22 }}>
          Not signed in? Tap “Open in the Google Maps app” — you’re already signed in there.
        </p>
      </div>
    </div>
  );
}
