import type { MetadataRoute } from 'next';
import { CITIES, SERVICES, COMPANY_INFO } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY_INFO.url;
  const now = new Date();

  const staticPages = ['', '/services', '/locations', '/about', '/gallery', '/reviews', '/faq', '/contact'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })
  );

  const servicePages = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: s.focus ? 0.9 : 0.7,
  }));

  const cityPages = CITIES.map((c) => ({
    url: `${base}/locations/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...cityPages];
}
