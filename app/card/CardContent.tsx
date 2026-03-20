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
      <Image src={after} alt="After cleaning" fill className="object-cover object-center" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt="Before cleaning" fill className="object-cover object-center" />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-xl pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-2xl flex items-center justify-center border border-neutral-200">
          <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>
      <span className="absolute bottom-3 left-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">Before</span>
      <span className="absolute bottom-3 right-3 bg-[#10a37f]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">After ✓</span>
    </div>
  );
}

// ── Price Calculator ─────────────────────────────────────────────
const SELECT_CLS = "text-sm border border-neutral-200 rounded-xl px-2 py-1.5 bg-white text-neutral-800 outline-none focus:border-[#10a37f] max-w-[160px]";

function Counter({ value, onChange, max = 10 }: { value: number; onChange: (n: number) => void; max?: number }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={() => onChange(Math.max(0, value - 1))} className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center font-bold text-neutral-700 transition-colors">−</button>
      <span className="w-6 text-center font-bold text-neutral-900">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} className="w-8 h-8 rounded-full bg-[#10a37f] hover:bg-[#0d8f6e] flex items-center justify-center font-bold text-white transition-colors">+</button>
    </div>
  );
}

function Row({ label, sub, children }: { label: string; sub: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-neutral-800">{label}</p>
        <p className="text-xs text-neutral-400">{sub}</p>
      </div>
      {children}
    </div>
  );
}

const T = {
  en: {
    title: 'Instant Price Estimate',
    carpets: 'Carpets', upholstery: 'Upholstery', chairsMatt: 'Chairs & Mattresses',
    rooms: 'Rooms', stairs: 'Stairs', hallway: 'Hallway', livingRoom: 'Living Room',
    sofa: 'Sofa', chairs: 'Chairs', mattresses: 'Mattresses',
    none: 'None', small: 'Small', medium: 'Medium', large: 'Large', xlarge: 'Extra large',
    estimated: 'Estimated Total', minOrder: 'Minimum order applies',
    reset: 'Clear All', send: 'Send Quote via WhatsApp',
    msgIntro: "Hi! I'd like a quote for:",
    msgRooms: (n: number) => `• Carpet rooms: ${n} × $30 = $${n * 30}`,
    msgStairs: (p: number) => `• Stairs: $${p}`,
    msgHallway: (p: number) => `• Hallway: $${p}`,
    msgLiving: (p: number) => `• Living room: $${p}`,
    msgSofa: (l: string, p: number) => `• ${l}: $${p}`,
    msgChairs: (n: number) => `• Chairs: ${n} × $15 = $${n * 15}`,
    msgMatt: (n: number) => `• Mattresses: ${n} × $45 = $${n * 45}`,
    msgMin: '(Minimum order $90 applies)',
    msgTotal: (t: number) => `\nEstimated total: $${t}`,
    sofa1: '1-seat', sofa2: '2-seat', sofa3: '3-seat', sectS: 'Sectional S', sectM: 'Sectional M', sectL: 'Sectional L',
  },
  es: {
    title: 'Calcula tu Precio al Instante',
    carpets: 'Alfombras', upholstery: 'Tapicería', chairsMatt: 'Sillas y Colchones',
    rooms: 'Cuartos', stairs: 'Escaleras', hallway: 'Pasillo', livingRoom: 'Sala',
    sofa: 'Sofá', chairs: 'Sillas', mattresses: 'Colchones',
    none: 'Ninguno', small: 'Pequeño', medium: 'Mediano', large: 'Grande', xlarge: 'Extra grande',
    estimated: 'Total Estimado', minOrder: 'Aplica orden mínima',
    reset: 'Limpiar todo', send: 'Enviar Cotización por WhatsApp',
    msgIntro: '¡Hola! Me gustaría una cotización para:',
    msgRooms: (n: number) => `• Cuartos de alfombra: ${n} × $30 = $${n * 30}`,
    msgStairs: (p: number) => `• Escaleras: $${p}`,
    msgHallway: (p: number) => `• Pasillo: $${p}`,
    msgLiving: (p: number) => `• Sala: $${p}`,
    msgSofa: (l: string, p: number) => `• ${l}: $${p}`,
    msgChairs: (n: number) => `• Sillas: ${n} × $15 = $${n * 15}`,
    msgMatt: (n: number) => `• Colchones: ${n} × $45 = $${n * 45}`,
    msgMin: '(Aplica orden mínima de $90)',
    msgTotal: (t: number) => `\nTotal estimado: $${t}`,
    sofa1: '1 puesto', sofa2: '2 puestos', sofa3: '3 puestos', sectS: 'Seccional S', sectM: 'Seccional M', sectL: 'Seccional L',
  },
};

