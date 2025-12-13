import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import PageTransition from '@/components/PageTransition';
import { COMPANY_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`,
    template: `%s | ${COMPANY_INFO.name}`,
  },
  description: 'Professional cleaning services for carpets, upholstery, mattresses, and car interiors in Utah. Expert cleaning from Santaquin to Salt Lake City. Fast drying, eco-friendly, 99.9% allergen elimination.',
  keywords: ['carpet cleaning', 'upholstery cleaning', 'mattress cleaning', 'car interior cleaning', 'Utah', 'Santaquin', 'Salt Lake City', 'Provo', 'Orem', 'LivinGreen'],
  authors: [{ name: COMPANY_INFO.name }],
  creator: COMPANY_INFO.name,
  icons: {
    icon: '/images/icon-512x512.png',
    apple: '/images/icon-512x512.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} | ${COMPANY_INFO.tagline}`,
    description: 'Professional cleaning services in Utah',
    images: [
      {
        url: '/images/icon-512x512.png',
        width: 512,
        height: 512,
        alt: `${COMPANY_INFO.name} Logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: COMPANY_INFO.name,
    description: 'Professional cleaning services in Utah',
    images: ['/images/icon-512x512.png'],
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
        <PageTransition />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
