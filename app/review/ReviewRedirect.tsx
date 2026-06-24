'use client';

import Image from 'next/image';

const PLACE_ID = 'ChIJhT4mvLUncCsR8kEnZLFw1tc';
// Canonical "write a review" web link (works in any browser; one tap to the form).
const WEB_REVIEW = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;
// Universal link to the business in Google Maps — opens the Google Maps app when
// installed, where the customer is already signed in (no Safari login friction).
const APP_REVIEW = `https://www.google.com/maps/search/?api=1&query=LivinGreen&query_place_id=${PLACE_ID}`;

// Branded review chooser using the same header style as the LivinGreen card.
export default function ReviewRedirect() {
  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#061e16]">
      {/* Background hero photo + green gradient overlay (same as the card header) */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/gallery/gallery-7.jpg)' }} />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, rgba(6,30,22,0.94) 0%, rgba(10,60,42,0.92) 60%, rgba(16,163,127,0.6) 100%)' }}
      />

      <div className="relative z-10 min-h-full flex flex-col items-center justify-center px-6 py-12 text-center text-white">
        {/* Logo circle */}
        <div className="w-28 h-28 rounded-full bg-white shadow-2xl p-2.5 flex items-center justify-center ring-4 ring-white/30 mb-5">
          <Image src="/images/logo.png" alt="LivinGreen" width={200} height={200} className="object-contain scale-150" priority />
        </div>

        {/* Brand */}
        <h1 className="text-2xl font-black tracking-tight">LivinGreen</h1>
        <p className="text-[#5eead4] text-sm font-medium mt-0.5 mb-8">Professional Cleaning Services · Utah</p>

        {/* Ask */}
        <h2 className="text-2xl font-bold leading-tight mb-3">Loved your clean couch?</h2>
        <p className="text-yellow-400 text-2xl tracking-widest mb-4">★★★★★</p>
        <p className="text-base text-white/85 max-w-xs mb-8">
          A quick Google review really helps our business. Thank you!
        </p>

        {/* Buttons — blue primary, white secondary */}
        <div className="w-full max-w-xs space-y-3">
          <a
            href={WEB_REVIEW}
            className="block w-full py-4 rounded-2xl bg-[#009ddb] hover:bg-[#0084ba] text-white font-bold text-lg shadow-lg shadow-[#009ddb]/30 transition-colors"
          >
            Leave a Review ⭐
          </a>
          <a
            href={APP_REVIEW}
            className="block w-full py-4 rounded-2xl bg-white hover:bg-neutral-100 text-[#061e16] font-semibold text-base shadow-lg transition-colors"
          >
            Open in the Google Maps app
          </a>
        </div>

        <p className="text-xs text-white/55 mt-6 max-w-xs">
          Not signed in? Tap “Open in the Google Maps app” — you’re already signed in there.
        </p>
      </div>
    </div>
  );
}