function PriceCalculator() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [rooms, setRooms] = useState(0);
  const [stairs, setStairs] = useState('none');
  const [hallway, setHallway] = useState('none');
  const [livingRoom, setLivingRoom] = useState('none');
  const [sofa, setSofa] = useState('none');
  const [chairs, setChairs] = useState(0);
  const [mattresses, setMattresses] = useState(0);

  const t = T[lang];

  const sofaPrice: Record<string, number> = { none: 0, '1': 35, '2': 65, '3': 85, 'sect-s': 110, 'sect-m': 140, 'sect-l': 170 };
  const stairsPrice: Record<string, number> = { none: 0, '45': 45, '55': 55 };
  const hallwayPrice: Record<string, number> = { none: 0, '10': 10, '15': 15, '20': 20, '25': 25 };
  const livingRoomPrice: Record<string, number> = { none: 0, '30': 30, '40': 40, '50': 50, '60': 60 };

  const subtotal = rooms * 30 + stairsPrice[stairs] + hallwayPrice[hallway] + livingRoomPrice[livingRoom] + sofaPrice[sofa] + chairs * 15 + mattresses * 45;
  const total = subtotal > 0 && subtotal < 90 ? 90 : subtotal;
  const minApplies = subtotal > 0 && subtotal < 90;

  const reset = () => { setRooms(0); setStairs('none'); setHallway('none'); setLivingRoom('none'); setSofa('none'); setChairs(0); setMattresses(0); };

  const sofaLabel: Record<string, string> = { '1': t.sofa1, '2': t.sofa2, '3': t.sofa3, 'sect-s': t.sectS, 'sect-m': t.sectM, 'sect-l': t.sectL };
  const lines: string[] = [t.msgIntro];
  if (rooms > 0) lines.push(t.msgRooms(rooms));
  if (stairs !== 'none') lines.push(t.msgStairs(stairsPrice[stairs]));
  if (hallway !== 'none') lines.push(t.msgHallway(hallwayPrice[hallway]));
  if (livingRoom !== 'none') lines.push(t.msgLiving(livingRoomPrice[livingRoom]));
  if (sofa !== 'none') lines.push(t.msgSofa(sofaLabel[sofa], sofaPrice[sofa]));
  if (chairs > 0) lines.push(t.msgChairs(chairs));
  if (mattresses > 0) lines.push(t.msgMatt(mattresses));
  if (minApplies) lines.push(t.msgMin);
  lines.push(t.msgTotal(total));
  const whatsappQuote = encodeURIComponent(lines.join('\n'));

  return (
    <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100">
      <div className="flex flex-col items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-neutral-900 tracking-tight text-center">{t.title}</h2>
        <button
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
          className="flex items-center gap-1 bg-white border border-neutral-200 rounded-full px-3 py-1 text-xs font-bold text-neutral-700 hover:border-[#10a37f] hover:text-[#10a37f] transition-colors"
        >
          <span className={lang === 'en' ? 'text-[#10a37f]' : 'text-neutral-400'}>EN</span>
          <span className="text-neutral-300">|</span>
          <span className={lang === 'es' ? 'text-[#10a37f]' : 'text-neutral-400'}>ES</span>
        </button>
      </div>

      <div className="space-y-4">
        <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">{t.carpets}</p>
        <Row label={t.rooms} sub="$30/room"><Counter value={rooms} onChange={setRooms} /></Row>
        <Row label={t.stairs} sub="$45–$55">
          <select value={stairs} onChange={(e) => setStairs(e.target.value)} className={SELECT_CLS}>
            <option value="none">{t.none}</option>
            <option value="45">{t.small} — $45</option>
            <option value="55">{t.large} — $55</option>
          </select>
        </Row>
        <Row label={t.hallway} sub="$10–$25">
          <select value={hallway} onChange={(e) => setHallway(e.target.value)} className={SELECT_CLS}>
            <option value="none">{t.none}</option>
            <option value="10">{t.small} — $10</option>
            <option value="15">{t.medium} — $15</option>
            <option value="20">{t.large} — $20</option>
            <option value="25">{t.xlarge} — $25</option>
          </select>
        </Row>
        <Row label={t.livingRoom} sub="$30–$60">
          <select value={livingRoom} onChange={(e) => setLivingRoom(e.target.value)} className={SELECT_CLS}>
            <option value="none">{t.none}</option>
            <option value="30">{t.small} — $30</option>
            <option value="40">{t.medium} — $40</option>
            <option value="50">{t.large} — $50</option>
            <option value="60">{t.xlarge} — $60</option>
          </select>
        </Row>

        <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pt-2">{t.upholstery}</p>
        <Row label={t.sofa} sub="from $35">
          <select value={sofa} onChange={(e) => setSofa(e.target.value)} className={SELECT_CLS}>
            <option value="none">{t.none}</option>
            <option value="1">{t.sofa1} — $35</option>
            <option value="2">{t.sofa2} — $65</option>
            <option value="3">{t.sofa3} — $85</option>
            <option value="sect-s">{t.sectS} — $110</option>
            <option value="sect-m">{t.sectM} — $140</option>
            <option value="sect-l">{t.sectL} — $170</option>
          </select>
        </Row>

        <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pt-2">{t.chairsMatt}</p>
        <Row label={t.chairs} sub="avg $15/chair"><Counter value={chairs} onChange={setChairs} max={12} /></Row>
        <Row label={t.mattresses} sub="avg $45/side"><Counter value={mattresses} onChange={setMattresses} max={5} /></Row>
      </div>

      <div className="mt-5 pt-4 border-t border-neutral-200 flex items-center justify-between">
        <div>
          <p className="text-xs text-neutral-400">{t.estimated}</p>
          {minApplies && <p className="text-[10px] text-neutral-400">{t.minOrder}</p>}
        </div>
        <p className="text-3xl font-black text-[#10a37f]">{total === 0 ? '$0' : `$${total}`}</p>
      </div>

      <button
        onClick={reset}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {t.reset}
      </button>

      {total > 0 && (
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappQuote}`}
          target="_blank" rel="noopener noreferrer"
          className="mt-3 w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20b858] text-white font-semibold text-sm transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          {t.send}
        </a>
      )}
    </div>
  );
}

// ── Reviews Carousel ─────────────────────────────────────────────
import { REVIEWS as SITE_REVIEWS } from '@/lib/constants';

function Reviews() {
  const [idx, setIdx] = useState(0);
  const r = SITE_REVIEWS[idx];

  const prev = () => setIdx((i) => (i - 1 + SITE_REVIEWS.length) % SITE_REVIEWS.length);
  const next = () => setIdx((i) => (i + 1) % SITE_REVIEWS.length);

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
      <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
        <div className="flex gap-0.5 mb-3">
          {Array(r.rating).fill(0).map((_, j) => (
            <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-sm text-neutral-700 leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#10a37f]/15 flex items-center justify-center text-sm font-bold text-[#10a37f]">
              {r.name[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800">{r.name}</p>
              <p className="text-xs text-neutral-400">{r.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors">
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs text-neutral-400">{idx + 1}/{SITE_REVIEWS.length}</span>
            <button onClick={next} className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors">
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-1.5 mt-4">
          {SITE_REVIEWS.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-[#10a37f]' : 'bg-neutral-300'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main CardContent ─────────────────────────────────────────────
type Tab = 'servicios' | 'precio' | 'resenas';

export default function CardContent() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>('servicios');

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in your cleaning services.`);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'servicios', label: 'Services' },
    { id: 'precio',    label: 'Price' },
    { id: 'resenas',   label: 'Reviews' },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPop {
          0%   { opacity: 0; transform: scale(0.7); }
          70%  { transform: scale(1.07); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes headerFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .anim-header { animation: headerFade 0.7s ease forwards; }
        .anim-logo   { animation: logoPop 0.6s cubic-bezier(.34,1.56,.64,1) 0.3s both; }
        .anim-s1     { animation: fadeSlideUp 0.5s ease 0.5s both; }
        .anim-s2     { animation: fadeSlideUp 0.5s ease 0.65s both; }
        .anim-s3     { animation: fadeSlideUp 0.5s ease 0.80s both; }
        .anim-s4     { animation: fadeSlideUp 0.5s ease 0.95s both; }
        .tab-content { animation: fadeSlideUp 0.35s ease both; }
      `}</style>

      <div className="min-h-screen bg-[#f5f5f7]">

        {/* ── HEADER CARD ── */}
        <div className={`relative overflow-hidden ${mounted ? 'anim-header' : 'opacity-0'}`}>
          {/* Background: hero photo with dark overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/gallery/gallery-7.jpg)' }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(6,30,22,0.92) 0%, rgba(10,60,42,0.88) 60%, rgba(16,163,127,0.55) 100%)' }} />

          <div className="relative z-10 flex flex-col items-center pt-12 pb-8 px-6">
            {/* Logo circle */}
            <div className={`w-28 h-28 rounded-full bg-white shadow-2xl p-2.5 flex items-center justify-center ring-4 ring-white/30 mb-4 ${mounted ? 'anim-logo' : 'opacity-0'}`}>
              <Image src="/images/logo.png" alt="LivinGreen" width={200} height={200} className="object-contain scale-150" priority />
            </div>

            {/* Name + tagline */}
            <div className={`text-center mb-5 ${mounted ? 'anim-s1' : 'opacity-0'}`}>
              <h1 className="text-2xl font-black text-white tracking-tight">LivinGreen</h1>
              <p className="text-[#5eead4] text-sm font-medium mt-0.5">Professional Cleaning Services · Utah</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-yellow-400 text-xs">★★★★★</span>
                <span className="text-white/70 text-xs">5.0 · 500+ reviews</span>
              </div>
            </div>

            {/* Primary action buttons */}
            <div className={`flex gap-3 w-full max-w-xs mb-5 ${mounted ? 'anim-s2' : 'opacity-0'}`}>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=${whatsappMessage}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20b858] text-white font-bold text-sm transition-colors shadow-lg shadow-[#25D366]/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-bold text-sm transition-colors border border-white/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </a>
            </div>

            {/* Social icons row */}
            <div className={`flex gap-3 ${mounted ? 'anim-s3' : 'opacity-0'}`}>
              {/* Instagram */}
              <a href={COMPANY_INFO.social.instagram} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Email */}
              <a href={`mailto:${COMPANY_INFO.email}`}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              {/* SMS */}
              <a href={`sms:${COMPANY_INFO.phone}`}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </a>
              {/* Save contact */}
              <button
                onClick={saveContact}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {/* Website */}
              <Link href="/"
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* ── TAB BAR ── */}
        <div className={`sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200/60 shadow-sm ${mounted ? 'anim-s4' : 'opacity-0'}`}>
          <div className="max-w-2xl mx-auto flex">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors relative ${
                  tab === t.id ? 'text-[#10a37f]' : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {t.label}
                {tab === t.id && (
                  <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#10a37f] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="max-w-2xl mx-auto px-5 py-6 pb-16">

          {tab === 'servicios' && (
            <div key="servicios" className="tab-content space-y-8">
              {/* Book appointment */}
              <Suspense>
                <AppointmentSection />
              </Suspense>

              {/* Services Grid */}
              <div>
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Our Services</p>
                <div className="grid grid-cols-2 gap-4">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-neutral-100 bg-white hover:border-[#10a37f] hover:shadow-xl transition-all duration-300 text-left w-full p-0 m-0"
                    >
                      <div className="relative w-full h-[110px] flex-shrink-0 rounded-t-[22px] overflow-hidden">
                        <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col items-center text-center px-4 pt-3 pb-4">
                        <h3 className="font-bold text-neutral-900 text-sm mb-2">{service.title}</h3>
                        <div className="w-full">
                          <div className="bg-[#10a37f]/10 text-[#10a37f] font-bold text-sm py-2 px-4 rounded-xl">
                            {service.price}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'precio' && (
            <div key="precio" className="tab-content space-y-8">
              <PriceCalculator />
              <div>
                <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4 text-center">Before & After</p>
                <BeforeAfterSlider before="/images/before-after/before-1.jpg" after="/images/before-after/after-1.jpg" />
                <p className="text-center text-xs text-neutral-400 mt-3">← Drag to compare →</p>
              </div>
            </div>
          )}

          {tab === 'resenas' && (
            <div key="resenas" className="tab-content">
              <Reviews />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center pb-10 border-t border-neutral-200">
          <p className="text-xs text-neutral-400 pt-6">© 2024 LivinGreen · Professional Cleaning Services</p>
        </footer>

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
                <p className="text-xl text-[#10a37f] font-bold mb-4">{selectedService.price}</p>
                <p className="text-neutral-600 mb-6 leading-relaxed">{selectedService.description}</p>
                {selectedService.features && selectedService.features.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">What&apos;s Included:</h3>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#10a37f] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                  className="w-full bg-[#10a37f] hover:bg-[#0d8f6e] text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-colors"
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
