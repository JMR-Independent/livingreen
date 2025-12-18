import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LivinGreen - Digital Business Card',
  description: '🧹 Professional Cleaning Services in Utah | Carpet • Upholstery • Mattress | Family Business | Get a Free Quote!',
  openGraph: {
    title: 'LivinGreen',
    description: 'Professional Cleaning Services',
    url: 'https://www.livingreen.life/card',
    images: [
      {
        url: 'https://www.livingreen.life/images/card-og-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'LivinGreen Digital Business Card',
      },
    ],
    type: 'website',
    siteName: 'LivinGreen',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LivinGreen',
    description: 'Professional Cleaning Services',
    images: ['https://www.livingreen.life/images/card-og-preview.jpg'],
  },
};

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
