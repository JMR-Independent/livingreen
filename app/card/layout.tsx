import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LivinGreen - Digital Business Card',
  description: '🧹 Professional Cleaning Services in Utah | Carpet • Upholstery • Mattress | Family Business | Get a Free Quote!',
  openGraph: {
    title: 'LivinGreen - Professional Cleaning Services',
    description: '✨ Expert Cleaning • 💼 Family Business • 📍 Serving Utah • 📞 +1 385 482-5694',
    images: [
      {
        url: 'https://livingreen.life/images/gallery/gallery-7.jpg',
        width: 1200,
        height: 800,
        alt: 'LivinGreen Professional Cleaning Services',
      },
    ],
    type: 'website',
    siteName: 'LivinGreen',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LivinGreen - Professional Cleaning Services',
    description: '✨ Expert Cleaning • 💼 Family Business • 📍 Serving Utah',
    images: ['https://livingreen.life/images/gallery/gallery-7.jpg'],
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
