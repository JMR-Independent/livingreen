import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { publishedPosts } from '@/lib/blog';
import { COMPANY_INFO } from '@/lib/constants';
import { breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Reveal from '@/components/Reveal';


export const metadata: Metadata = {
  title: 'Upholstery & Couch Cleaning Tips — Blog',
  description:
    'Helpful guides on couch cleaning, pet stain removal, fabric protection and keeping your upholstery fresh, from Utah’s upholstery cleaning specialists.',
  alternates: { canonical: `${COMPANY_INFO.url}/blog` },
};

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
}

export default function BlogPage() {
  const posts = publishedPosts();

  return (
    <div>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ])}
      />

      <section className="relative py-28 md:py-36 bg-neutral-950 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-neutral-950" />
        <div className="relative z-10 container-custom">
          <Reveal>
            <p className="uppercase tracking-[0.3em] text-accent text-sm font-bold mb-5">The LivinGreen Blog</p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">Upholstery cleaning tips &amp; guides</h1>
            <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-white/80">
              Real advice on keeping your couches, sofas and furniture fresh, clean and looking new.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full border border-neutral-100">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-7">
                    <p className="text-sm text-neutral-500 mb-3">{formatDate(post.date)} · {post.readTime}</p>
                    <h2 className="text-xl font-bold text-neutral-900 mb-3 leading-snug group-hover:text-primary transition-colors">{post.title}</h2>
                    <p className="text-neutral-600 leading-relaxed mb-4">{post.excerpt}</p>
                    <span className="text-primary font-semibold group-hover:translate-x-1 inline-block transition-transform">Read more →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
