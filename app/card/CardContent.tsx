'use client';

import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_INFO, SERVICES } from '@/lib/constants';
import { useState, useEffect, useRef, Suspense } from 'react';
import AppointmentSection from './AppointmentSection';

async function saveContact() {
  const res = await fetch('/images/logo.png');
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);

  const base64 = await new Promise<string>((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      const size = 300;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      const scale = Math.min(size / img.width, size / img.height) * 0.85;
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL('image/jpeg', 0.88).split(',')[1]);
    };
    img.src = objectUrl;
  });

  const photoField = `PHOTO;ENCODING=b;TYPE=JPEG:${base64}`;
  const foldedPhoto = photoField.match(/.{1,75}/g)!.join('\r\n ');

  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:LivinGreen',
    'ORG:LivinGreen',
    'TEL;TYPE=CELL:+13854825694',
    'TEL;TYPE=WORK:+13854825694',
    'EMAIL:info@livingreen.com',
    'URL:https://www.livingreen.life/',
    'X-SOCIALPROFILE;type=instagram:https://www.instagram.com/livingreen_life/',
    foldedPhoto,
    'END:VCARD',
  ].join('\r\n');

  const url = URL.createObjectURL(new Blob([vcf], { type: 'text/vcard' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'LivinGreen.vcf';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ── Before/After Slider ──────────────────────────────────────────
function BeforeAfterSlider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(3, Math.min(97, p)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-60 rounded-2xl overflow-hidden select-none cursor-col-resize"
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseDown={() => { dragging.current = true; }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onTouchStart={() => { dragging.current = true; }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* After (right side, full) */}
      <Image src={after} alt="After cleaning" fill className="object-cover object-center" />

      {/* Before (left side, clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image src={before} alt="Before cleaning" fill className="object-cover object-center" />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-xl pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-2xl flex items-center justify-center border border-neutral-200">
          <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
        Before
      </span>
      <span className="absolute bottom-3 right-3 bg-[#10a37f]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
        After ✓
      </span>
    </div>
  );
}

// ── Price Calculator ─────────────────────────────────────────────
function PriceCalculator() {
  const [rooms, setRooms] = useState(0);
  const [sofa, setSofa] = useState('none');
  const [mattresses, setMattresses] = useState(0);
  const [chairs, setChairs] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let t = rooms * 30;
    if (sofa === '1') t += 35;
    else if (sofa === '2') t += 65;
    else if (sofa === '3') t += 85;
    else if (sofa === 'sectional') t += 110;
    t += mattresses * 45;
    t += chairs * 15;
    setTotal(t > 0 && t < 90 ? 90 : t);
  }, [rooms, sofa, mattresses, chairs]);

  const whatsappQuote = encodeURIComponent(
    `Hi! I'd like a quote for:\n- Carpet rooms: ${rooms}\n- Sofa: ${sofa === 'none' ? 'none' : sofa + ' seat'}\n- Mattresses: ${mattresses}\n- Chairs: ${chairs}\nEstimated total: $${total}`
  );

  return (
    <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">🧮</span>
        <h2 className="text-lg font-bold text-neutral-900">Price Calculator</h2>
      </div>

      <div className="space-y-4">
        {/* Carpet rooms */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-800">Carpet Rooms</p>
            <p className="text-xs text-neutral-400">$30/room</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRooms(Math.max(0, rooms - 1))}
              className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center font-bold text-neutral-700 transition-colors"
            >−</button>
            <span className="w-6 text-center font-bold text-neutral-900">{rooms}</span>
            <button
              onClick={() => setRooms(Math.min(10, rooms + 1))}
              className="w-8 h-8 rounded-full bg-[#10a37f] hover:bg-[#0d8f6e] flex items-center justify-center font-bold text-white transition-colors"
            >+</button>
          </div>
        </div>

        {/* Sofa */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-800">Sofa / Upholstery</p>
            <p className="text-xs text-neutral-400">from $35</p>
          </div>
          <select
            value={sofa}
            onChange={(e) => setSofa(e.target.value)}
            className="text-sm border border-neutral-200 rounded-xl px-3 py-1.5 bg-white text-neutral-800 outline-none focus:border-[#10a37f]"
          >
            <option value="none">None</option>
            <option value="1">1-seat — $35</option>
            <option value="2">2-seat — $65</option>
            <option value="3">3-seat — $85</option>
            <option value="sectional">Sectional — $110</option>
          </select>
        </div>

        {/* Mattresses */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-800">Mattresses</p>
            <p className="text-xs text-neutral-400">avg $45/side</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMattresses(Math.max(0, mattresses - 1))}
              className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center font-bold text-neutral-700 transition-colors"
            >−</button>
            <span className="w-6 text-center font-bold text-neutral-900">{mattresses}</span>
            <button
              onClick={() => setMattresses(Math.min(5, mattresses + 1))}
              className="w-8 h-8 rounded-full bg-[#10a37f] hover:bg-[#0d8f6e] flex items-center justify-center font-bold text-white transition-colors"
            >+</button>
          </div>
        </div>

        {/* Chairs */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-800">Chairs</p>
            <p className="text-xs text-neutral-400">$10–$20/chair</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setChairs(Math.max(0, chairs - 1))}
              className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center font-bold text-neutral-700 transition-colors"
            >−</button>
            <span className="w-6 text-center font-bold text-neutral-900">{chairs}</span>
            <button
              onClick={() => setChairs(Math.min(12, chairs + 1))}
              className="w-8 h-8 rounded-full bg-[#10a37f] hover:bg-[#0d8f6e] flex items-center justify-center font-bold text-white transition-colors"
            >+</button>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mt-5 pt-4 border-t border-neutral-200 flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-400">Estimated Total</p>
          {total > 0 && total === 90 && (rooms + mattresses + chairs > 0 || sofa !== 'none') && (
            <p className="text-[10px] text-neutral-400">Minimum order applies</p>
          )}
        </div>
        <p className="text-3xl font-black text-[#10a37f]">
          {total === 0 ? '$0' : `$${total}`}
        </p>
      </div>

      {total > 0 && (
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappQuote}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20b858] text-white font-semibold text-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Send Quote via WhatsApp
        </a>
      )}
    </div>
  );
}

// ── Reviews ──────────────────────────────────────────────────────
const REVIEWS = [
  { name: 'Maria G.', text: 'Amazing! My carpets look brand new. Very professional and on time.', stars: 5, when: '1 week ago' },
  { name: 'Rosa M.', text: 'Excelente servicio, muy puntuales y el resultado fue increíble. 100% recomendado.', stars: 5, when: '2 weeks ago' },
  { name: 'John T.', text: 'Best carpet cleaning in Utah. Fair price, great results. Will call again!', stars: 5, when: '3 weeks ago' },
  { name: 'Laura P.', text: 'They cleaned our sofa and it looks perfect. Fast drying, no smell. Loved it!', stars: 5, when: '1 month ago' },
];

function Reviews() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Customer Reviews</h2>
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-400 text-sm">★★★★★</span>
          <span className="text-sm font-bold text-neutral-800">5.0</span>
          <span className="text-xs text-neutral-400">(500+)</span>
        </div>
      </div>
      <div className="space-y-3">
        {REVIEWS.map((r, i) => (
          <div key={i} className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#10a37f]/15 flex items-center justify-center text-sm font-bold text-[#10a37f]">
                  {r.name[0]}
                </div>
                <span className="text-sm font-semibold text-neutral-800">{r.name}</span>
              </div>
              <span className="text-[11px] text-neutral-400">{r.when}</span>
            </div>
            <div className="flex gap-0.5 mb-2">
              {Array(r.stars).fill(0).map((_, j) => (
                <svg key={j} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main CardContent ─────────────────────────────────────────────
export default function CardContent() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in your cleaning services.`);

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFade {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes logoPop {
          0%   { opacity: 0; transform: scale(0.7); }
          70%  { transform: scale(1.07); }
          100% { opacity: 1; transform: scale(1); }
        }
        .anim-hero   { animation: heroFade 0.9s ease forwards; }
        .anim-logo   { animation: logoPop 0.6s cubic-bezier(.34,1.56,.64,1) 0.4s both; }
        .anim-s1     { animation: fadeSlideUp 0.55s ease 0.55s both; }
        .anim-s2     { animation: fadeSlideUp 0.55s ease 0.70s both; }
        .anim-s3     { animation: fadeSlideUp 0.55s ease 0.85s both; }
        .anim-s4     { animation: fadeSlideUp 0.55s ease 1.00s both; }
        .anim-s5     { animation: fadeSlideUp 0.55s ease 1.15s both; }
        .anim-s6     { animation: fadeSlideUp 0.55s ease 1.30s both; }
      `}</style>

      <div className="min-h-screen bg-white">

        {/* Hero */}
        <div className={`relative w-full h-[38vh] md:h-[70vh] ${mounted ? 'anim-hero' : 'opacity-0'}`}>
          <div
            className="absolute inset-0 bg-cover md:hidden"
            style={{ backgroundImage: 'url(/images/gallery/gallery-7.jpg)', backgroundPosition: '35% 50%' }}
          />
          <div
            className="hidden md:block absolute inset-0 bg-cover"
            style={{ backgroundImage: 'url(/images/gallery/gallery-7.jpg)', backgroundPosition: 'center' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(255,255,255,0.8) 75%, rgba(255,255,255,1) 100%)' }}
          />
        </div>

        {/* Logo */}
        <div className={`relative -mt-20 md:-mt-32 mb-6 md:mb-8 flex justify-center z-10 ${mounted ? 'anim-logo' : 'opacity-0'}`}>
          <div className="relative w-36 h-36 md:w-60 md:h-60 rounded-full bg-white shadow-2xl p-3 md:p-6 flex items-center justify-center ring-4 md:ring-8 ring-white">
            <Image
              src="/images/logo.png"
              alt="LivinGreen Logo"
              width={320}
              height={320}
              className="object-contain scale-150 md:scale-[1.8]"
              priority
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 pb-12 space-y-12">

          {/* Appointment */}
          <Suspense>
            <AppointmentSection />
          </Suspense>

          {/* Before / After */}
          <section className="anim-s1">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 text-center">
              Before & After
            </h2>
            <div className="space-y-4">
              <BeforeAfterSlider
                before="/images/before-after/before-1.jpg"
                after="/images/before-after/after-1.jpg"
              />
              <BeforeAfterSlider
                before="/images/before-after/before-2.jpg"
                after="/images/before-after/after-2.jpg"
              />
            </div>
            <p className="text-center text-xs text-neutral-400 mt-3">← Drag to compare →</p>
          </section>

          {/* Services Grid */}
          <section className="anim-s2">
            <div className="grid grid-cols-2 gap-4">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-neutral-100 bg-white hover:border-primary hover:shadow-2xl transition-all duration-300 text-left w-full p-0 m-0"
                >
                  <div className="relative w-full h-[130px] flex-shrink-0 rounded-t-[22px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col flex-1 items-center text-center p-4">
                    <h3 className="font-bold text-neutral-900 mb-2 text-base">{service.title}</h3>
                    <p className="text-xs text-neutral-500 mb-3 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <div className="mt-auto w-full">
                      <div className="bg-primary/10 text-primary font-bold text-sm py-2 px-4 rounded-xl">
                        {service.price}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Price Calculator */}
          <section className="anim-s3">
            <PriceCalculator />
          </section>

          {/* Reviews */}
          <section className="anim-s4">
            <Reviews />
          </section>

          {/* Contact */}
          <section className="anim-s5">
            <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 text-center">
              Get in Touch
            </h2>

            <button
              onClick={saveContact}
              className="w-full mb-6 flex items-center justify-center gap-3 p-5 rounded-2xl bg-[#10a37f] hover:bg-[#0d8f6e] active:scale-95 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-[#10a37f]/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Save Contact
            </button>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-neutral-200 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                  <svg className="w-6 h-6 text-[#25D366] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-neutral-700 group-hover:text-[#25D366]">WhatsApp</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-neutral-200 hover:border-blue-600 hover:bg-blue-50/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-neutral-700 group-hover:text-blue-600">Call</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-neutral-200 hover:border-red-600 hover:bg-red-50/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <svg className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-neutral-700 group-hover:text-red-600">Email</span>
              </a>

              <a
                href={COMPANY_INFO.social.instagram}
                target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-neutral-200 hover:border-pink-600 hover:bg-pink-50/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:from-purple-600 group-hover:to-pink-600 transition-colors">
                  <svg className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-xs font-medium text-neutral-700 group-hover:text-pink-600">Instagram</span>
              </a>
            </div>

            <Link
              href="/"
              className="mt-4 w-full flex items-center justify-center gap-3 p-5 rounded-2xl border-2 border-blue-600 bg-blue-600 text-white hover:bg-white hover:text-blue-600 transition-all duration-300 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Visit Full Website
            </Link>

            <a
              href={`sms:${COMPANY_INFO.phone}`}
              className="mt-4 w-full flex items-center justify-center gap-3 p-5 rounded-2xl border-2 border-neutral-900 bg-neutral-900 text-white hover:bg-white hover:text-neutral-900 transition-all duration-300 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Send Text Message
            </a>
          </section>

          {/* Footer */}
          <footer className="anim-s6 pt-8 pb-12 text-center border-t border-neutral-100">
            <p className="text-xs text-neutral-400">
              © 2024 {COMPANY_INFO.name} • Professional Cleaning Services
            </p>
          </footer>
        </div>

        {/* Service Modal */}
        {selectedService && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="bg-white rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-48 md:h-64">
                <Image src={selectedService.image} alt={selectedService.title} fill className="object-cover" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6 text-neutral-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 md:p-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">{selectedService.title}</h2>
                <p className="text-xl text-primary font-bold mb-4">{selectedService.price}</p>
                <p className="text-neutral-600 mb-6 leading-relaxed">{selectedService.description}</p>
                {selectedService.features && selectedService.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">What&apos;s Included:</h3>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 00-1.414-1.414L9 10.586 7.707 9.293a1 1 00-1.414 1.414l2 2a1 1 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Hi! I'm interested in ${selectedService.title}`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
