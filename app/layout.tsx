import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';
import PageTransition from '@/components/PageTransition';
import JsonLd from '@/components/JsonLd';
import { localBusinessSchema } from '@/lib/seo';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY_INFO.url),
  title: {
    default: `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`,
    template: `%s | ${COMPANY_INFO.name}`,
  },
  description: 'Utah County upholstery, couch & sofa cleaning specialists. Sectionals, loveseats, recliners + fabric & stain protection. Also carpet, mattress & car interior cleaning. Eco-friendly, fast-drying, 5-star rated. Serving Santaquin to Salt Lake City. Free estimates.',
  keywords: ['upholstery cleaning', 'couch cleaning', 'sofa cleaning', 'sectional cleaning', 'fabric protection', 'scotchgard', 'furniture cleaning', 'carpet cleaning', 'mattress cleaning', 'car interior cleaning', 'Utah County', 'Provo', 'Orem', 'Lehi', 'Salt Lake City', 'LivinGreen'],
  authors: [{ name: COMPANY_INFO.name }],
  creator: COMPANY_INFO.name,
  icons: {
    icon: '/images/icon-512x512.png',
    apple: '/images/icon-512x512.png',
  },
  alternates: {
    canonical: COMPANY_INFO.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`,
    description: 'Utah County upholstery, couch & sofa cleaning specialists. Fabric & stain protection, plus carpet, mattress and car interior cleaning. Eco-friendly, fast-drying, 5-star rated. Serving Santaquin to Salt Lake City. Free estimates.',
    images: [
      {
        url: '/images/og-social.jpg',
        width: 1200,
        height: 630,
        alt: 'LivinGreen — Upholstery & Carpet Cleaning in Utah',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`,
    description: 'Utah County upholstery, couch & sofa cleaning specialists. Fabric & stain protection, plus carpet, mattress and car interior cleaning. Eco-friendly, fast-drying, 5-star rated. Serving Santaquin to Salt Lake City. Free estimates.',
    images: ['/images/og-social.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        <JsonLd data={localBusinessSchema()} />
        <PageTransition />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
